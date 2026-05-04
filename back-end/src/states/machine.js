const validarEndereco = require('../validations/validarEndereco');


const state = {
  INICIO: 'INICIO',
  DESCRICAO: 'DESCRICAO',
  ENDERECO: 'ENDERECO', // corrigido (sem acento)
  CONFIRMACAO: 'CONFIRMACAO',
};


const transitions = {
  [state.INICIO]: state.DESCRICAO,
  [state.DESCRICAO]: state.ENDERECO,
  [state.ENDERECO]: state.CONFIRMACAO,
};


function getNextState(currentState) {
  // ❗ Correção: removi variável desnecessária
  // antes você criava "nextState" e não usava
  return transitions[currentState] || state.INICIO;
}


function isValidState(currentState) {
  const validStates = Object.values(state);
  return validStates.includes(currentState);
}


async function handle({ userId, state: currentState, message }) {
  let response = "";
  let nextState = currentState;

  switch (currentState) {

    case state.INICIO:
      response = "Olá! Qual é o problema?";
      nextState = state.DESCRICAO;
      break;

    case state.DESCRICAO:
      if (!message) {
        response = "Descreva o problema, por favor.";
        break;
      }

      response = "Informe o endereço do problema.";
      nextState = state.ENDERECO;
      break;

    case state.ENDERECO:
        if (!message) {
    response = "Informe um endereço válido.";
    break;
  }

  const resultadoValidacao = validarEndereco(message);

if (!resultadoValidacao.valido) {

    response = resultadoValidacao.erros.join(", ");

    nextState = state.ENDERECO;

    break;
}

  response = "Deseja confirmar a solicitação? (sim/não)";
  nextState = state.CONFIRMACAO;

  break;

    case state.CONFIRMACAO:

      if (!message) {
        response = "Responda com 'sim' ou 'não'.";
        break;
      }

      const resposta = message.toLowerCase();

      if (resposta === "sim") {
        response = "Solicitação registrada com sucesso!";
        nextState = state.INICIO; // reinicia fluxo
      } else {
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
  getNextState,
  isValidState,
  handle
};