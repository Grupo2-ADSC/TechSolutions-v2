var armazemModel = require("../models/armazemModel");


function buscarArmazensPorEmpresa(req, res) {
    var idUsuario = req.params.idUsuario;

    armazemModel.buscarArmazensPorEmpresa(idUsuario).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os armazens: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function cadastrarSetores(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastroArmazem.html
    var nomesSetores = req.body.nomesSetoresServer;
    var idArmazem = req.body.idArmazemServer;

    // Faça as validações dos valores
    if (nomesSetores == undefined) {
        res.status(400).send("O nome dos seus setores está undefined!");
    } else if (idArmazem == undefined) {
        res.status(400).send("Seu idArmazem está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo armazemModel.js
        armazemModel.cadastrarSetores(nomesSetores, idArmazem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro dos Setores! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function cadastrar(req, res) {
    var numArmazem = req.body.numArmazemServer;
    var area = req.body.areaServer;
    var qtdsetores = req.body.qtdsetoresServer;
    var cep = req.body.cepServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (numArmazem == undefined) {
        res.status(400).send("Seu numero de armazém está undefined!");
    } else if (area == undefined) {
        res.status(400).send("Sua area está undefined!");
    } else if (qtdsetores == undefined) {
        res.status(400).send("Sua quantidade de setores está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo ArmazemModel.js
        armazemModel.cadastrar(numArmazem, area, qtdsetores, cep, logradouro, numero, complemento, bairro, cidade, estado, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro de armazém! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function listar(req, res) {
    armazemModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os armazens: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
    var idArmazem = req.params.idArmazem;

    armazemModel.deletar(idArmazem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o armazem: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    deletar,
    buscarArmazensPorEmpresa,
    cadastrar,
    cadastrarSetores
}