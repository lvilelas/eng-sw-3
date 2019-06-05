const mongoose = require('mongoose');

const Pessoa = new mongoose.Schema({
    nome : {
        type : String,
        required : true
    },
    tipo_pessoa : {
        type : String,
        required : true
    },
    observacao : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : false
    },
    fornecedor : {
        type : Boolean,
        required : true
    },
    endereco : {
        numero : {
            type : Number,
            required : true
        },
        complemento : {
            type : String,
            required : true
        },
        endereco : {
            type : mongoose.Schema.Types.ObjectId, ref:"Endereco",
            required : true,
        }
    },
    imoveis : [{
        relacionamento : {
            type : String
        },
        imovel : {
            type : mongoose.Schema.Types.ObjectId, ref:"Imovel"
        }
    }]
},  {
    timestamps:true
    }
);

var autoPopulateLead = function(next) {
    this.populate('endereco.endereco').populate('imoveis.imovel');
    next();
  };

Pessoa.pre('find',autoPopulateLead).pre('findOne',autoPopulateLead);

module.exports = mongoose.model("Pessoa",Pessoa);
