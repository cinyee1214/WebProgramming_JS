const bluebird = require("bluebird");

const fs = bluebird.promisifyAll(require("fs"));

// given a path, return a promise that resolves to a string with the contents of the files.
async function getFileAsString(path) {
    if (!path || typeof path !== "string") throw "You must provide a path.";

    console.log(`Ready to read ${path} if it exists.`);
    const fileContent = await fs.readFileAsync(path, "utf-8");
    return fileContent;
}

//given a path, return a promise that resolves to a JavaScript object. 
async function getFileAsJSON(path) {
    console.log(`Ready to convert ${path} to a JavaScript object if it exists.`);
    const fileString = await getFileAsString(path);
    return JSON.parse(fileString);
}

//take the text supplied, and store it in the file specified by path.
async function saveStringToFile(path, text) {
    if (!path || typeof path !== "string") throw "You must provide a path.";
    if (typeof text !== "string") throw "Text is not a string.";

    await fs.writeFileAsync(path, text);
    console.log("Finished: Text is saved to file.");
    return true;
}

//take the obj supplied and convert it into a JSON string so that it may stored as in a file. 
async function saveJSONToFile(path, obj) {
    if (!path || typeof path !== "string") throw "You must provide a path.";
    if (typeof obj !== "object") throw "You must provide an object.";

    const objToString = JSON.stringify(obj);
    await saveStringToFile(path, objToString);
    console.log("Finished: Object is saved to file.");
    return true;
}

module.exports = {getFileAsString, getFileAsJSON, saveStringToFile, saveJSONToFile};



