const mongoose = require('mongoose');

const playerAppSchema = new mongoose.Schema(
    {
        playerName: {
            type: String,
            required: true
        },
        playerPosition: {
            type: String
            
        },
        playerNumber: {
            type: String,
            required: true
        },
        team: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'team'
            },
        regCode: {
            type: String,
            required: true,
            unique: true
        }
    }
);

const Player = mongoose.model('playerApp', playerAppSchema);
module.exports.Player = Player;
