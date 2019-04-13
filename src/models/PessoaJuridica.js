const mongoose = require('mongoose');

const PessoaJuridica = new mongoose.Schema({
    cnpj : {
        type : String,
        required : true,
        validate: {
            validator: function(v) {
              return /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/.test(v);
            },
            message: "Erro na validação dos campos: CNPJ Invalido"
        },
    },
    pessoa : {
        type : mongoose.Schema.Types.ObjectId,ref:"Pessoa",
        required:true
    }
},  {
    timestamps:true
    }
);

module.exports = mongoose.model("PessoaJuridica",PessoaJuridica);