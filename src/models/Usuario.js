const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Usuario = new mongoose.Schema({
    usuario : {
        type : String,
        required : true,
    },
    senha : {
        type : String,
        required : true,
        select : false
    },
    pessoa : {
        type : mongoose.Schema.Types.ObjectId,ref:"Pessoa"
    }
},  {
    timestamps:true
    }
);

Usuario.pre('save',async function(next){
    const hash = await bcrypt.hash(this.senha,10);
    this.password = hash;

    next();
});

model.exports = mongoose.model('Usuario',Usuario);

