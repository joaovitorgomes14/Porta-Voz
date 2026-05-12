function validarEndereco(endereco) {

  const erros = [];

  if (
    endereco.rua !== undefined &&
    (
      typeof endereco.rua !== "string" ||
      !endereco.rua.trim()
    )
  ) {
    erros.push("Rua inválida.");
  }

  if (
    endereco.numero !== undefined &&
    Number.isNaN(Number(endereco.numero))
  ) {
    erros.push("Número inválido.");
  }

  if (
    endereco.bairro !== undefined &&
    (
      typeof endereco.bairro !== "string" ||
      !endereco.bairro.trim()
    )
  ) {
    erros.push("Bairro inválido.");
  }

  return {
    valido: erros.length === 0,
    erros
  };
}

module.exports = validarEndereco;