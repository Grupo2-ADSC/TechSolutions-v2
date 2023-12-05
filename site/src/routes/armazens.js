var express = require("express");
var router = express.Router();

var armazemController = require("../controllers/armazemController");

//Recebendo os dados do html e direcionando para a função cadastrar de armazemController.js
router.get("/:empresaId", function (req, res) {
    armazemController.buscarArmazensPorEmpresa(req, res);
  });

router.post("/cadastrar", function (req, res) {
    armazemController.cadastrar(req, res);
})

router.post("/cadastrarSetores", function (req, res) {
  armazemController.cadastrarSetores(req, res);
})

router.post("/listar", function (req, res) {
  armazemController.listar(req, res);
})

router.delete("/deletar/:idArmazem", function (req, res) {
  armazemController.deletar(req, res);
});


module.exports = router;