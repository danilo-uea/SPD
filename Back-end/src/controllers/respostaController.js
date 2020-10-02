const mongoose = require("mongoose");
const Resposta = mongoose.model("Resposta");

module.exports = {
    async PerguntaResposta(req, res){
        const {id} = req.params;
        console.log(id);
        //const {page = 1} = req.query;
        const respostas = await Resposta.find({"pergunta": id}).populate('usuario');
        //const respostas = await Resposta.paginate({"idPergunta": id}, {page, limit: 10});
        return res.json(respostas);
    },

    async indexResposta(req, res){
        const {page = 1} = req.query;
        const respostas = await Resposta.paginate({}, {page, limit: 10});
        return res.json(respostas);
    },

    async storeResposta(req, res){
        const resposta = await Resposta.create(req.body);
        return res.json(resposta);
    },
    async updateResposta(req, res){
        const resposta = await Resposta.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(resposta);
    },
    async removeResposta(req, res){
        await Resposta.findByIdAndRemove(req.params.id);
        return res.send();
    }
}