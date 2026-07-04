const stateMachine = require("../states/machine");
const stateStore = require("../states/statestore");
const userService = require("../services/userservice");
const complaintService = require("../services/complaintService");


async function processarMensagem(externalId, text) {

  //converte externalId → usuario_id
  const userId = await userService.getOrCreateUser(externalId);


  // busca estado atual
  const currentState = await stateStore.getState(userId);


  // busca dados do usuário
  const user = await stateStore.getUserData(userId);

  


  const { nextState, response, shouldSaveComplaint } = await stateMachine.handle({
    user,
    userId,
    state: currentState,
    message: text
  });

  await stateStore.setState(userId, nextState);
  await stateStore.setUserData(userId, user);

  if (shouldSaveComplaint) {
    await complaintService.saveComplaint(userId, {
      descricao: user.descricao,
      endereco: user.endereco,
      status: "Pendente",
      prioridade: "Média",
      setor: "Não definido",
    });
  }

  return response;
}


module.exports = {
  processarMensagem
};