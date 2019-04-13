const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
const PessoaController = require("./controllers/PessoaController");

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post("/boxes/:id/files", multer(multerConfig).single("file"), FileController.store);
routes.post("/cadastro/:tipo", PessoaController.cadastro);
routes.get("/busca/:tipo/:doc",PessoaController.buscaPorDoc);
routes.get("/busca/:cep",PessoaController.buscaEndereco);
module.exports = routes;