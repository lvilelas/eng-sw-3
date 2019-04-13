const Box = require('../models/Box');

class BoxController{
    async store(req,res) {
        const box = await Box.create({ title: 'Rocketseat'})
        
        return res.json(box);
    }

    async show(req,res){
        const box = await Box.findById(req.params.id).populate("files");

        return res.json(box);
    }
}

module.exports = new BoxController(); 
