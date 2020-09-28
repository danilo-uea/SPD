const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const RespostaSchema = new mongoose.Schema({
    idUsuario: {
        type: String,
        required: true,
    },
    idPergunta: {
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

RespostaSchema.plugin(mongoosePaginate);

mongoose.model('Resposta', RespostaSchema);
