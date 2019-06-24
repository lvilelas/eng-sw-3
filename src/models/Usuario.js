const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Usuario = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    senha : {
        type : String,
        required : true,
        select: false
    },
    pessoa : {
        type : mongoose.Schema.Types.ObjectId,ref:"Pessoa"
    },
    condominio : {
        type : mongoose.Schema.Types.ObjectId,ref:"Condominio"
    }
},  {
    timestamps:true
    }
);

Usuario.pre('save',async function(next){
    const hash = await bcrypt.hash(this.senha,10);
    this.senha = hash;

    next();
});

module.exports = mongoose.model("Usuario",Usuario);

