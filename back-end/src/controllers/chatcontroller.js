const chatService = require(".src/services/chatservices");

async function handleMessage(userId, text) {
   return await chatService.processMessage(userId, text);
}

module.exports = {
   handleMessage
};