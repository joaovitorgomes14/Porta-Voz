const stateMachine = require("../states/machine");
const stateStore = require("../states/statestore");
const userService = require("../services/userservice");

async function processarMensagem(externalId, text) {

   // 🔥 converte externalId → usuario_id
   const userId = await userService.getOrCreateUser(externalId);

   // 🔍 pega estado atual
   const currentState = await stateStore.getState(userId);

   const { nextState, response } = await stateMachine.handle({
      userId,
      state: currentState,
      message: text
   });

   // 💾 salva estado
   await stateStore.setState(userId, nextState);

   return response;
}

module.exports = {
   processarMensagem
};