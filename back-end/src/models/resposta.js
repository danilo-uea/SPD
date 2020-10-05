const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const RespostaSchema = new mongoose.Schema({
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
    pergunta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pergunta',
        require: true
    }
});

RespostaSchema.plugin(mongoosePaginate);

mongoose.model('Resposta', RespostaSchema);
