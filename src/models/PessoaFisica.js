const mongoose = require('mongoose');

const PessoaFisica = new mongoose.Schema({
    cpf : {
        type : String,
        required : true,
        validate: {
            validator: function(v) {
              return /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/.test(v);
            },
            message: "Erro na validação dos campos; CPF Invalido"
        }
    },
    pessoa : {
        type : mongoose.Schema.Types.ObjectId,ref:"Pessoa",
        required:true
    }
},  {
    timestamps:true
    }
);

module.exports = mongoose.model("PessoaFisica",PessoaFisica);