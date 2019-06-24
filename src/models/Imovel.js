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
var autoPopulateLead = function(next) {
    this.populate('condominio');
    next();
  };
  Imovel.pre('find',autoPopulateLead).pre('findOne',autoPopulateLead);
module.exports = mongoose.model('Imovel',Imovel);