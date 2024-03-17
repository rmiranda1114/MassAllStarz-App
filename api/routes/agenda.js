const express = require('express');
const router = express.Router();
const { Agenda } = require('../models/agenda.js');
const { Team } = require('../models/team.js');

router.post("/get", async(req, res) => {
    try {
        const { date, team } = req.body;
        const result = await Agenda.find({ date:{ $gte: date}, team: team });            
        
        res.status(200).json(result);
    } catch (error) {
        console.log('Error retrieving attendance', error);
        res.status(500).json({ message: 'Failed to get agenda' });
    }
})

router.post("/", async(req, res) => {
    try {
        const { description, date, type, team } = req.body;
        const newAgenda = new Agenda({
            description,
            date,
            type,
            team
        });
        const savedAgenda = await newAgenda.save();
        const teamUpdate = await Team.findOne({ _id: team });
        teamUpdate.agenda.push(savedAgenda._id);
        await teamUpdate.save();
        res.status(200).json(savedAgenda);
        } catch (error) {
        console.log('Error adding agenda', error);
        res.status(500).json({ message: 'Failed to add agenda' });
    }
});

module.exports = router;