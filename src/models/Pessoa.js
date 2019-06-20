const mongoose = require('mongoose');

const Pessoa = new mongoose.Schema({
    doc : {
        type : String,
        required : true,
        validate: {
            validator: function(v) {
              return /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/.test(v) || /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/.test(v);;
            },
            message: "Erro na validação dos campos; Documento Invalido"
        }
    },
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
    numero : {
        type : Number,
        required : true
    },
    complemento : {
        type : String,
        required : true
    },
    cep : {
        type : String,
        required : true,
        validate: {
            validator: function(v) {
              return /[0-9]{5}-[\d]{3}/.test(v);
            },
            message: "Erro na validação dos campos: CEP Invalido"
        }
    },
    rua : {
        type : String,
        required : true
    },
    bairro : {
        type : String,
        required : true,
    },
    cidade : {
        type : String,
        required : true
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
    this.populate('imoveis.imovel');
    next();
  };

Pessoa.pre('find',autoPopulateLead).pre('findOne',autoPopulateLead);

module.exports = mongoose.model("Pessoa",Pessoa);
