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
const Usuario = require('./controllers/UsuarioController');

//pessoa
routes.post("/cadastro/", PessoaController.cadastro);
routes.get("/busca/:tipo/:doc",PessoaController.buscaPorDoc);
routes.post("/alterar/",PessoaController.alterar);
routes.get("/buscaId/:id",PessoaController.buscaPorID);
routes.get("/busca/",PessoaController.buscaTodos);

//servicos
routes.post("/servicos/cadastro", ServicoController.criaServico);
routes.post("/servicos/realizado/insere", ServicoController.realizaServico);
routes.get("/servicos/busca/:tipo",ServicoController.buscaServico);
routes.get("/servicos/realizados/busca",ServicoController.buscaServicosRealizados);
routes.get("/servicos/realizados/busca/todos",ServicoController.buscaServicoRealizadoId);
routes.get("/servicos/realizados/todos",ServicoController.buscaServicosRealizadosUltimaSemana);
routes.get("/servico/busca",ServicoController.buscaTodoServicos);
//imovel
routes.get("/imoveis/busca/:tipo",ImovelController.busca);
routes.post("/imoveis/cadastro",ImovelController.cadastro);
routes.post("/imoveis/insere/:tipo",ImovelController.insereImovel);
routes.get("/imoveis/pessoa/busca",ImovelController.consultaImoveisPessoa);
routes.post("/imoveis/remove/relacao", ImovelController.removeRelacao);
routes.post("/imoveis/update/relacao", ImovelController.updateRelacao);
routes.get("/imoveis/busca/",ImovelController.buscaTodos);
//produto
routes.post("/produto/cadastro",ProdutoController.cadastraProduto);
routes.get("/produtos/busca",ProdutoController.buscaProdutos);

//condominio
routes.post("/condominio/cadastro",CondominioController.cadastraCondominio);
routes.get("/condominio/busca/:tipo",CondominioController.buscaCondominio);

//usuario
routes.post("/user/registro",Usuario.register);
routes.post("/user/auth",Usuario.auth);
routes.get("/user/busca/:id",Usuario.busca);

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post("/boxes/:id/files", multer(multerConfig).single("file"), FileController.store);

module.exports = routes;