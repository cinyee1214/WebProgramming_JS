const mongoCollections = require('../config/mongoCollections');
const albums = mongoCollections.albums;
const bands = require('./bands');
const mongo = require('mongodb');

module.exports = {

    //Create
    async addAlbum(title, author, songs) {

        if (!title || typeof title !== 'string') throw 'No title provided';
        if (!author || typeof author !== 'string') throw 'You must provide the ID of band as string.';

        if (!songs || !Array.isArray(songs)) throw 'You must provide an array of songs';

        if (songs.length === 0) throw 'You must provide at least one song.';

        const albumCollection = await albums();

        // const bandThatReleased = await bands.getBand(author);

        // const newAlbum = {
        //     title: title,
        //     author: {
        //         _id: author,
        //         bandName: bandThatReleased.bandName
        //     },
        //     songs: songs
        // };

        const newAlbum = {
            title: title,
            author: author,
            songs: songs
        };

        const newInsertInfo = await albumCollection.insertOne(newAlbum);
        if (newInsertInfo.insertedCount === 0) throw 'Could not add album.';

        const newId = newInsertInfo.insertedId;

        await bands.addAlbumToBand(newId.toString(), title, author, songs);

        return await this.getAlbumById(newId.toString());
    },

    //Read
    async getAllAlbums() {
        const albumCollection = await albums();

        const allAlbums = await albumCollection.find({}).toArray();
        if (!allAlbums) throw 'No album in system!';

        return allAlbums;
    },

    async getAlbumById(id) {

        if (!id) throw 'You must provide an id to search for.';
        if (typeof id !== 'string') throw 'getAlbumById: The ID must be a string.';

        const albumCollection = await albums();
        const objId = mongo.ObjectID(id);
        const album = await albumCollection.findOne({ _id: objId });

        if (!album) throw 'Album not found';
        return album;
    },

    //Update
    async updateAlbum(id, updatedAlbum) {
        if (!id) throw 'You must provide an id to update for.';
        if (typeof id !== 'string') throw 'updateAlbum: The ID must be a string.';

        const albumCollection = await albums();

        const objId = mongo.ObjectID(id);

        if (updatedAlbum.newTitle) {
            let albumUpdateInfo = {};
            albumUpdateInfo.title = updatedAlbum.newTitle;
            let updateInfo = await albumCollection.updateOne({ _id: objId }, { $set: albumUpdateInfo });

            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
                throw 'could not update the title of album successfully';
            }
        }

        if (updatedAlbum.newSongs) {
            let updateInfo = await albumCollection.updateOne({ _id: objId }, { $addToSet: { songs: updatedAlbum.newSongs } });

            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
                throw 'could not update new songs for the album successfully';
            }
        }

        return await this.getAlbumById(id);
    },

    //Delete
    async removeAlbum(id) {

        const albumCollection = await albums();

        let album = null;
        try {
            album = await this.getAlbumById(id);
        } catch (e) {
            console.log(e);
            return;
        }

        // await bands.removeAlbumFromBand(album.author, id);

        const objId = mongo.ObjectId(id);
        const deletionInfo = await albumCollection.removeOne({ _id: objId });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete album with id of ${id}`;
        }

        return album;
    }
};