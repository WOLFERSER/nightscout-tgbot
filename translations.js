const translations = {
	en: {
		startCommand:
			'Bot started! You will receive hourly updates on blood sugar levels.',
		hourlyUpdate: 'Sending hourly blood sugar updates...',
		scheduleJobStarted: 'Hourly update job started.',
		jobAlreadyStarted: 'The job has already been started.',
		errorGettingData: 'Failed to get data from Nightscout.',
		errorSendingMessage: 'Error sending message to chat',
		lastBloodSugar: {
			'mmol/L': 'Last blood sugar value: {value} mmol/L',
			'mg/dL': 'Last blood sugar value: {value} mg/dL',
		},
		helpMessage:
			'I send the latest blood sugar value every hour after the /start command.',
		useStartCommand:
			'Use the /start command to start receiving hourly blood sugar updates.',
	},
	de: {
		startCommand:
			'Bot gestartet! Sie erhalten stündliche Updates zu den Blutzuckerwerten.',
		hourlyUpdate: 'Senden stündlicher Blutzucker-Updates...',
		scheduleJobStarted: 'Stündlicher Update-Job gestartet.',
		jobAlreadyStarted: 'Der Job wurde bereits gestartet.',
		errorGettingData: 'Fehler beim Abrufen der Daten von Nightscout.',
		errorSendingMessage: 'Fehler beim Senden der Nachricht an den Chat',
		lastBloodSugar: {
			'mmol/L': 'Letzter Blutzuckerwert: {value} mmol/L',
			'mg/dL': 'Letzter Blutzuckerwert: {value} mg/dL',
		},
		helpMessage:
			'Ich sende den neuesten Blutzuckerwert jede Stunde nach dem Befehl /start.',
		useStartCommand:
			'Verwenden Sie den Befehl /start, um stündliche Blutzucker-Updates zu erhalten.',
	},
	es: {
		startCommand:
			'¡Bot iniciado! Recibirás actualizaciones horarias sobre los niveles de azúcar en la sangre.',
		hourlyUpdate: 'Enviando actualizaciones horarias de azúcar en la sangre...',
		scheduleJobStarted: 'Tarea de actualización horaria iniciada.',
		jobAlreadyStarted: 'La tarea ya ha sido iniciada.',
		errorGettingData: 'Error al obtener datos de Nightscout.',
		errorSendingMessage: 'Error al enviar mensaje al chat',
		lastBloodSugar: {
			'mmol/L': 'Último valor de azúcar en sangre: {value} mmol/L',
			'mg/dL': 'Último valor de azúcar en sangre: {value} mg/dL',
		},
		helpMessage:
			'Envio el último valor de azúcar en sangre cada hora después del comando /start.',
		useStartCommand:
			'Usa el comando /start para comenzar a recibir actualizaciones horarias de azúcar en la sangre.',
	},
	zh: {
		startCommand: '机器人已启动！您将每小时收到一次血糖水平更新。',
		hourlyUpdate: '发送每小时血糖更新...',
		scheduleJobStarted: '每小时更新任务已启动。',
		jobAlreadyStarted: '任务已被启动。',
		errorGettingData: '从Nightscout获取数据失败。',
		errorSendingMessage: '发送消息到聊天时出错',
		lastBloodSugar: {
			'mmol/L': '最后的血糖值：{value} mmol/L',
			'mg/dL': '最后的血糖值：{value} mg/dL',
		},
		helpMessage: '在 /start 命令后，我会每小时发送最新的血糖值。',
		useStartCommand: '使用 /start 命令开始接收每小时的血糖更新。',
	},
	ru: {
		startCommand:
			'Бот запущен! Вы будете получать обновления уровня сахара в крови каждый час.',
		hourlyUpdate: 'Отправка ежечасных обновлений уровня сахара в крови...',
		scheduleJobStarted: 'Ежечасное задание по обновлению запущено.',
		jobAlreadyStarted: 'Задание уже было запущено.',
		errorGettingData: 'Не удалось получить данные из Nightscout.',
		errorSendingMessage: 'Ошибка при отправке сообщения в чат',
		lastBloodSugar: {
			'mmol/L': 'Последнее значение сахара в крови: {value} ммоль/л',
			'mg/dL': 'Последнее значение сахара в крови: {value} мг/дл',
		},
		helpMessage:
			'Я отправляю последнее значение сахара в крови каждый час после команды /start.',
		useStartCommand:
			'Используйте команду /start, чтобы начать получать ежечасные обновления уровня сахара в крови.',
	},
	pt: {
		startCommand:
			'Bot iniciado! Você receberá atualizações horárias sobre os níveis de açúcar no sangue.',
		hourlyUpdate: 'Enviando atualizações horárias de açúcar no sangue...',
		scheduleJobStarted: 'Tarefa de atualização horária iniciada.',
		jobAlreadyStarted: 'A tarefa já foi iniciada.',
		errorGettingData: 'Falha ao obter dados do Nightscout.',
		errorSendingMessage: 'Erro ao enviar mensagem para o chat',
		lastBloodSugar: {
			'mmol/L': 'Último valor de açúcar no sangue: {value} mmol/L',
			'mg/dL': 'Último valor de açúcar no sangue: {value} mg/dL',
		},
		helpMessage:
			'Envio o valor mais recente de açúcar no sangue a cada hora após o comando /start.',
		useStartCommand:
			'Use o comando /start para começar a receber atualizações horárias de açúcar no sangue.',
	},
	fr: {
		startCommand:
			'Bot démarré ! Vous recevrez des mises à jour horaires sur les niveaux de sucre dans le sang.',
		hourlyUpdate: 'Envoi de mises à jour horaires de la glycémie...',
		scheduleJobStarted: 'Tâche de mise à jour horaire démarrée.',
		jobAlreadyStarted: 'La tâche a déjà été démarrée.',
		errorGettingData: "Échec de l'obtention des données de Nightscout.",
		errorSendingMessage: "Erreur lors de l'envoi du message au chat",
		lastBloodSugar: {
			'mmol/L': 'Dernière valeur de glycémie : {value} mmol/L',
			'mg/dL': 'Dernière valeur de glycémie : {value} mg/dL',
		},
		helpMessage:
			"J'envoie la dernière valeur de glycémie toutes les heures après la commande /start.",
		useStartCommand:
			'Utilisez la commande /start pour commencer à recevoir des mises à jour horaires de la glycémie.',
	},
}

module.exports = translations
