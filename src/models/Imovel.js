const mongoose = require("mongoose");

const Imovel = new mongoose.Schema({
    setor : {
        type : String,
        required : true
    },
    condominio : {
        type : mongoose.Schema.Types.ObjectId, ref:"Condominio",
        required : true
    }
},{
    timestamps : true
}

);

module.exports = mongoose.model('Imovel',Imovel);