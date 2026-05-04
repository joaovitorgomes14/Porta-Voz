require("dotenv").config();

const { getUpdates, sendMessage } = require("./bot/telegrambot");
const { processarMensagem } = require("./services/chatservices");

async function main() {
    let offset = 0;

    console.log("Bot rodando...");

    while (true) {
        try {
            const updates = await getUpdates(offset);

            for (const update of updates) {
                const message = update.message;
                if (!message) continue;

                const chatId = message.chat.id;
                const text = message.text;

                console.log("Recebido:", text);

                const resposta = await processarMensagem(chatId, text);

                await sendMessage(chatId, resposta);

                offset = update.update_id + 1;
            }

        } catch (err) {
            console.error("Erro:", err.message);
        }
    }
}

main();