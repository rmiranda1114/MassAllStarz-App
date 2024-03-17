const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    }
})

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports.Attendance = Attendance;