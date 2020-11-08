const mongoose = require("mongoose");
const Pergunta = mongoose.model("Pergunta");
const Resposta = mongoose.model("Resposta");

module.exports = {

    async indexPergunta(req, res){
        const {page = 1} = req.query;
        const perguntas = await Pergunta.paginate(req.body, {page, limit: 10});
        //const perguntas = await Pergunta.find().populate(['usuario','respostas']);
        return res.json(perguntas);
    },
    async showPergunta(req,res){
        const pergunta = await Pergunta.findById(req.params.id).populate('usuario');
        return res.json(pergunta);
    },
    async storePergunta(req, res){
        const {titulo, categoria, texto, respostas } = req.body;
        
        const pergunta = await Pergunta.create({"titulo": titulo, "categoria": categoria, "texto": texto , "usuario": req.userId});
        
        return res.json(pergunta);
    },
    async updatePergunta(req, res){
        const {titulo, categoria, texto, respostas } = req.body;
        const pergunta = await Pergunta.findByIdAndUpdate(req.params.id, 
        {titulo, categoria, texto},
        {new: true});
        
        pergunta.respostas = [];
        await Resposta.remove({ pergunta: pergunta._id });

        await Promise.all(respostas.map(async resp => {
            const perguntaResposta = new Resposta({...resp, pergunta: pergunta._id });
            await perguntaResposta.save();
            pergunta.respostas.push(perguntaResposta);
        }));

        await pergunta.save();
                
        return res.json(pergunta);
    },
    async removePergunta(req, res){
        await Pergunta.findByIdAndRemove(req.params.id);
        await Resposta.deleteMany({"pergunta": req.params.id})
        return res.send();
    }
}