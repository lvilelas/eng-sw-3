const Servico = require("../models/Servico");
const ServicoRealizado = require("../models/ServicoRealizado");
const Pessoa = require("../models/Pessoa");
class ServicoController{
    async criaServico(req,res){
        const nome = req.body.nome;
        if(await Servico.findOne({nome})){
            return res.json({"info" : "serviço ja existe"});
        }
        const servico = await Servico.create(req.body);
        return res.json(servico);
    }

    async buscaServico(req,res){
        const conteudo = req.query.content;
        let servico = null;
        if(req.params.tipo == "id"){
            servico = await Servico.findById(conteudo);
        }else if(req.params.tipo=="nome"){
            servico = await Servico.findOne({nome : conteudo})
        }else{
            return res.status("202").json({"erro":"servico não encontrado"});
        }
        if(servico==null){
            return res.status("202").json({"erro":"servico não encontrado"});
        }
        return res.json(servico);
    }

    async realizaServico(req,res){
        var valor = req.body.valor;
        var data = new Date();
        if(!(/[0-9]+(\.[0-9][0-9]?)?/).test(valor)){
            return res.json({"erro":"valor invalido"});
        }
        valor = `R$ ${valor}`;
        let pessoa;
        if(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(req.body.doc) || /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/.test(req.bod.doc)){
            pessoa = await Pessoa.findOne({"doc":req.body.doc});
        }else{
            return res.status(202).json({"erro":"documento invalido"});
        }
        if(pessoa==null){
            return res.status(202).json({"erro":"pessoa não encontrada"});
        }
        if(pessoa.fornecedor==false){
            return res.status(202).json({"erro":"Não é um fornecedor valido"});
        }
        const servico = await Servico.findOne({"nome":req.body.servico});
        if(servico == null){
            return res.status(202).json({"erro":"serviço não encontrado"});
        }
        const servicoRealizado = await ServicoRealizado.create({"servico" : servico,"valor":valor,"data":data,"fornecedor":pessoa});
        return res.json(servicoRealizado);
    }

    async buscaServicosRealizados(req,res){
        const servico = await Servico.findOne({"nome":req.query.servico});
        const servicos = await ServicoRealizado.find({"servico":servico}).populate("servico").populate("fornecedor");
        return res.json(servicos);
    }
}

module.exports = new ServicoController();