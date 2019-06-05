const mongoose = require("mongoose");

const Produto = new mongoose.Schema({
    condominio : {
        type : mongoose.Schema.Types.ObjectId, ref:"Condominio",
        required : true
    },
    nome : {
        type : String,
        required : true
    },
    quantidade : {
        type : Number,
        default : 1
    }
},  {
    timestamps:true
});

module.exports = mongoose.model("Produto",Produto);