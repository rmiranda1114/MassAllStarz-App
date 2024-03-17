const express = require('express');
const router = express.Router();
const { Team } = require('../models/team');


router.post('/team', async (req, res, next) => {
    
    try{
        const { team } = req.body;
        const result = await Team.findOne({ _id: team });
        res.status(200).send(result);
    }
    catch (error) {
        console.log('Error retrieving team', error);
        res.status(500).json({ message: 'Failed to get team' });
    }
});

router.post('/update', async (req, res, next)=> {
    try{
        const { teamData } = req.body;
        const result = await Team.findOne({ _id: teamData._id });
        result.wins = teamData.wins;
        result.losses = teamData.losses;
        result.ties = teamData.ties;
        result.goals = teamData.goals;
        result.goalsAgainst = teamData.goalsAgainst;
        await result.save();
        res.status(201).json({ message: 'Team has been updated' })
    } catch (error) {
        console.log('Error updating team', error);
        res.status(500).json({ message: 'Failed to update team' });
    }
})

router.post('/', async (req, res, next)=> {
    try{
        const { team } = req.body;
        let newTeam = new Team({
            name: team,
            headCoach: null,
            asstCoach: null,
            wins: 0,
            losses: 0,
            ties: 0,
            goals: 0,
            goalsAgainst: 0,
            players: []
        });

        const savedTeam = await newTeam.save();
        res.status(201).json({ message: 'New Team added' })
    } catch (error) {
        console.log('Error creating new team', error);
        res.status(500).json({ message: 'Failed to create team' });
    }
})

router.get('/wPlayers', async (req, res, next) => {
    try{
        let teams = await Team.find()
        .populate('players');
        res.status(200).send(teams);
    }
    catch (error) {
        console.log('Error retrieving teams', error);
        res.status(500).json({ message: 'Failed to get teams' });
    }
});



router.get('/', async (req, res, next) => {
    try{
        let teams = await Team.find();
        res.status(200).send(teams);
    }
    catch (error) {
        console.log('Error retrieving teams', error);
        res.status(500).json({ message: 'Failed to get teams' });
    }
});

module.exports = router;