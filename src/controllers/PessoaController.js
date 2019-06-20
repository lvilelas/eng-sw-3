const Pessoa = require("../models/Pessoa");
const Endereco = require("../models/Endereco");


class PessoaController{
    async cadastro(req,res) {
        if(await Pessoa.findOne({"doc" : req.body.doc})){
            return res.json({"response":"Pessoa ja cadastrada"});
        }
        const pessoa = await Pessoa.create(req.body);  
        return res.json(pessoa);
    }
    async alterar(req,res){
        var pessoa = await Pessoa.findOne({"doc" : req.body.doc});
        try {
            const imoveis = pessoa.imoveis;
            pessoa = req.body.pessoa;
            pessoa.imoveis = imoveis;
            await pessoa.save();
            res.json(pessoa);
        } catch (error) {
            return res.json(error);
        }  
    }

    async buscaPorDoc(req,res){
        let pessoa;
        if(req.params.tipo == "J"){
            var cnpj = req.params.doc;
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            pessoa = await Pessoa.findOne({"doc":cnpj});
            return (pessoa==null) ? res.status(200).json({"mensagem":"Usuario não cadastrado"}) : res.json(pessoa);
        }else if(req.params.tipo == "F"){
            var cpf = req.params.doc;
            cpf = cpf.replace(/^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/, "$1.$2.$3-$4");
            pessoa = await Pessoa.findOne({"doc":cpf});
            return (pessoa==null)? res.status(200).json({"mensagem":"Usuario não cadastrado"}) : res.json(pessoa);
        }else{
            return res.json("erro");
        }
    }
}

module.exports = new PessoaController(); 