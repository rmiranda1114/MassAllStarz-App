const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    }
})

const Agenda = mongoose.model('Agenda', agendaSchema);
module.exports.Agenda = Agenda;