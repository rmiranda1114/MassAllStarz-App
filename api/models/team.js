const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        headCoach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coach'
        },
        asstCoach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coach'
        },
        wins: {
            type: Number
        },
        losses: {
            type: Number
        },
        ties: {
            type: Number
        },
        goals: {
            type: Number
        },
        goalsAgainst: {
            type: Number
        },
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'playerApp'
            }
        ],
        agenda: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Agenda'
            }
        ]
    }
);

const Team = mongoose.model('team', teamSchema);
module.exports.Team = Team;