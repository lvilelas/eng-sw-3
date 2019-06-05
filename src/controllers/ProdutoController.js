const Produto = require("../models/Produto");
const Movimentacao = require("../models/Movimentacao");
const Condominio = require("../models/Condominio");

class ProdutoController{
    async cadastraProduto(req,res){
        const nome = req.body.nome;
        const nomeCondominio = req.body.condominio;
        if(await Produto.findOne({nome})){
            return res.status(206).json({"mensagem":"Produto ja existe"});
        }
        const condominio = await Condominio.findOne({"nome":nomeCondominio});
        if(condominio == null){
            return res.status(202).json({"mensagem":"Condominio não encontrado"});
        }
        req.body.condominio = condominio;
        const produto = await Produto.create(req.body);
        var m = new Movimentacao();
        m.quantidade = req.body.quantidade;
        m.nome = req.body.nome;
        m.produto = produto;
        m.tipo_movimentacao = "Entrada";
        const movimentacao = await Movimentacao.create(m);
        return produto;
    }
    async buscaProdutos(req,res){
        if(req.query.nome==null){
            return await Produto.find();
        }else{
            return await Produto.findOne({"nome":req.query.nome});
        }        
    }    

    async movimentaProduto(req,res){
        const produto = await Produto.findById(req.body.produto);
        if(produto==null){
            return res.status(202).json({"mensagem":"Produto não encontrado"});
        }
        var movimentacao = new Movimentacao();
        if(req.body.tipo == "Entrada"){
            produto.quantidade = produto.quantidade + req.body.quantidade;
        }else if(req.body.tipo == "Saida"){
            produto.quantidade = produto.quantidade - req.body.quantidade;        
        }
        produto.save();
        movimentacao.quantidade = req.body.quantidade;
        movimentacao.tipo_movimentacao = req.body.tipo;
        movimentacao.produto = produto;
        await Movimentacao.create(movimentacao);
    }
}

module.exports = new ProdutoController();