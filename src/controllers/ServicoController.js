const Servico = require("../models/Servico");
const ServicoRealizado = require("../models/ServicoRealizado");
const Pessoa = require("../models/Pessoa");
const mongoose = require('mongoose');
class ServicoController {
    async criaServico(req, res) {
        const nome = req.body.nome;
        if (await Servico.findOne({ nome })) {
            return res.json({ "info": "serviço ja existe" });
        }
        const servico = await Servico.create(req.body);
        return res.json(servico);
    }

    async buscaServico(req, res) {
        const conteudo = req.query.content;
        let servico = null;
        if (req.params.tipo == "id") {
            servico = await Servico.findById(conteudo);
        } else if (req.params.tipo == "nome") {
            servico = await Servico.findOne({ nome: conteudo })
        } else {
            return res.status("202").json({ "erro": "servico não encontrado" });
        }
        if (servico == null) {
            return res.status("202").json({ "erro": "servico não encontrado" });
        }
        return res.json(servico);
    }

    async realizaServico(req, res) {
        var valor = req.body.valor;
        var data = new Date();
        var id = req.body.fornecedor;
        if (!(/^[0-9]+(\\.[0-9]+)?/).test(valor)) {
            return res.json({ "erro": "valor invalido" });
        }
        let pessoa;
        pessoa = await Pessoa.findById(id);
        if (pessoa == null) {
            return res.status(202).json({ "erro": "pessoa não encontrada" });
        }
        if (pessoa.fornecedor == false) {
            return res.status(202).json({ "erro": "Não é um fornecedor valido" });
        }
        const servico = await Servico.findById(req.body.servico);
        if (servico == null) {
            return res.status(202).json({ "erro": "serviço não encontrado" });
        }
        const servicoRealizado = await ServicoRealizado.create({ "servico": servico, "valor": valor, "data": data, "fornecedor": pessoa });
        return res.json(servicoRealizado);
    }
    async buscaTodoServicos(req, res) {
        const servico = await Servico.find();
        return res.json(servico);
    }
    async buscaServicoRealizadoId(req,res){
        const id = req.query.servico;
        const servicoId = await Servico.findById(id);
        const servico = await ServicoRealizado.find({"servico":servicoId}).populate('fornecedor').populate('servico');
        return res.json(servico);
    }
    async buscaServicosRealizados(req, res) {
        const id = req.query.servico;
        const servicoId = await Servico.findById(id);
        console.log(servicoId._id);
        const ObjectId = mongoose.Types.ObjectId;
        let servicos = await ServicoRealizado.aggregate([
            {
                $project: {
                    day: { "$dayOfMonth": "$data" },
                    month: { "$month": "$data" },
                    year: { "$year": "$data" },
                    servico: "$servico",
                    valor: "$valor"
                }
            },
            {
                $match: {'servico': ObjectId(`${servicoId._id}`)}
            },
            {
                $group: {
                    _id: { year: "$year", month: "$month", day: "$day" },
                    quantidade: { "$sum": 1 },
                    valor: { $sum: "$valor" },
                }
            }
        ]).exec(function (err, data) {
            Servico.populate(data, { path: '_id.servico' }, function (err, data) {
                res.send(data)
            });
        });
    }
}

module.exports = new ServicoController();