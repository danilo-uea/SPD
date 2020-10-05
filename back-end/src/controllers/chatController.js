const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");

module.exports = {

    async indexChat(req, res){
        const {page = 1} = req.query;
        const chats = await Chat.paginate(req.body, {page, limit: 10});
        return res.json(chats);
    },
    async showChat(req,res){
        const chat = await Chat.findById(req.params.id);
        return res.json(chat);
    },
    async storeChat(req, res){
        const chat = await Chat.create(req.body);
        return res.json(chat);
    },
    async updateChat(req, res){
        const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(chat);
    },
    async removeChat(req, res){
        await Chat.findByIdAndRemove(req.params.id);
        return res.send();
    }
}