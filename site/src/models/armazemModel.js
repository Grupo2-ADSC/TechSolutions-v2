var database = require("../database/config")

function getAlertaBySensor(idSensor, idArmazem) {
    var sql = `
    SELECT 
        s.idSensor AS 'idSensor',
        r.idRegistro AS 'idRegistro',
        r.dado AS 'umidade',
        DATE_FORMAT(r.dataHora, '%Y-%m-%d %H:%i:%s') AS 'data'
    FROM 
        armazem a
    JOIN 
        setor se ON a.idArmazem = se.fkArmazem
    JOIN 
        sensor s ON se.idSetor = s.fkSetor
    JOIN 
        registro r ON s.idSensor = r.fkSensor
    WHERE
        a.idArmazem = ${idArmazem}
        AND s.idSensor = ${idSensor}
        AND r.dataHora >= NOW() - INTERVAL 1 DAY;
    `

    return database.executar(sql)
}

function buscarArmazensPorEmpresa(empresaId) {

    instrucaoSql = `select * from armazem where fkEmpresa = ${empresaId}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(numArmazem, area, qtdsetores, cep, logradouro, numero, complemento, bairro, cidade, estado, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", numArmazem, area, qtdsetores, cep, logradouro, numero, complemento, bairro, cidade, estado, idEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var instrucao = `
        INSERT INTO armazem (numeroArmazem, areaArmazem, qtdSetores, cep, logradouro, numero, complemento, bairro, cidade, estado, fkEmpresa) VALUES (${numArmazem}, ${area}, ${qtdsetores}, '${cep}', '${logradouro}', ${numero}, '${complemento}', '${bairro}', '${cidade}', '${estado}', ${idEmpresa});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarSetores(nomesSetores, idArmazem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomesSetores, idArmazem);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var instrucao = `INSERT INTO setor (nome, fkArmazem) VALUES `;

    nomesSetores.forEach((nomesSetor, index) => {
        instrucao += `('${nomesSetor}', ${idArmazem}) ${index < nomesSetores.length - 1 ? ',' : ''}`;
    });

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT 
        idArmazem,
        numeroArmazem
        areaArmazem,
        qtdSetores,
        cep,
        estado,
        fkEmpresa
        FROM armazem;
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idArmazem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idArmazem);
    var instrucao = `
        DELETE FROM armazem WHERE idArmazem = ${idArmazem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadoSensores(idArmazem) {
    try {
        var query = `
        SELECT 
            s.idSensor AS idSensor,
            r.dado AS umidade,
            r.dataHora AS hora
        FROM registro r
            JOIN sensor s ON r.fkSensor = s.idSensor
            JOIN setor se ON s.fkSetor = se.idSetor
            JOIN armazem a ON se.fkArmazem = a.idArmazem
        WHERE a.idArmazem = ${idArmazem}
        ORDER BY r.dataHora DESC;
        `;
        console.log('resultado da consulta:', query);

        // Certifique-se de que a função executar está retornando os resultados
        const resultadoSensor = database.executar(query);
        console.log(`Dados recebidos do banco ${resultadoSensor}`)
        return resultadoSensor;
    } catch (erro) {
        console.error('Erro ao obter dados do ranking:', erro);
        throw erro;
    }
}

function alertasGerais(id) {
    var query = `
    SELECT 
        s.idSensor AS 'idSensor',
        r.idRegistro AS 'idRegistro',
        r.dado AS 'umidade',
        DATE_FORMAT(r.dataHora, '%Y-%m-%d %H:%i:%s') AS 'data'
    FROM 
        armazem a
    JOIN 
        setor se ON a.idArmazem = se.fkArmazem
    JOIN 
        sensor s ON se.idSetor = s.fkSetor
    JOIN 
        registro r ON s.idSensor = r.fkSensor
    WHERE
        a.idArmazem = ${id}
        AND r.dataHora >= NOW() - INTERVAL 1 DAY;
    `

    return database.executar(query)
}

function getSensoresByArmazem(id) {
    var query = `
    SELECT
        s.*,
        r.idRegistro,
        r.dado AS 'umidade',
        se.nome as 'setor',
        DATE_FORMAT(r.dataHora, '%Y-%m-%d %H:%i:%s') AS 'hora'
    FROM
        sensor s
    JOIN
        (
            SELECT
                fkSensor,
                MAX(dataHora) AS ultimaDataHora
            FROM
                registro
            GROUP BY
                fkSensor
        ) max_data
    ON
        s.idSensor = max_data.fkSensor
    JOIN
        registro r
    ON
        s.idSensor = r.fkSensor
        AND max_data.ultimaDataHora = r.dataHora
    JOIN
        setor se
    ON
        s.fkSetor = se.idSetor
    JOIN
        armazem a
    ON
        se.fkArmazem = a.idArmazem
    WHERE
        a.idArmazem = ${id};  -- Substitua pelo ID do armazém desejado

    `

    return database.executar(query)
}

function getMedidasByArmazem(id) {
    var sql = `
    SELECT 
        s.idSensor,
        r.idRegistro,
        r.dado AS 'umidade',
        DATE_FORMAT(r.dataHora, '%Y-%m-%d %H:%i:%s') AS 'hora'
    FROM 
        armazem a
    JOIN 
        setor se ON a.idArmazem = se.fkArmazem
    JOIN 
        sensor s ON se.idSetor = s.fkSetor
    JOIN 
        registro r ON s.idSensor = r.fkSensor
    WHERE 
        a.idArmazem = ${id}  -- Substitua pelo ID do armazém desejado
        AND r.dataHora >= NOW() - INTERVAL 5 SECOND
    ORDER BY
        r.dataHora DESC;
    `

    return database.executar(sql)
}

module.exports = {
    listar,
    deletar,
    buscarArmazensPorEmpresa,
    cadastrar,
    cadastrarSetores,
    dadoSensores,
    alertasGerais,
    getSensoresByArmazem,
    getAlertaBySensor,
    getMedidasByArmazem
};