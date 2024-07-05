# Nightscout Telegram Bot

[English](#english) | [Русский](#русский)

## English

Nightscout Telegram Bot is a Telegram bot that monitors blood sugar levels using the Nightscout API. The bot sends the latest blood sugar measurement to specified chats every hour.

### Features

- Retrieves the latest blood sugar measurement from the Nightscout API.
- Sends the blood sugar measurement to specified Telegram chats every hour.
- Starts the hourly job when the `/start` command is issued.
- Allows users to check the latest blood sugar value using the `/sugar` command (authorized users only).
- Supports multiple languages (English, German, Spanish, Chinese, Russian, Portuguese, French).
- Supports different units for blood sugar measurement (mmol/L or mg/dL).

### Prerequisites

- Node.js 20.14.0 installed on your machine.
- A Nightscout instance with API access.
- A Telegram bot token from BotFather.
- The chat IDs of the recipients (can be users or groups).

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/WOLFERSER/nightscout-tgbot.git
   cd nightscout-tgbot
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Configuration

1. Create a `config.yaml` file in the root directory with the following content:

   ```yaml
   botToken: 'YOUR_TELEGRAM_BOT_TOKEN' # Telegram bot token
   nightscoutUrl: 'YOUR_NIGHTSCOUT_URL' # URL of your Nightscout instance
   chatIds: # List of chat IDs to send messages to
     - 'CHAT_ID_1'
     - 'CHAT_ID_2'
   language: 'en' # Current language (en, de, es, zh, ru, pt, fr)
   units: 'mmol/L' # Units for blood sugar measurement (mmol/L or mg/dL)

   # Available language options:
   # en - English
   # de - German
   # es - Spanish
   # zh - Chinese
   # ru - Russian
   # pt - Portuguese
   # fr - French

   # Available units options:
   # mmol/L - Millimoles per liter
   # mg/dL - Milligrams per deciliter
   ```

   Replace `YOUR_TELEGRAM_BOT_TOKEN`, `YOUR_NIGHTSCOUT_URL`, and `CHAT_ID_1`, `CHAT_ID_2` with your actual bot token, Nightscout URL, and chat IDs, respectively. Choose the language code from the available options and the units for blood sugar measurement.

### Usage

1. Start the bot:

   ```sh
   npm start
   ```

2. In Telegram, send the `/start` command to your bot to begin receiving hourly updates.
3. Authorized users can use the `/sugar` command to get the latest blood sugar value.

### Notes

- The bot will only start the hourly job once, even if `/start` is issued multiple times.
- Ensure your Nightscout URL is accessible and correct.
- Only users specified in `chatIds` are authorized to use the `/sugar` command.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Русский

Nightscout Telegram Bot — это Telegram-бот, который отслеживает уровень сахара в крови с использованием Nightscout API. Бот отправляет последнее измерение уровня сахара в указанные чаты каждый час.

### Возможности

- Получает последнее измерение уровня сахара из Nightscout API.
- Отправляет измерение уровня сахара в указанные чаты Telegram каждый час.
- Запускает ежечасную задачу при выполнении команды `/start`.
- Позволяет пользователям проверять последнее значение сахара в крови с помощью команды `/sugar` (только авторизованные пользователи).
- Поддерживает несколько языков (английский, немецкий, испанский, китайский, русский, португальский, французский).
- Поддерживает различные единицы измерения уровня сахара в крови (ммоль/л или мг/дл).

### Необходимые условия

- Node.js 20.14.0, установленный на вашем компьютере.
- Экземпляр Nightscout с доступом к API.
- Токен бота Telegram от BotFather.
- Идентификаторы чатов получателей (могут быть пользователями или группами).

### Установка

1. Клонируйте репозиторий:

   ```sh
   git clone https://github.com/WOLFERSER/nightscout-tgbot.git
   cd nightscout-tgbot
   ```

2. Установите зависимости:

   ```sh
   npm install
   ```

### Конфигурация

1. Создайте файл `config.yaml` в корневом каталоге со следующим содержимым:

   ```yaml
   botToken: 'YOUR_TELEGRAM_BOT_TOKEN' # Токен бота Telegram
   nightscoutUrl: 'YOUR_NIGHTSCOUT_URL' # URL вашего экземпляра Nightscout
   chatIds: # Список идентификаторов чатов для отправки сообщений
     - 'CHAT_ID_1'
     - 'CHAT_ID_2'
   language: 'ru' # Текущий язык (en, de, es, zh, ru, pt, fr)
   units: 'mmol/L' # Единицы измерения уровня сахара в крови (ммоль/л или мг/дл)

   # Доступные языковые опции:
   # en - Английский
   # de - Немецкий
   # es - Испанский
   # zh - Китайский
   # ru - Русский
   # pt - Португальский
   # fr - Французский

   # Доступные опции единиц измерения:
   # mmol/L - Миллимоли на литр
   # mg/dL - Миллиграммы на децилитр
   ```

   Замените `YOUR_TELEGRAM_BOT_TOKEN`, `YOUR_NIGHTSCOUT_URL` и `CHAT_ID_1`, `CHAT_ID_2` на ваш фактический токен бота, URL Nightscout и идентификаторы чатов соответственно. Выберите код языка из доступных опций и единицы измерения уровня сахара в крови.

### Использование

1. Запустите бота:

   ```sh
   npm start
   ```

2. В Telegram отправьте команду `/start` вашему боту, чтобы начать получать ежечасные обновления.
3. Авторизованные пользователи могут использовать команду `/sugar`, чтобы получить последнее значение уровня сахара в крови.

### Примечания

- Бот запустит ежечасную задачу только один раз, даже если команда `/start` будет выполнена несколько раз.
- Убедитесь, что ваш URL Nightscout доступен и правильный.
- Только пользователи, указанные в `chatIds`, имеют право использовать команду `/sugar`.

### Лицензия

Этот проект лицензирован под лицензией MIT. См. файл [LICENSE](LICENSE) для получения дополнительной информации.
