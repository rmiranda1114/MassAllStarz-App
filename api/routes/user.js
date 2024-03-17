const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const authorize = require('../middleware/authorize');


router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({email: email})
        .populate('team', 'name');
        if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

        //Uses bcrypt to validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid email or password.' })
        //Creates JWT token
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();
        //Saves Refresh Token in DB
        user.refreshtoken = refreshToken;
        await user.save();
        //Sends cookie and tokens
        // await user.sendRefreshToken(res, refreshToken);
        user.sendAccessToken(req, res, accessToken);
    } catch (error) {
        console.log('Error logging in', error);
        res.status(500).json({ message: 'Failed to log in user' });
    }
})

router.post('/new', async(req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checks if user already exsist.
        let user = await User.findOne({ email: email });
        if (user) return res.status(409).json({ message: 'Email is already registered.' });

        //Use bcrypt to hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user = new User({
            name: name,
            email: email,
            password: hashPassword,
            admin: false,
            coach: false
        });
     
        //Store new coach
        const result = await user.save();

        res.status(200).json({ message: `User ${result.name} created`});
    } catch (error) {
        console.log('Error adding new user', error);
        res.status(500).json({ message: 'Failed to add new user' });
    }
});

router.post('/update', async(req, res) => {
    try {
        const { email, admin, coach, team, player} = req.body;

        let user = await User.findOne({ email: email });

        user.admin = admin;
        user.coach = coach;
        user.team = team;
        user.player = player;
     
        //Store new coach
        const result = await user.save();

        res.status(200).json({ message: `User ${result.name} updated`});
    } catch (error) {
        console.log('Error adding new user', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});

router.post('/verifyToken', authorize, async(req, res) => {
    try{
        res.status(200).json({ status: 'ok', admin: req.admin, coach: req.coach });
    } catch (error) {
        console.log('Error retrieving users', error);
        res.status(500).json({ message: 'Failed to get users' });
    }
});

router.post('/delete', async(req, res) => {

    const { user } = req.body

    try {
        const result = await User.deleteOne({ _id: user });
        res.status(201).json(result);
    } catch (error) {
        console.log('Error deleting user', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

router.post('/user', async(req, res) => {

    const { name } = req.body

    try {
        const user = await User.findOne({ name: name })
        .populate([{path: 'team'}, {path: 'player'}]);
        res.status(201).json(user);
    } catch (error) {
        console.log('Error retrieving users', error);
        res.status(500).json({ message: 'Failed to get users' });
    }
});

router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        .populate([{path: 'team'}, {path: 'player'}]);
        res.status(201).json(users);
    } catch (error) {
        console.log('Error retrieving users', error);
        res.status(500).json({ message: 'Failed to get users' });
    }
});

module.exports = router;