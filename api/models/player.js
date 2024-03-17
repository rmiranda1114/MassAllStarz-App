const mongoose = require('mongoose');

const playerAppSchema = new mongoose.Schema(
    {
        playerName: {
            type: String,
            required: true
        },
        playerPosition: {
            type: String,
            required: true
        },
        playerNumber: {
            type: String
        },
        team: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'team'
            }
    }
);

const Player = mongoose.model('playerApp', playerAppSchema);
module.exports.Player = Player;
