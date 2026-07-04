const validarEndereco = require('../validations/validarEndereco');


const state = {
  INICIO: 'INICIO',
  DESCRICAO: 'DESCRICAO',
  RUA: 'RUA',
  BAIRRO: 'BAIRRO',
  CONFIRMACAO: 'CONFIRMACAO',
};

function isValidState(currentState) {
  const validStates = Object.values(state);
  return validStates.includes(currentState);
}


async function handle({ user, state: currentState, message }) {

  if (!user) {
    user = {};
  }

  if (!currentState) {
    currentState = state.INICIO;
  }

  if (!user.endereco) {
    user.endereco = {};
  }

  if (!isValidState(currentState)) {
  currentState = state.INICIO;
}

  let response = "";
  let nextState = currentState;

  

  switch (currentState) {

    case state.INICIO:
      response = "Olá! Este canal foi criado para facilitar o envio de reclamações e solicitações à prefeitura. Qual problema você deseja relatar?";
      nextState = state.DESCRICAO;
      break;

    case state.DESCRICAO:
      if (!message || !message.trim()) {
        response = "Descreva o problema, por favor.";
        break;
      }
      user.descricao = message.trim();

      response = "Informe a rua do problema.";
      nextState = state.RUA;
      break;

    case state.RUA:
      if (!message || !message.trim()) {
        response = "Informe a rua do problema.";
        break;
      }
      user.endereco.rua = message.trim();
      nextState = state.BAIRRO;

      response = "Informe o bairro do problema.";
      break;

    case state.BAIRRO:
      if (!message || !message.trim()) {
        response = "Informe o bairro do problema.";
        break;
      }
      user.endereco.bairro = message.trim();

      let resultadoValidacao;

      try {

        resultadoValidacao = validarEndereco(user.endereco);

      } catch (error) {

        response = "Erro ao validar endereço.";
        break;
      }

      if (!resultadoValidacao.valido) {

        response = resultadoValidacao.erros.join(", ");

        break;
      }

      nextState = state.CONFIRMACAO;

    response = `
    Problema: ${user.descricao}

    Rua: ${user.endereco.rua}
    Bairro: ${user.endereco.bairro}

    Deseja confirmar? (sim/não)
    `;

      break;

    case state.CONFIRMACAO:

      if (!message || !message.trim()) {
        response = "Responda com 'sim' ou 'não'.";
        break;
      }

      const resposta = message.trim().toLowerCase();

      if (
        resposta !== "sim" &&
        resposta !== "não" &&
        resposta !== "nao"
      ) {
        response = "Responda apenas com 'sim' ou 'não'.";
        break;
      }

      if (resposta === "sim") {
        response = "Solicitação registrada com sucesso!";
        nextState = state.INICIO;
        return {
          nextState,
          response,
          shouldSaveComplaint: true
        };
      } else {
        user.descricao = "";
        user.endereco = {};
        response = "Solicitação cancelada.";
        nextState = state.INICIO;
      }
      break;

    default:
      response = "Não entendi.";
      nextState = state.INICIO;
  }

  return {
    nextState,
    response
  };
}

module.exports = {
  state,
  isValidState,
  handle
};