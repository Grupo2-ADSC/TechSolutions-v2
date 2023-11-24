var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idEmpresa, nome, email FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(senha, email, cnpj, nome, telefone/* , cep, logradouro, numero, complemento, bairro, cidade, estado */) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", senha, email, cnpj, nome, telefone/* , cep, logradouro, numero, complemento, bairro, cidade, estado */);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (senha, email, cnpj, nome, telefone) VALUES ('${senha}', '${email}', '${cnpj}', '${nome}', '${telefone}' );`

    /* var idEndereco = database.executar(`SELECT idEndereco FROM endereco WHERE cep = '${cep}' AND logradouro = '${logradouro}' AND numero = '${numero}'`); */

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarArmazem(numArmazem, area, cep, logradouro, numero, bairro, cidade, estado /* , cep, logradouro, numero, complemento, bairro, cidade, estado */) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", numArmazem, area, cep, logradouro, numero, bairro, cidade, estado/* , cep, logradouro, numero, complemento, bairro, cidade, estado */);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var fkEmpresa = JSON.parse(sessionStorage.getItem('ID_USUARIO'))

    var instrucao = `
        INSERT INTO armazem (numArmazem, area, cep, logradouro, numero, bairro, cidade, estado, fkEmpresa) VALUES ('${numArmazem}', '${area}', '${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${estado}', '${fkEmpresa}' );`

    /* var idEndereco = database.executar(`SELECT idEndereco FROM endereco WHERE cep = '${cep}' AND logradouro = '${logradouro}' AND numero = '${numero}'`); */

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/* function cadastrarEndereco(senha, email, cnpj, nome, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",  senha, email, cnpj, nome, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var instrucao = `
        INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, estado, tipo) VALUES ('${cep}', '${logradouro}', '${numero}', '${complemento}', '${bairro}', '${cidade}', '${estado}', 'empresa');
        `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} */

module.exports = {
    autenticar,
    cadastrar,
    cadastrarArmazem
};