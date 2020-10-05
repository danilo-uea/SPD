const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PerguntaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    publicacao: {
        type: Date,
        default: Date.now,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    respostas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resposta'
    }]
});

PerguntaSchema.plugin(mongoosePaginate);

mongoose.model('Pergunta', PerguntaSchema);
