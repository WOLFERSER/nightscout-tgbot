# Nightscout Telegram Bot

[English](#english) | [Русский](#русский)

## English

Nightscout Telegram Bot is a Telegram bot that monitors blood sugar levels using the Nightscout API. The bot sends the latest blood sugar measurement to a specified chat every hour.

### Features

- Retrieves the latest blood sugar measurement from the Nightscout API.
- Sends the blood sugar measurement to a specified Telegram chat every hour.
- Starts the hourly job when the `/start` command is issued.

### Prerequisites

- Node.js and npm installed on your machine.
- A Nightscout instance with API access.
- A Telegram bot token from BotFather.
- The chat ID of the recipient (can be a user or a group).

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

1. Create a `config.json` file in the root directory with the following content:

    ```json
    {
      "botToken": "YOUR_TELEGRAM_BOT_TOKEN",
      "nightscoutUrl": "YOUR_NIGHTSCOUT_URL",
      "chatId": "YOUR_CHAT_ID"
    }
    ```

    Replace `YOUR_TELEGRAM_BOT_TOKEN`, `YOUR_NIGHTSCOUT_URL`, and `YOUR_CHAT_ID` with your actual bot token, Nightscout URL, and chat ID, respectively.

### Usage

1. Start the bot:

    ```sh
    npm start
    ```

2. In Telegram, send the `/start` command to your bot to begin receiving hourly updates.

### Notes

- The bot will only start the hourly job once, even if `/start` is issued multiple times.
- Ensure your Nightscout URL is accessible and correct.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Русский

Nightscout Telegram Bot — это Telegram-бот, который отслеживает уровень сахара в крови с использованием Nightscout API. Бот отправляет последнее измерение уровня сахара в указанный чат каждый час.

### Возможности

- Получает последнее измерение уровня сахара из Nightscout API.
- Отправляет измерение уровня сахара в указанный чат Telegram каждый час.
- Запускает ежечасную задачу при выполнении команды `/start`.

### Необходимые условия

- Node.js и npm, установленные на вашем компьютере.
- Экземпляр Nightscout с доступом к API.
- Токен бота Telegram от BotFather.
- Идентификатор чата получателя (может быть пользователем или группой).

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

1. Создайте файл `config.json` в корневом каталоге со следующим содержимым:

    ```json
    {
      "botToken": "YOUR_TELEGRAM_BOT_TOKEN",
      "nightscoutUrl": "YOUR_NIGHTSCOUT_URL",
      "chatId": "YOUR_CHAT_ID"
    }
    ```

    Замените `YOUR_TELEGRAM_BOT_TOKEN`, `YOUR_NIGHTSCOUT_URL` и `YOUR_CHAT_ID` на ваш фактический токен бота, URL Nightscout и идентификатор чата соответственно.

### Использование

1. Запустите бота:

    ```sh
    npm start
    ```

2. В Telegram отправьте команду `/start` вашему боту, чтобы начать получать обновления каждый час.

### Примечания

- Бот запустит ежечасную задачу только один раз, даже если команда `/start` будет выполнена несколько раз.
- Убедитесь, что ваш URL Nightscout доступен и правильный.

### Лицензия

Этот проект лицензирован под лицензией MIT. См. файл [LICENSE](LICENSE) для получения дополнительной информации.
