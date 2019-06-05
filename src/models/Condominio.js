const mongoose = require('mongoose');

const Condominio = new mongoose.Schema({
    nome : {
        type : String,
        required : true
    }
},  {
    timestamps:true
    }
);

module.exports = mongoose.model("Condominio",Condominio);