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
});

router.post('/delete', async(req, res) => {

    const { player } = req.body

    try {
        const result = await Player.deleteOne({ _id: player });
        res.status(201).json(result);
    } catch (error) {
        console.log('Error deleting player', error);
        res.status(500).json({ message: 'Failed to delete player' });
    }
});

router.post('/update', async(req, res) => {
    try {
        const { playerId, playerName, playerPosition, playerNumber, team } = req.body;

        let result = await Player.findOne({ _id: playerId });

        result.playerName = playerName;
        result.playerPosition = playerPosition;
        result.playerNumber = playerNumber;
        result.team = team;
       
     
        //Store new coach
        const saved = await result.save();

        res.status(200).json({ message: `User ${saved.name} updated`});
    } catch (error) {
        console.log('Error updating player', error);
        res.status(500).json({ message: 'Failed to update player' });
    }
});

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
});

router.post("/", async (req, res) => {
    try {
        const { playerId } = req.body;
        const players = await Player.findOne({ _id: playerId })
        .populate('team');
        res.status(201).json(players);
    } catch (error) {
        console.log('Error retrieving players', error);
        res.status(500).json({ message: 'Failed to get players' });
    }
});


router.get("/", async (req, res) => {
    try {
        const players = await Player.find()
        .populate('team');
        res.status(201).json(players);
    } catch (error) {
        console.log('Error retrieving players', error);
        res.status(500).json({ message: 'Failed to get players' });
    }
})

module.exports = router;