function validarEndereco(endereco) {

    if (!endereco) {
        return {
            valido: false,
            erros: ['Endereço é obrigatório']
        };
    }

    if (endereco.trim().length < 10) {
        return {
            valido: false,
            erros: ['Digite um endereço mais completo']
        };
    }

    return {
        valido: true,
        erros: []
    };
}

module.exports = validarEndereco;