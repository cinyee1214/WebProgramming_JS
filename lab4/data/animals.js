const mongoCollections = require('../mongoCollections');
const animals = mongoCollections.animals;
const mongo = require('mongodb');

module.exports = {
    //This async function will return to the newly created animal object.
    async create(name, animalType) {
        if (!name || typeof name === 'string') throw 'You must provide a name for the animal and it must be type of string.';

        if (!animalType || typeof animalType === 'string') throw 'You must provide an animal type for the animal and it must be type of string.';

        const animalCollection = await animals();

        let newAnimal = {
            name: name,
            animalType: animalType
        };

        const insertInfo = await animalCollection.insertOne(newAnimal);
        if (insertInfo.insertedCount === 0) throw 'Could not add animal.';

        const newId = insertInfo.insertedId;

        const animal = await this.get(newId.toString());

        return animal;

    },

    //This function will return an array of all animals in the collection.
    async getAll() {
        const animalCollection = await animals();

        const allAnimals = await animalCollection.find({}).toArray();

        return allAnimals;

    },

    //When given an id, this function will return an animal from the database.
    asyncget(id) {
        if (!id) throw 'You must provide an id to search for.';
        if (typeof id !== 'string') throw 'Input must be a string.';

        const animalCollection = await animals();

        const objId = mongo.ObjectId(id);
        const theAnimal = await animalCollection.findOne({ _id: objId });

        if (theAnimal === null) throw 'No animal with this id.';

        return theAnimal;

    },

    //This function will remove the animal from the database.
    async remove(id) {
        if (!id) throw 'You must provide an id to search for.';
        if (typeof id !== 'string') throw 'Input must be a string.';

        const animalCollection = await animals();

        const deletedAnimal = await this.get(id);

        const objId = mongo.ObjectID(id);
        const deleteInfo = await animalCollection.removeOne({ _id: objId });

        if (deleteInfo.deletedCount === 0) throw `Could not delete the animal with id of ${id}.`;

        return deletedAnimal;

    },

    //This function will update the name of an animal currently in the database.
    async rename(id, newName) {
        if (!id) throw 'You must provide an id to search for.';
        if (typeof id !== 'string') throw 'Input must be a string.';


        if (!newName) throw ' You must provide a new name for the animal to update.';

        const animalCollection = await animals();

        const updatedAnimal = {
            name: newName
        };

        const objId = mongo.ObjectId(id);
        const updatedInfo = await animalCollection.updateOne({ _id: objId }, { $set: updatedAnimal });

        if (updatedInfo.modifiedCount === 0) throw 'Could not update animal successfully.';

        return await this.get(id);

    }

};