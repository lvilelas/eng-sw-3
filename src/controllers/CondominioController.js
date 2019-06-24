const Condominio = require("../models/Condominio");

class CondominioController{
    async cadastraCondominio(req,res){
        const nome = req.body.nome;
        if(await Condominio.findOne({nome})){
            return res.status(206).json({"mensagem":"Condominio ja existe"});
        }
        const condominio = await Condominio.create(req.body);
        return res.json(condominio);
    }

    async buscaCondominio(req,res){
        let condominio;
        if(req.params.tipo=="id"){
            condominio = await Condominio.findById(req.query.content);
        }else if(req.params.tipo == "nome"){
            condominio = await Condominio.findOne({"nome":req.query.content});
        }else{
            return res.status(404).send("Not Found");
        }
        if(condominio == null){
            return res.status(202).json({"mensagem":"Condominio não encontrado"});
        }
        return res.status(200).json(condominio);
    }

    async alteraCondominio(req,res){
        const condominio = await Condominio.findById(req.body.id);
        if(condominio == null){
            return res.status(300).json({"mensagem":"erro ao obter condominio"});
        }
        condominio = req.body.condominio;
        condominio.save();
        return condominio;
    }
}

module.exports = new CondominioController();