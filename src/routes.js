const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
const PessoaController = require("./controllers/PessoaController");
const ImovelController = require("./controllers/ImovelController");

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post("/boxes/:id/files", multer(multerConfig).single("file"), FileController.store);
routes.post("/cadastro/:tipo", PessoaController.cadastro);
routes.get("/busca/:tipo/:doc",PessoaController.buscaPorDoc);
routes.get("/busca/:cep",PessoaController.buscaEndereco);
routes.post("/imoveis/cadastro",ImovelController.cadastro);
routes.get("/imoveis/busca/:tipo",ImovelController.busca);
routes.post("/imoveis/insere/:tipo",ImovelController.insereImovel);

module.exports = routes;