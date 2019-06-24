const mongoose = require("mongoose");

const ServicoRealizado = mongoose.Schema({
    servico : {
        type : mongoose.Schema.Types.ObjectId,ref:"Servico",
        required : true
    },
    valor : {
        type : Number,
        required : true
    },
    data : {
        type : Date,
        require : true
    },
    fornecedor : {
    type : mongoose.Schema.Types.ObjectId,ref:"Pessoa",
    required : true
    }
});

module.exports = mongoose.model("ServicoRealizado",ServicoRealizado);