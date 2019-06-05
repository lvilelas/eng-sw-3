const mongoose = require('mongoose');

 const Movimentacao = new mongoose.Schema({
    quantidade : {
        type : Number,
        required : true
    },
    tipo_movimentacao :{
        type : String,
        required : true
    },
    produto : {
        type : mongoose.Schema.Types.ObjectId, ref:"Produto",
        required : true
    }
 });

 module.exports = mongoose.model("Movimentacao",Movimentacao);