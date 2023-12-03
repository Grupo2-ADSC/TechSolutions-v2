var express = require("express");
var router = express.Router();

var armazemController = require("../controllers/armazemController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    console.log("Rota de cadastro de armazém alcançada!");
    console.log("Dados recebidos:", req.body);
    armazemController.cadastrar(req, res);
})

module.exports = router;