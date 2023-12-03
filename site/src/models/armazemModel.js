var database = require("../database/config")

function cadastrar(numArmazem, area, qtdsetores, cep, logradouro, numero, complemento, bairro, cidade, estado, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", numArmazem, area, qtdsetores, cep, logradouro, numero, complemento, bairro, cidade, estado, idEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var instrucao = `
        INSERT INTO armazem (numeroArmazem, areaArmazem, qtdSetores, cep, logradouro, numero, complemento, bairro, cidade, estado, fkEmpresa) VALUES (${numArmazem}, ${area}, ${qtdsetores}, '${cep}', '${logradouro}', ${numero}, '${complemento}', '${bairro}', '${cidade}', '${estado}', ${idEmpresa});`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};