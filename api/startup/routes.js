const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOption = require('../config/corsOptions.js');
const credentials = require('../middleware/credentials.js');

const playerRoutes = require('../routes/player.js');
const agendaRoutes = require('../routes/agenda.js');
const attendanceRoutes= require('../routes/attendance.js');
const userRoutes = require('../routes/user.js');
const teamRoutes = require('../routes/team.js');
const imageRoutes = require('../routes/image.js');

module.exports = function (app){

    app.use(credentials);
    app.use(cors(corsOption));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    app.get("/", (req, res) => {
        res.status(200).json({
            msg: "Nodejs - App Engine is online"
        });
    });

    app.use('/players', playerRoutes);
    app.use('/agenda', agendaRoutes);
    app.use('/attendance', attendanceRoutes);
    app.use('/users', userRoutes);
    app.use('/teams', teamRoutes);
    app.use('/images', imageRoutes);
}