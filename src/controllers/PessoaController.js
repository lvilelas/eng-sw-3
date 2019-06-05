const PJ = require('../models/PessoaJuridica');
const PF = require("../models/PessoaFisica");
const Pessoa = require("../models/Pessoa");
const Endereco = require("../models/Endereco");


class PessoaController{
    async cadastro(req,res) {
        if(req.params.tipo == 'J'){
            const {cnpj} = req.body;
            if(await PJ.findOne({cnpj})){
                return res.json({"response":"Pessoa ja cadastrada"});
            }
        }else if(req.params.tipo == 'F'){
            const {cpf} = req.body;
            if(await PF.findOne({cpf})){
                return res.json({"response":"Pessoa ja cadastrada"});
            }
        }else{
            return res.status(404).send('Not Found');
        }
        try {
            let endereco = await Endereco.findOne({"cep":req.body.pessoa.endereco.endereco.cep});
            if(endereco == null){
                endereco = await Endereco.create(req.body.pessoa.endereco.endereco);
            }
            req.body.pessoa.endereco.endereco = endereco;
            const pessoa = await Pessoa.create(req.body.pessoa);
            req.body.pessoa = pessoa;
            if(req.params.tipo == 'J'){
                const pj = await PJ.create(req.body); 
                return res.json(pj);
            }else{
                const pf = await PF.create(req.body);
                return res.json(pf);
            }
        } catch (error) {
            return res.json(error);
        }        
    }
    async alterar(req,res){
        let tipoPessoa;
        if(req.params.tipo == 'J'){
            const {cnpj} = req.body;
            tipoPessoa = await PJ.findOne({cnpj}).populate("pessoa");
        }else if(req.params.tipo == 'F'){
            const {cpf} = req.body;
            tipoPessoa = await PF.findOne({cpf}).populate("pessoa");
        }else{
            return res.status(404).send('Not Found');
        }
        try {
            let endereco = await Endereco.findOne({"cep":req.body.pessoa.endereco.endereco.cep});
            if(endereco == null){
                endereco = await Endereco.create(req.body.pessoa.endereco.endereco);
            }
            const imoveis = tipoPessoa.pessoa.imoveis;
            tipoPessoa.pessoa = req.body.pessoa;
            tipoPessoa.pessoa.imoveis = imoveis;
            tipoPessoa.pessoa.endereco.endereco = endereco;
            await tipoPessoa.pessoa.save();
            await tipoPessoa.save();
            res.json(tipoPessoa);
        } catch (error) {
            return res.json(error);
        }  
    }

    async buscaPorDoc(req,res){
        if(req.params.tipo == "J"){
            var cnpj = req.params.doc;
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            const pj = await PJ.findOne({cnpj}).populate("pessoa");
            return (pj==null) ? res.status(200).json({"mensagem":"Usuario não cadastrado"}) : res.json(pj);
        }else if(req.params.tipo == "F"){
            var cpf = req.params.doc;
            cpf = cpf.replace(/^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/, "$1.$2.$3-$4");
            const pf = await PF.findOne({cpf}).populate("pessoa");
            return (pf==null)? res.status(200).json({"mensagem":"Usuario não cadastrado"}) : res.json(pf);
        }else{
            return res.json("erro");
        }
    }
    
    async buscaEndereco(req,res){
        var cep = req.params.cep;
        cep = cep.replace(/^(\d{5})(\d{3})/,"$1-$2");
        const endereco = await Endereco.findOne({"cep":cep});
        return res.json(endereco);
    }
}

module.exports = new PessoaController(); 