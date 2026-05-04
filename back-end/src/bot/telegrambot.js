const axios = require("axios");

const TOKEN = process.env.TELEGRAM_TOKEN;
const URL = `https://api.telegram.org/bot${TOKEN}`;

async function getUpdates(offset) {
    const response = await axios.get(`${URL}/getUpdates?offset=${offset}`);
    return response.data.result;
}

async function sendMessage(chatId, text) {
    await axios.post(`${URL}/sendMessage`, {
        chat_id: chatId,
        text: text
    });
}

module.exports = {
    getUpdates,
    sendMessage
};