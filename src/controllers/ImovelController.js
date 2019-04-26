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
        var tipoDoc;
        const tipo = req.params.tipo;
        var achouImovel = null;
        if(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(doc)){
            doc = doc.replace();
            tipoDoc = "cpf";
        }else if(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/.test(doc)){
            tipoDoc = "cnpj";
        }else{
            return res.status(422).json({"menssagem":"documento invalido"});
        }
        let imovel;
        const hostName = process.env.URL || "http://localhost:3333";
        const path = `/imoveis/busca/${tipo}`;
        await request(hostName+path+"?"+tipo+"="+req.body.setor, (err, res, body) =>{
            if(res.statusCode==200){
                imovel = new Imovel(JSON.parse(body));
            }
            achouImovel = imovel!=null?true:false;
        });
        while(achouImovel == null){
            await sleep(1000)
        }
        if(achouImovel == false){
            return res.status(202).json({"mensagem":"imovel não encontrado"});
        }
        var id = "";
            if(tipoDoc == "cpf"){
                const pessoa = await PF.findOne({"cpf":doc});
                id = pessoa.pessoa;
            }else{
                const pessoa = await PJ.findOne({"cnpj":doc});
                id = pessoa.pessoa;
            }
        if(req.body.relacionamento==null){
            return res.status(202).json({"mensagem":"Relacionamento não preenchido"});
        }
        const pessoaAtual = await Pessoa.findById(id);
        const imoveis = {relacionamento:req.body.relacionamento,imovel:imovel};
        pessoaAtual.imoveis.push(imoveis);
        await pessoaAtual.save();
        return res.send({pessoaAtual});
    }

}
module.exports = new ImovelController();