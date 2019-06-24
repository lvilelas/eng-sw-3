const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
class UsuarioController{
    async register(req,res){
        const email = req.body.email;
        try {
            if(await Usuario.findOne({email})){
                return res.status(400).send({error:"Usuario ja existe!"});
            }
            const usuario = Usuario.create(req.body);
            usuario.senha = undefined;
            return res.json(usuario);
        } catch (error) {
            res.status(400).send({error:"Registro falhou"});
        }
    }
    async busca(req,res){
        const user = await Usuario.findById(req.params.id);
        if(user==null){
            return res.status(400).send({"erro":"usuario não encontradoo"});
        }
        return res.json(user);
    }
    async auth(req,res){
        const email=req.body.email;
        const senha = req.body.senha;
        const user = await Usuario.findOne({email}).select('+senha');
        if(!user)
            return res.status(400).send({error:"Usuario não encontrado"});
        if(!await bcrypt.compare(senha,user.senha))
            return res.status(400).send({error:"Senha Incorreta"});
        
        res.send({user});
    }
}
module.exports = new UsuarioController();