const mongoose = require("mongoose");
const Pergunta = mongoose.model("Pergunta");

module.exports = {

    async indexPergunta(req, res){
        const {page = 1} = req.query;
        const perguntas = await Pergunta.paginate(req.body, {page, limit: 10});
        return res.json(perguntas);
    },
    async showPergunta(req,res){
        const pergunta = await Pergunta.findById(req.params.id);
        return res.json(pergunta);
    },
    async storePergunta(req, res){
        const pergunta = await Pergunta.create(req.body);
        return res.json(pergunta);
    },
    async updatePergunta(req, res){
        const pergunta = await Pergunta.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(pergunta);
    },
    async removePergunta(req, res){
        await Pergunta.findByIdAndRemove(req.params.id);
        return res.send();
    }
}