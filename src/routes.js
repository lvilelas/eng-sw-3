const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
const PessoaController = require("./controllers/PessoaController");
const ImovelController = require("./controllers/ImovelController");
const ServicoController = require("./controllers/ServicoController");
const ProdutoController = require("./controllers/ProdutoController");
const CondominioController = require("./controllers/CondominioController");

//pessoa
routes.post("/cadastro/", PessoaController.cadastro);
routes.get("/busca/:tipo/:doc",PessoaController.buscaPorDoc);
routes.post("/alterar/",PessoaController.alterar);

//servicos
routes.post("/servicos/cadastro", ServicoController.criaServico);
routes.post("/servicos/realizado/insere", ServicoController.realizaServico);
routes.get("/servicos/busca/:tipo",ServicoController.buscaServico);
routes.get("/servicos/realizados/busca",ServicoController.buscaServicosRealizados);

//imovel
routes.get("/imoveis/busca/:tipo",ImovelController.busca);
routes.post("/imoveis/cadastro",ImovelController.cadastro);
routes.post("/imoveis/insere/:tipo",ImovelController.insereImovel);
routes.get("/imoveis/pessoa/busca",ImovelController.consultaImoveisPessoa);
routes.post("/imoveis/remove/relacao", ImovelController.removeRelacao);

//produto
routes.post("/produto/cadastro",ProdutoController.cadastraProduto);
routes.get("/produtos/busca",ProdutoController.buscaProdutos);

//condominio
routes.post("/condominio/cadastro",CondominioController.cadastraCondominio);
routes.get("/condominio/busca/:tipo",CondominioController.buscaCondominio);

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post("/boxes/:id/files", multer(multerConfig).single("file"), FileController.store);

module.exports = routes;