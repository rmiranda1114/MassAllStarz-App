const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Team } = require('../models/team');
const { Player } = require('../models/player');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 255
        },
        password: {
                type: String,
                required: true,
                unique: true,
                minlength: 5,
                //Joi validates real length. This length for hash.
                maxlength: 1024
        },
        team: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'team'
            }
        ],
        player: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'playerApp'
            }
        ],
        admin: {
            type: Boolean
        },
        coach: {
            type: Boolean
        },
        refreshtoken: {
            type: String
        }
    }
);

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, admin: this.admin, coach: this.coach }, process.env.jwtPrivateKey, {expiresIn: '7d'});
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, admin: this.admin, coach: this.coach }, process.env.jwtRefreshKey, {expiresIn: '30d'});
}

userSchema.methods.sendAccessToken = function (req, res, accessToken) {
    res.status(200).json({ message: 'Login Successful', _id: this._id, name: this.name, email: this.email, admin: this.admin, coach: this.coach, team: this.team,
         player: this.player, accessToken: accessToken }) 
}

userSchema.methods.sendRefreshToken = function (res, refreshToken) {
    res.cookie('JWT', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 //Equals 1 day
    })
}

const User = mongoose.model('user', userSchema);
module.exports.User = User;

