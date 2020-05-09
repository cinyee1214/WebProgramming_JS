const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const mongo = require('mongodb');


module.exports = {
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!

    async getBand(id) {
        if (!id) throw 'You must provide an id to search for.';
        if (typeof id !== 'string') throw 'getBand: The ID must be a string.';

        const bandCollection = await bands();

        const objId = mongo.ObjectId(id);
        const band = await bandCollection.findOne({ _id: objId });

        if (!band) throw 'No band with that id';

        return band;
    },

    async getAllBands() {
        const bandCollection = await bands();

        const allBands = await bandCollection.find({}).toArray();

        if (!allBands) throw 'No bands in system!';

        return allBands;
    },

    async addBand(bandName, bandMembers, yearFormed, genres, recordLabel) {

        const bandCollection = await bands();

        let newBand = {
            bandName: bandName,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            genres: genres,
            recordLabel: recordLabel,
            albums: []
        };

        const insertInfo = await bandCollection.insertOne(newBand);

        if (insertInfo.insertedCount === 0) throw 'Could not add band';

        const newId = insertInfo.insertedId;

        const band = await this.getBand(newId.toString());
        // const band = await this.getBand(newId.toHexString());
        return band;
    },

    async addAlbumToBand(albumId, title, author, songs) {

        const bandCollection = await bands();
        // const updateInfo = await bandCollection.updateOne({ _id: mongo.ObjectID(author) }, { $addToSet: { albums: { _id: albumId, title: title, author: author, songs: songs } } });
        const updateInfo = await bandCollection.updateOne({ _id: mongo.ObjectID(author) }, { $addToSet: { albums: albumId } });

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

        return await this.getBand(author);

    },

    async updateBand(bandId, bandInfo) {

        const bandCollection = await bands();

        const bandUpdataInfo = {};

        if (bandInfo.bandName) {
            bandUpdataInfo.bandName = bandInfo.bandName;
        }
        if (bandInfo.bandMembers) {
            bandUpdataInfo.bandMembers = bandInfo.bandMembers;
        }
        if (bandInfo.yearFormed) {
            bandUpdataInfo.yearFormed = bandInfo.yearFormed;
        }
        if (bandInfo.genres) {
            bandUpdataInfo.genres = bandInfo.genres;
        }
        if (bandInfo.recordLabel) {
            bandUpdataInfo.recordLabel = bandInfo.recordLabel;
        }

        const objId = mongo.ObjectId(bandId);

        const updateInfo = await bandCollection.updateOne({ _id: objId }, { $set: bandUpdataInfo });

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
            throw 'could not update band successfully';
        }

        return await this.getBand(bandId);
    },

    async removeBand(id) {
        if (!id) throw 'You must provide an id to search for.';
        if (typeof id !== 'string') throw 'removeBand: The ID must be a string.';

        const bandCollection = await bands();

        let band = null;
        try {
            band = await this.getBand(id);
        } catch (e) {
            console.log(e);
            return;
        }

        const objId = mongo.ObjectId(id);
        const deletionInfo = await bandCollection.deleteOne({ _id: objId });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete band with id of ${id}`;
        }

        console.log(band);
        return band;
    },

    async removeAlbumFromBand(bandId, albumId) {
        let currentBand = this.getBand(bandId);
        console.log(currentBand);

        const bandCollection = await bands();

        const updateInfo = await bandCollection.updateOne({ _id: mongo.ObjectID(bandId) }, { $pull: { albums: albumId } });
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

        return { deleted: true };
    }

};