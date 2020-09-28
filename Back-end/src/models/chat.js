const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ChatSchema = new mongoose.Schema({
    idChat: {
        type: String,
        required: true
    },
    idsUsuarios: {
        type: Array,
        required: true,
    },
    titulo: {
        type: String,
        required: true
    },
    
    publicacao: {
        type: Date,
        default: Date.now,
    }
});

ChatSchema.plugin(mongoosePaginate);

mongoose.model('Chat', ChatSchema);
