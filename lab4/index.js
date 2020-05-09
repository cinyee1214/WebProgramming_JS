const animals = require('./data/animals');
const connection = require('./mongoConnection');

async function main() {
    // Create an animal named Sasha with the type of Dog
    // Log the newly created animal
    const sasha = await animals.create("Sasha", "Dog");
    console.log('Created an animal: named Sasha with the type of Dog.');
    console.log(sasha);
    console.log("=======================================");

    //Create an animal named Lucy, with the type of Dog
    const lucy = await animals.create("Lucy", "Dog");
    console.log('Created an animal: named Lucy with the type of Dog.');
    console.log("=======================================");

    //Query all animals, and log them all
    const allAnimals = await animals.getAll();
    console.log('Query all animals, and log them all:');
    console.log(allAnimals);
    console.log("=======================================");

    //Create an animal named Duke, with a type of Walrus
    //Log the newly created Duke
    const duke = await animals.create("Duke", "Walrus");
    console.log('Created an animal: named Duke with the type of Walrus.');
    console.log(duke);
    console.log("=======================================");

    //Rename Sasha to Sashita
    //Log the newly named Sashita
    const sashaId = sasha._id.toString();
    const renamedSasha = await animals.rename(sashaId, "Sashita");
    console.log('Sasha is renamed of Sashita');
    console.log(renamedSasha);
    console.log("=======================================");

    //Remove Lucy
    const lucyId = lucy._id.toString();
    const removeLucy = await animals.remove(lucyId);
    console.log('Lucy is removed.');
    console.log("=======================================");

    //Query all animals, and log them all
    const allAnimals2 = await animals.getAll();
    console.log('Query all animals, and log them all:');
    console.log(allAnimals2);
    console.log("=======================================");


    const db = await connection();
    await db.serverConfig.close();

    console.log('Done!');

}

main().catch((error) => {
    console.log(error);
});