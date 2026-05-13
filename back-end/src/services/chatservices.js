const stateMachine = require("../states/machine");
const stateStore = require("../states/statestore");
const userService = require("../services/userservice");


async function processarMensagem(externalId, text) {

  //converte externalId → usuario_id
  const userId = await userService.getOrCreateUser(externalId);


  // busca estado atual
  const currentState = await stateStore.getState(userId);


  // busca dados do usuário
  const user = await stateStore.getUserData(userId);

  


  // processa mensagem
  const { nextState, response } = await stateMachine.handle({
    user,
    userId,
    state: currentState,
    message: text
  });


  // salva estado
  await stateStore.setState(userId, nextState);


  // salva dados do usuário
  await stateStore.setUserData(userId, user);


  return response;
}


module.exports = {
  processarMensagem
};