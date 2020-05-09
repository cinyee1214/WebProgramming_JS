const bluebird = require("bluebird");

const fs = bluebird.promisifyAll(require("fs"));

const fileData = require("./fileData");

const textMetrics = require("./textMetrics");

async function main() {
    for (let i = 1; i <= 3; ++i) {
        try {
            if (fs.existsSync(`./chapter${i}.result.json`)) {

                console.log(`chapter${i}.result.json already exists.`);

            } else {

                console.log(`chapter${i}.result.json does not exist.`);

                let stringResult = await fileData.getFileAsString(`./chapter${i}.txt`);
                let metrics = await textMetrics.createMetrics(stringResult);

                console.log(`Create a new file: chapter${i}.result.json.`);
                await fileData.saveJSONToFile(`chapter${i}.result.json`, metrics);

            }

            let jsonResult = await fileData.getFileAsJSON(`./chapter${i}.result.json`);

            console.log(`Print the content of chapter${i}.result.json:`);
            console.log(jsonResult);
            console.log("=========================================");

        } catch(error) {
            console.log(error);
        }
    }
}

main();

