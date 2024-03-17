const express = require('express');
const router = express.Router();
const { Attendance } = require('../models/attendance.js');
const { default: mongoose } = require('mongoose');


router.post("/player", async(req, res) => {
    const { playerName } = req.body

    try {
        const report = await Attendance.aggregate([
            {
                $match: {
                    'playerName': playerName
                }
            },
            {
                $group: {
                    _id: "$playerName",
                    present:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "present"] }, then: 1, else: 0 }
                        }
                    },
                    absent:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "absent"] }, then: 1, else: 0 }
                        }
                    },
                    late:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "late"] }, then: 1, else: 0 }
                        }
                    },
                }
            },
            {
                $lookup: {
                    from: "playerapps",
                    localField:"_id",
                    foreignField: "playerName",
                    as: "player"
                }
            },
            {
                $unwind: "$player"
            },
            {
                $project: {
                    _id: 1,
                    present: 1,
                    absent: 1,
                    late: 1,
                    playerName: "$player.playerName",
                    playerNumber: "$player.playerNumber",
                    playerPosition: "$player.playerPosition",
                    key: "$player._id"
                }
            }
            
        ]);
        res.status(200).json({ report });
    } catch (error) {
        console.log('Error retrieving attendance report', error);
        res.status(500).json({ message: 'Failed to get attendance report' });
    }
});

router.post("/byTeam", async(req, res) => {
    try {
        const { team } = req.body
        const teamId = new mongoose.Types.ObjectId(team);
        const report = await Attendance.aggregate([
            {
                $match: {
                    'team': teamId
                }
            },
            {
                $group: {
                    _id: "$playerName",
                    present:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "present"] }, then: 1, else: 0 }
                        }
                    },
                    absent:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "absent"] }, then: 1, else: 0 }
                        }
                    },
                    late:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "late"] }, then: 1, else: 0 }
                        }
                    },
                }
            },
            {
                $lookup: {
                    from: "playerapps",
                    localField:"_id",
                    foreignField: "playerName",
                    as: "player"
                }
            },
            {
                $unwind: "$player"
            },
            {
                $project: {
                    _id: 1,
                    present: 1,
                    absent: 1,
                    late: 1,
                    playerName: "$player.playerName",
                    playerNumber: "$player.playerNumber",
                    playerPosition: "$player.playerPosition",
                    key: "$player._id"
                }
            }
            
        ]);
        res.status(200).json({ report });
    } catch (error) {
        console.log('Error retrieving attendance report', error);
        res.status(500).json({ message: 'Failed to get attendance report' });
    }
});

router.get("/report", async(req, res) => {
    try {
        const report = await Attendance.aggregate([
            {
                $group: {
                    _id: "$playerName",
                    present:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "present"] }, then: 1, else: 0 }
                        }
                    },
                    absent:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "absent"] }, then: 1, else: 0 }
                        }
                    },
                    late:{
                        $sum: {
                            $cond: { if: { $eq : ["$status", "late"] }, then: 1, else: 0 }
                        }
                    },
                }
            },
            {
                $lookup: {
                    from: "playerapps",
                    localField:"_id",
                    foreignField: "playerName",
                    as: "player"
                }
            },
            {
                $unwind: "$player"
            },
            {
                $project: {
                    _id: 1,
                    present: 1,
                    absent: 1,
                    late: 1,
                    playerName: "$player.playerName",
                    playerNumber: "$player.playerNumber",
                    playerPosition: "$player.playerPosition",
                    key: "$player._id"
                }
            }
            
        ]);
        res.status(200).json({ report });
    } catch (error) {
        console.log('Error retrieving attendance report', error);
        res.status(500).json({ message: 'Failed to get attendance report' });
    }
})

router.post("/", async (req, res) => {
    try {
        
        const { playerName, date, status, team } = req.body;

        const existingAttendance = await Attendance.findOne({ playerName, date });

        if (existingAttendance) {
            existingAttendance.status = status;
            await existingAttendance.save();
            res.status(200).json(existingAttendance);
        } else {
            const newAttendance = new Attendance({
                playerName,
                date,
                status, 
                team
            });
            const savedAttendance = await newAttendance.save();
            console.log(savedAttendance)
            res.status(200).json(savedAttendance);
        }


    } catch (error) {
        console.log('Error adding attendance', error);
        res.status(500).json({ message: 'Failed to add attendance' });
    }
});

router.get("/", async(req, res) => {
    try {
        const { date } = req.query
        const attendance = await Attendance.find({date: date});
        res.status(201).json(attendance);
    } catch (error) {
        console.log('Error retrieving attendance', error);
        res.status(500).json({ message: 'Failed to get attendance' });
    }
})

module.exports = router;