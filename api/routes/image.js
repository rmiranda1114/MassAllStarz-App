const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

router.post('/', async (req, res, next)=> {
    try{
        const fileStr = req.body.data;
        const response = await cloudinary.uploader.upload(fileStr, {
            folder: 'massallstarz'
        })
        res.sendStatus(200);

    } catch (error) {
        console.log('Error uploading image', error);
        res.status(500).json({ message: 'Failed to upload image' });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const {resources} = await cloudinary.search.expression('folder:massallstarz')
            .sort_by('public_id', 'desc')
            .execute();
        const publicIds = resources.map((file) => file.public_id);
        res.send(publicIds);
    }catch (error) {
        console.log('Error retrieving image', error);
        res.status(500).json({ message: 'Failed to get image' });
    }
})

module.exports = router;