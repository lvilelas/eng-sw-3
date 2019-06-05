const mongoose = require("mongoose");

const ServicoRealizado = mongoose.Schema({
    servico : {
        type : mongoose.Schema.Types.ObjectId,ref:"Servico",
        required : true
    },
    valor : {
        type : String,
        required : true
    },
    data : {
        type : Date,
        require : true
    },
    fornecedor : {
        doc : {
            type : String,
            reuired : true
        },
        pessoa : {
        type : mongoose.Schema.Types.ObjectId,ref:"Pessoa",
        required : true
        }
    }
});

module.exports = mongoose.model("ServicoRealizado",ServicoRealizado);