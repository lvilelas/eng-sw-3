const mongoose = require("mongoose");

const Servico = new mongoose.Schema({
    nome : {
        type : String,
        required : true
    },
    descricao : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Servico",Servico);
