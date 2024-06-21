const { Telegraf } = require('telegraf')
const axios = require('axios')
const schedule = require('node-schedule')
const config = require('./config.json')

const bot = new Telegraf(config.botToken)
let jobScheduled = false // Переменная для отслеживания, запланировано ли задание

// Функция для получения последнего значения сахара из Nightscout в ммоль/л
async function getLastBloodSugar() {
	try {
		console.log('Получение данных из Nightscout...')
		const response = await axios.get(
			`${config.nightscoutUrl}/api/v1/entries.json?count=1`
		)
		const lastEntry = response.data[0]
		const mmolValue = (lastEntry.sgv / 18).toFixed(1) // Конвертируем из мг/дл в ммоль/л и округляем до 1 знака после запятой
		return `Последнее значение сахара: ${mmolValue} ммоль/л`
	} catch (error) {
		console.error('Ошибка при получении данных из Nightscout:', error)
		return 'Не удалось получить данные из Nightscout.'
	}
}

// Функция для отправки сообщения в указанный чат
async function sendMessageToChat(message) {
	try {
		console.log(`Отправка сообщения в чат ${config.chatId}...`)
		await bot.telegram.sendMessage(config.chatId, message)
		console.log(`Сообщение отправлено в чат ${config.chatId}`)
	} catch (error) {
		console.error(
			`Ошибка при отправке сообщения в чат ${config.chatId}:`,
			error
		)
	}
}

// Обработка команды /start и запуск процесса отправки сообщений раз в час
bot.start(async ctx => {
	console.log(`/start команда выполнена пользователем ${ctx.chat.id}`)
	ctx.reply(
		'Бот запущен! Вы будете получать уведомления о показаниях уровня сахара в крови раз в час.'
	)

	if (!jobScheduled) {
		jobScheduled = true
		const message = await getLastBloodSugar()
		await sendMessageToChat(message)

		// Запланированное задание, которое будет выполняться каждый час
		schedule.scheduleJob('0 * * * *', async () => {
			const message = await getLastBloodSugar()
			console.log('Отправляем сообщение указанному пользователю раз в час...')
			await sendMessageToChat(message)
		})

		console.log('Задание по отправке сообщений раз в час запущено.')
	} else {
		console.log('Задание уже было запущено ранее.')
	}
})

bot
	.launch()
	.then(() => {
		console.log('Бот запущен')
	})
	.catch(error => {
		console.error('Ошибка при запуске бота:', error)
	})

bot.help(ctx =>
	ctx.reply(
		'Я отправляю последнее значение сахара в крови раз в час после выполнения команды /start.'
	)
)

bot.on('text', ctx =>
	ctx.reply(
		'Используйте команду /start, чтобы начать получать уведомления о последнем значении сахара в крови.'
	)
)
