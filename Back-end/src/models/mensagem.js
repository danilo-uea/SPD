const mongoose = require('mongoose');

const MensagemSchema = new mongoose.Schema({
    idUsuario: {
        type: String,
        required: true,
    },
    idChat: {
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


mongoose.model('Mensagem', MensagemSchema);
