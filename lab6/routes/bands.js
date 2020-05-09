const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const albumData = data.albums;


//Getting this route will return a list of all bands in the system.
router.get('/', async(req, res) => {
    try {
        let allBands = await bandData.getAllBands();
        const listOfBands = new Array();

        for (let i in allBands) {
            let band = await bandData.getBand(allBands[i]._id.toString());

            let curBand = {
                _id: band._id,
                bandName: band.bandName,
                bandMembers: band.bandMembers,
                yearFormed: band.yearFormed,
                genres: band.genres,
                recordLabel: band.recordLabel,
                albums: []
            };

            for (let j in band.albums) {
                let curAlbum = await albumData.getAlbumById(band.albums[j]);
                curBand.albums[j] = {
                    _id: band.albums[j],
                    title: curAlbum.title,
                    author: curAlbum.author,
                    songs: curAlbum.songs
                };
            }

            listOfBands[i] = curBand;
        }

        res.json(listOfBands);
    } catch (e) {
        res.sendStatus(500);
    }
});

//GET /bands/{id}    
//If no band that _id is found, you will issue a 404 status code and end the request.
router.get('/:id', async(req, res) => {
    try {
        let band = await bandData.getBand(req.params.id);

        let curBand = {
            _id: req.params.id,
            bandName: band.bandName,
            bandMembers: band.bandMembers,
            yearFormed: band.yearFormed,
            genres: band.genres,
            recordLabel: band.recordLabel,
            albums: []
        };

        for (let i in band.albums) {
            let curAlbum = await albumData.getAlbumById(band.albums[i]);
            curBand.albums[i] = {
                _id: band.albums[i],
                title: curAlbum.title,
                author: req.params.id,
                songs: curAlbum.songs
            };
        }

        res.status(200).json(curBand);
    } catch (e) {
        res.status(404).json({ error: 'Band not found.' });
    }
});

//POST /bands
//If the JSON provided does not match that schema, you will issue a 400 status code and end the request.
router.post('/', async(req, res) => {
    let bandInfo = req.body;

    if (!bandInfo) {
        res.status(400).json({ error: 'You must provide data to create a band.' });
        return;
    }

    if (!bandInfo.bandName || typeof bandInfo.bandName !== 'string' || bandInfo.bandName.length === 0) {
        res.status(400).json({ error: 'You must provide a band name which is a string.' });
        return;
    }

    if (!bandInfo.bandMembers || !Array.isArray(bandInfo.bandMembers)) {
        res.status(400).json({ error: 'You must provide a list of band Members.' });
        return;
    }

    if (bandInfo.bandMembers.length === 0) {
        res.status(400).json({ error: 'You must provide at least one bandMember.' });
        return;
    }

    for (let item of bandInfo.bandMembers) {
        if (typeof item !== 'string' || item.length === 0) {
            res.status(400).json({ error: 'The bandMember should be an array of strings.' });
            return;
        }
    }

    if (!bandInfo.yearFormed ||
        typeof bandInfo.yearFormed !== 'number' ||
        !Number.isInteger(bandInfo.yearFormed) ||
        bandInfo.yearFormed <= 0) {
        res.status(400).json({ error: 'You must provide a valid year when the band formed.' });
        return;
    }

    if (!bandInfo.genres || !Array.isArray(bandInfo.genres)) {
        res.status(400).json({ error: 'You must provide a list of band genres.' });
        return;
    }

    if (bandInfo.genres.length === 0) {
        res.status(400).json({ error: 'You must provide at least one band genres.' });
        return;
    }

    for (let item of bandInfo.genres) {
        if (typeof item !== 'string' || item.length === 0) {
            res.status(400).json({ error: 'The band genres should be an array of strings.' });
            return;
        }
    }

    if (!bandInfo.recordLabel || typeof bandInfo.recordLabel !== 'string' || bandInfo.recordLabel.length === 0) {
        res.status(400).json({ error: 'You must provide a recordLabel which is a valid string.' });
        return;
    }

    try {
        const newBand = await bandData.addBand(bandInfo.bandName, bandInfo.bandMembers, bandInfo.yearFormed, bandInfo.genres, bandInfo.recordLabel);
        res.status(200).json(newBand);
    } catch (e) {
        res.sendStatus(500);
    }
});

