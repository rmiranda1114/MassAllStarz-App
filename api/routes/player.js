const express = require('express');
const router = express.Router();
const { Player } = require('../models/player');
const { Team } = require('../models/team');


router.post("/add", async (req, res) => {
    try {
        const { playerName, playerPosition, playerNumber, playerTeam } = req.body;
        const newPlayer = new Player({
            playerName: playerName,
            playerPosition: playerPosition,
            playerNumber: playerNumber,
            team: playerTeam
        });
        const savedPlayer = await newPlayer.save();

        const updateteam = await Team.findById(playerTeam);
        updateteam.players.push(savedPlayer._id);
        await updateteam.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        console.log('Error adding player', error);
        res.status(500).json({ message: 'Failed to add players' });
    }
})

router.post("/player", async (req, res) => {
    try {
        const { player } = req.body;
        const playerArray = [];
        for(let i = 0; i < player.length; i++) {
            const result = await Player.findOne({ _id: player[i] });
            playerArray.push(result);
        };
        res.status(201).json(playerArray);
    } catch (error) {
        console.log('Error retrieving players', error);
        res.status(500).json({ message: 'Failed to get players' });
    }
});

router.post("/byTeam", async (req, res) => {
    const { playerTeam } = req.body
    try {
        const player = await Player.find({ team: playerTeam });
        res.status(201).json(player);
    } catch (error) {
        console.log('Error retrieving players', error);
        res.status(500).json({ message: 'Failed to get players' });
    }
})


router.get("/", async (req, res) => {
    try {
        const players = await Player.find();
        res.status(201).json(players);
    } catch (error) {
        console.log('Error retrieving players', error);
        res.status(500).json({ message: 'Failed to get players' });
    }
})

module.exports = router;