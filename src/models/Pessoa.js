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
        required : false,
    },
    endereco : {
        type : mongoose.Schema.Types.ObjectId, ref:"Endereco",
        required : true,
    }
},  {
    timestamps:true
    }
);

var autoPopulateLead = function(next) {
    this.populate('endereco');
    next();
  };

Pessoa.pre('find',autoPopulateLead).pre('findOne',autoPopulateLead);

module.exports = mongoose.model("Pessoa",Pessoa);