//PUT /bands/{id}
//This request will update band with information provided from the PUT body.
router.put('/:id', async(req, res) => {
    let bandInfo = req.body;

    //If the JSON provided in the PUT body is not as stated above, fail the request with a 400 error and end the request.
    if (!bandInfo.bandName || typeof bandInfo.bandName !== 'string' || bandInfo.bandName.length === 0) {
        res.status(400).json({ error: 'You must provide a band name.' });
        return;
    }

    if (!bandInfo.bandMembers || !Array.isArray(bandInfo.bandMembers)) {
        res.status(400).json({ error: 'You must provide a list of band Members.' });
        return;
    }

    if (bandInfo.bandMembers.length === 0) {
        res.status(400).json({ error: 'You must provide at least one bandMember.' });
        return;
    }

    for (let item of bandInfo.bandMembers) {
        if (typeof item !== 'string' || item.length === 0) {
            res.status(400).json({ error: 'The bandMember should be an array of strings.' });
            return;
        }
    }

    if (!bandInfo.yearFormed ||
        typeof bandInfo.yearFormed !== 'number' ||
        !Number.isInteger(bandInfo.yearFormed) ||
        bandInfo.yearFormed <= 0) {
        res.status(400).json({ error: 'You must provide a valid year when the band formed.' });
        return;
    }

    if (!bandInfo.genres || !Array.isArray(bandInfo.genres)) {
        res.status(400).json({ error: 'You must provide a list of band genres.' });
        return;
    }

    if (bandInfo.genres.length === 0) {
        res.status(400).json({ error: 'You must provide at least one band genres.' });
        return;
    }

    for (let item of bandInfo.genres) {
        if (typeof item !== 'string' || item.length === 0) {
            res.status(400).json({ error: 'The band genres should be an array of strings.' });
            return;
        }
    }

    if (!bandInfo.recordLabel || typeof bandInfo.recordLabel !== 'string' || bandInfo.recordLabel.length === 0) {
        res.status(400).json({ error: 'You must provide a recordLabel which is a string.' });
        return;
    }
    //If no band exist with an _id of {id}, return a 404 and end the request.
    try {
        await bandData.getBand(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Band not found.' });
        return;
    }

    try {
        const updatedInfo = await bandData.updateBand(req.params.id, bandInfo);
        res.json(updatedInfo);
    } catch (e) {
        res.sendStatus(500).json({ error: e });
    }
});

//DELETE /bands/{id}
router.delete('/:id', async(req, res) => {
    //If no band exist with an _id of {id}, return a 404 and end the request.
    if (!req.params.id) {
        res.status(404).json({ error: 'You must supply an ID to delete.' });
        return;
    }

    try {
        await bandData.getBand(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Band not found.' });
        return;
    }

    //This route will DELETE the band with the provided id and all albums written by this band. 
    try {
        const removeBand = await bandData.removeBand(req.params.id);

        let bandInfo = {
            _id: req.params.id,
            bandName: removeBand.bandName,
            bandMembers: removeBand.bandMembers,
            yearFormed: removeBand.yearFormed,
            genres: removeBand.genres,
            recordLabel: removeBand.recordLabel,
            albums: []
        };

        for (let i in removeBand.albums) {
            let curAlbum = await albumData.getAlbumById(removeBand.albums[i]);
            bandInfo.albums[i] = {
                _id: removeBand.albums[i],
                title: curAlbum.title,
                author: req.params.id,
                songs: curAlbum.songs
            };
        }

        //delete albums
        for (let i in removeBand.albums) {
            await albumData.removeAlbum(removeBand.albums[i]);
        }

        res.status(200).json({
            deleted: true,
            data: bandInfo
        });
    } catch (e) {
        res.sendStatus(500).json({ error: e });
    }
});

module.exports = router;