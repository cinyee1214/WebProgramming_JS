const dbConnection = require('./config/mongoConnection');
const data = require('./data/');
const bands = data.bands;
const albums = data.albums;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    const patrick = await bands.addBand('Patrick_v2', ["Roger Waters", "David Mason"], 1990, ["Rock", "Pop"], 'EMI');
    const id = patrick._id.toString();
    await albums.addAlbum('Hello, class!', id, ["In the Flesh?", "The Thin Ice", "Another Brick in the Wall"]);
    await albums.addAlbum(
        'Using the seed',
        id, ["In the Flesh?", "The Thin Ice", "Another Brick in the Wall"]
    );


    console.log('Done seeding database');

    await db.serverConfig.close();
}

main();