const Pessoa = require("../models/Pessoa");

class PessoaController{
    async buscaTodos(req,res){
        const pessoa = await Pessoa.find();
        return res.json(pessoa);
    }
    
    async buscaTodosFornecedores(req,res){
        const pessoa = await Pessoa.find({"fornecedor":true});
        return res.json(pessoa);
    }

    async cadastro(req,res) {
        console.log(req.body);
        if(await Pessoa.findOne({"doc" : req.body.doc})){
            return res.status(400).json({"response":"Pessoa ja cadastrada"});
        }
        const pessoa = await Pessoa.create(req.body);  
        return res.json(pessoa);
    }
    async alterar(req,res){
        var pessoa = await Pessoa.findOne({"doc" : req.body.doc});
        try {
            pessoa.nome = req.body.nome;
            pessoa.email = req.body.email;
            pessoa.numero = req.body.numero;
            pessoa.complemento = req.body.complemento;
            pessoa.cep = req.body.cep;
            pessoa.rua = req.body.rua;
            pessoa.bairro = req.body.bairro;
            pessoa.cidade = req.body.cidade;
            pessoa.fornecedor = req.body.fornecedor;
            await pessoa.save();
            res.json(pessoa);
        } catch (error) {
            console.log(error);
            return res.json(error);
        }  
    }

    async buscaPorDoc(req,res){
        let pessoa;
        let doc;
        if(req.params.tipo == "J"){
            doc = req.params.doc;
            doc = doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        }else if(req.params.tipo == "F"){
            doc = req.params.doc;
            doc = doc.replace(/^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/, "$1.$2.$3-$4");

        }else{
            return res.json("erro");
        }
        pessoa = await Pessoa.findOne({doc}).populate();
        return (pessoa==null)? res.status(200).json({"mensagem":"Usuario não cadastrado"}) : res.json(pessoa);
    }
    async buscaPorID(req,res){
        let pessoa;
        pessoa = await Pessoa.findById(`${req.params.id}`).populate();
        if(pessoa==null){
            return res.status(400).json("Pessoa não encontrada");
        }else{
            return res.json(pessoa);
        }
    }
}

module.exports = new PessoaController(); 