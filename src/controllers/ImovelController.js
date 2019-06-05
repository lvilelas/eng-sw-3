const Imovel = require('../models/Imovel');
const path = require('path');
const request = require('request');
const PF = require("../models/PessoaFisica");
const PJ = require('../models/PessoaJuridica');
const Pessoa = require("../models/Pessoa");
const sleep = require('system-sleep');

class ImovelController{

    async cadastro(req,res){
        const setor = req.body.setor;
        if(await Imovel.findOne({setor})){
            return res.json({"response":"Imovel ja cadastrado"});
        }
        const imovel = await Imovel.create(req.body);
        return res.json(imovel);
    }
    async busca(req,res){
        if(req.params.tipo == "id"){
            try {
                const imovel = await Imovel.findById(req.query.id);
                if(imovel == null){
                    return res.status(202).send("Imovel não encontrado");
                }
                return res.json(imovel);
            } catch (error) {
                return res.status(202).send("Imovel não encontrado");
            }
        }else if(req.params.tipo == "setor"){
           try {
               const imovel = await Imovel.findOne({"setor":req.query.setor});
               if(imovel == null){
                    return res.status(202).send("Imovel não encontrado");
                }
               return res.json(imovel);
           } catch (error) {
               return res.status(202).send("Imovel não encontrado");
           }
        }else{
            return res.status(404).send("Not Found"+req.param.tipo);
        }
    }

    async insereImovel(req,res){
        var doc = req.body.doc;
        const tipo = req.params.tipo;
        var achouImovel = null;
        let tipoPessoa;
        const setor = req.body.setor;

        if(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/.test(doc)){
            tipoPessoa = await PF.findOne({"cpf":doc}).populate("pessoa");;
        }else if(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(doc)){
            tipoPessoa = await PJ.findOne({"cnpj":doc}).populate("pessoa");;
        }else{
            return res.status(422).json({"menssagem":"documento invalido"});
        }

        if(req.body.relacionamento==null){
            return res.status(202).json({"mensagem":"Relacionamento não preenchido"});
        }
        let imovel;
        if(tipo=="setor"){
            imovel = await Imovel.findOne({"setor":setor});
        }else if(tipo=="id"){
            imovel = await Imovel.findById(setor);
        }
        if(imovel == null){
            //return res.status(202).json({"mensagem":"imovel não encontrado"});
        }
        const imoveis = {relacionamento:req.body.relacionamento,"imovel":imovel};
        tipoPessoa.pessoa.imoveis.push(imoveis);
        await tipoPessoa.pessoa.save();
        return res.send({tipoPessoa});
    }

    async consultaImoveisPessoa(req,res){
        var doc = req.query.doc;
        let tipoPessoa;
        if(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/.test(doc)){
            tipoPessoa = await PF.findOne({"cpf":doc}).populate("pessoa");;
        }else if(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(doc)){
            tipoPessoa = await PJ.findOne({"cnpj":doc}).populate("pessoa");;
        }else{
            return res.status(422).json({"menssagem":"documento invalido"});
        }
        return res.status(200).json(tipoPessoa.pessoa.imoveis);
    }

    async removeRelacao(req,res){
        var doc = req.body.doc;
        let tipoPessoa;
        if(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/.test(doc)){
            tipoPessoa = await PF.findOne({"cpf":doc}).populate("pessoa");;
        }else if(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(doc)){
            tipoPessoa = await PJ.findOne({"cnpj":doc}).populate("pessoa");;
        }else{
            return res.status(422).json({"menssagem":"documento invalido"});
        }
        tipoPessoa.pessoa.imoveis.remove(req.body.idRelacao);
        tipoPessoa.pessoa.save();
        return res.status(200).json(tipoPessoa.pessoa.imoveis);
    }
    async updateRelacao(req,res){
        var doc = req.body.doc;
        let tipoPessoa;
        if(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/.test(doc)){
            tipoPessoa = await PF.findOne({"cpf":doc}).populate("pessoa");;
        }else if(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(doc)){
            tipoPessoa = await PJ.findOne({"cnpj":doc}).populate("pessoa");;
        }else{
            return res.status(422).json({"menssagem":"documento invalido"});
        }
        
        const imoveis = {relacionamento:req.body.relacionamento,"imovel":imovel};
        tipoPessoa.pessoa.imoveis.remove(req.body.idRelacao);
        tipoPessoa.pessoa.imoveis.push
        tipoPessoa.pessoa.save();
        return res.status(200).json(tipoPessoa.pessoa.imoveis);
    }
}
module.exports = new ImovelController();