const mongoose = require("mongoose");

const Imovel = new mongoose.Schema({
    setor : {
        type : String,
        required : true
    }
},{
    timestamps : true
}

);

module.exports = mongoose.model('Imovel',Imovel);