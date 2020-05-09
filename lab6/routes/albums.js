const express = require('express');
const router = express.Router();
const data = require('../data');
const albumData = data.albums;
const bandData = data.bands;

//Getting this route will return a list of all albums in the system
router.get('/', async(req, res) => {
    try {
        const allAlbums = await albumData.getAllAlbums();

        const listOfAlbums = new Array();

        for (let i in allAlbums) {
            const albumInfo = await albumData.getAlbumById(allAlbums[i]._id.toString());
            const bandThatReleased = await bandData.getBand(albumInfo.author);

            let curAlbum = {
                _id: allAlbums[i]._id.toString(),
                title: albumInfo.title,
                author: {
                    _id: albumInfo.author,
                    bandName: bandThatReleased.bandName
                },
                songs: albumInfo.songs
            };

            listOfAlbums[i] = curAlbum;

        }

        res.json(listOfAlbums);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//POST /albums
router.post('/', async(req, res) => {
    const albumInfo = req.body;

    //If the JSON provided does not match that schema, you will issue a 400 status code and end the request.
    if (!albumInfo) {
        res.status(400).json({ error: 'You must provide data to create an album.' });
        return;
    }

    if (!albumInfo.title || typeof albumInfo.title !== 'string' || albumInfo.title.length === 0) {
        res.status(400).json({ error: 'You must provide a title of the new album. The title must be a string.' });
        return;
    }

    if (!albumInfo.author || typeof albumInfo.author !== 'string' || albumInfo.author.length === 0) {
        res.status(400).json({ error: 'You must provide an author of the new album.' });
        return;
    }

    if (!albumInfo.songs || !Array.isArray(albumInfo.songs)) {
        res.status(400).json({ error: 'You must provide a list of the songs for this album.' });
        return;
    }

    if (albumInfo.songs.length === 0) {
        res.status(400).json({ error: 'You must provide at least one song.' });
        return;
    }

    for (let item of albumInfo.songs) {
        if (typeof item !== 'string' || item.length === 0) {
            res.status(400).json({ error: 'The songs should be an array of strings.' });
            return;
        }
    }

    try {
        await bandData.getBand(albumInfo.author);
    } catch (e) {
        res.status(404).json({ error: e });
        return;
    }

    try {
        const { title, author, songs } = albumInfo;
        const newAlbumInfo = await albumData.addAlbum(title, author, songs);

        const bandThatReleased = await bandData.getBand(author);

        let newAlbum = {
            _id: newAlbumInfo._id.toString(),
            title: title,
            author: {
                _id: author,
                bandName: bandThatReleased.bandName
            },
            songs: songs
        };

        res.status(200).json(newAlbum);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//GET /albums/{id}
router.get('/:id', async(req, res) => {
    try {
        const albumInfo = await albumData.getAlbumById(req.params.id);

        const bandThatReleased = await bandData.getBand(albumInfo.author);

        let newAlbum = {
            _id: req.params.id,
            title: albumInfo.title,
            author: {
                _id: albumInfo.author,
                bandName: bandThatReleased.bandName
            },
            songs: albumInfo.songs
        };

        res.status(200).json(newAlbum);
    } catch (e) {
        res.status(404).json({ error: 'Album not found.' });
    }
});

//PATCH /albums/{id}
router.patch('/:id', async(req, res) => {
    const updatedData = req.body;

    //If no album exists with an _id of {id}, return a 404 and end the request.
    try {
        await albumData.getAlbumById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Album not found.' });
        return;
    }

    //If the JSON provided in the PATCH body is not as stated above, fail the request with a 400 error and end the request.
    if (!updatedData.newTitle && !updatedData.newSongs) {
        res.status(400).json({ error: 'You must provide a newTitle, or newSongs, or both!' });
        return;
    }

    if (updatedData.newTitle && typeof updatedData.newTitle !== 'string' || updatedData.newTitle.length === 0) {
        res.status(400).json({ error: 'You must provide a title of the new album. The title must be a string.' });
        return;
    }

    if (updatedData.newSongs && typeof updatedData.newSongs !== 'string' || updatedData.newSongs.length === 0) {
        res.status(400).json({ error: 'You must provide a new song of the new album. The song must be a string.' });
        return;
    }

    try {
        const updatedAlbum = await albumData.updateAlbum(req.params.id, updatedData);

        let bandThatReleased = await bandData.getBand(updatedAlbum.author);

        let newAlbum = {
            _id: req.params.id,
            title: updatedAlbum.title,
            author: {
                _id: updatedAlbum.author,
                bandName: bandThatReleased.bandName
            },
            songs: updatedAlbum.songs
        };

        res.json(newAlbum);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//DELETE /albums/{id}
router.delete('/:id', async(req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: 'You must supply an ID to delete.' });
        return;
    }

    //If no album exists with an _id of {id}, return a 404 and end the request.
    try {
        await albumData.getAlbumById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Album not found.' });
        return;
    }

    try {
        const albumInfo = await albumData.removeAlbum(req.params.id);

        const bandThatReleased = await bandData.getBand(albumInfo.author);

        let newAlbum = {
            _id: req.params.id,
            title: albumInfo.title,
            author: {
                _id: albumInfo.author,
                bandName: bandThatReleased.bandName
            },
            songs: albumInfo.songs
        };

        await bandData.removeAlbumFromBand(albumInfo.author, req.params.id);

        res.status(200).json({
            deleted: true,
            data: newAlbum
        });

    } catch (e) {
        res.status(500).json({ error: e });
    }
});


module.exports = router;