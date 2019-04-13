const mongoose = require('mongoose');

const Endereco = new mongoose.Schema({
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
    }
},  {
    timestamps:true
    }
);

module.exports = mongoose.model("Endereco",Endereco);