var express = require("express");
var router = express.Router();

var armazemController = require("../controllers/armazemController");
var armazemModel = require('../models/armazemModel')

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


router.get('/dadoSensores/:id', async (req, res) => {
  try {
      const resultadoSensor = armazemController.dadoSensores(req, res);
  } catch (erro) {
      console.error('Erro ao obter dados do sensor:', erro);
      res.status(500).send('Erro ao obter dados de consulta ao sensor.');
  }
});

router.get('/sensores/:id', (req, res) => {
  armazemController.getSensoresByArmazem(req, res)
})

router.get('/medidas/:id', (req, res) => {
  armazemController.getMedidasByArmazem(req, res)
})


router.get('/alertasGerais/:id', (req, res) => {
  armazemController.alertasGerais(req, res)
})

router.get('/sensor/:idSensor/:idArmazem', (req, res) => {
  armazemController.getMedidasBySensor(req, res)
})

module.exports = router;