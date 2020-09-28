const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PerguntaSchema = new mongoose.Schema({
    idUsuario: {
        type: String,
        required: true,
    },
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
    }
});

PerguntaSchema.plugin(mongoosePaginate);

mongoose.model('Pergunta', PerguntaSchema);
