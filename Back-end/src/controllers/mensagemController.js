const mongoose = require("mongoose");
const Mensagem = mongoose.model("Mensagem");

module.exports = {

    async indexMensagem(req, res){
        const mensagens = await Mensagem.find(req.body);
        return res.json(mensagens);
    },
    async showMensagem(req,res){
        const mensagem = await Mensagem.findById(req.params.id);
        return res.json(mensagem);
    },
    async storeMensagem(req, res){
        const mensagem = await Mensagem.create(req.body);
        return res.json(mensagem);
    },
    async updateMensagem(req, res){
        const mensagem = await Mensagem.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(mensagem);
    },
    async removeMensagem(req, res){
        await Mensagem.findByIdAndRemove(req.params.id);
        return res.send();
    }
}