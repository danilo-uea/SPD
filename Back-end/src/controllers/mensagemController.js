const mongoose = require("mongoose");
const Mensagem = mongoose.model("Mensagem");

module.exports = {

    async indexMensagem(req, res){
        const mensagens = await Mensagem.find(req.body).populate('Usuario');
        return res.json(mensagens);
    },
    async showMensagem(req,res){
        const mensagem = await Mensagem.findById(req.params.id);
        return res.json(mensagem);
    },
    async mensagemChat(req, res){
        const mensagens = await Mensagem.find({"idChat": req.params.id}).populate('idUsuario');
        return res.json(mensagens);
    },
    async storeMensagem(req, res){
        const {idChat, texto} = req.body
        const mensagem = await Mensagem.create({"idUsuario": req.userId,"idChat": idChat, "texto": texto});
        return res.json(req.userId);
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