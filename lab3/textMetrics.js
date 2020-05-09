const bluebird = require("bluebird");

const fs = bluebird.promisifyAll(require("fs"));

async function createMetrics(text) {
    if (!text || typeof text !== "string") throw "You must provide a valid text."

    text = text.toLowerCase();
    
    //initialize result
    let result = {
        totalLetters: 0,
        totalNonLetters: 0,
        totalWords: 0,
        totalVowels: 0,
        totalConsonants: 0,
        uniqueWords: 0,
        longWords: 0,
        averageWordLength: 0,
        wordOccurrences: {} 
    };

    //iterate the string
    for (let i = 0; i < text.length; ++i) {
        if (text.charAt(i).toLowerCase() !== text.charAt(i).toUpperCase()) {
            //item is the first letter of a new word
            let curWord ='';
            let j = i;
            while (j < text.length && text.charAt(j).toUpperCase() !== text.charAt(j).toLowerCase()) {
                curWord += text.charAt(j);

                result.totalLetters += 1;

                if (text.charAt(j) === "a" || text.charAt(j) === "e" || text.charAt(j) === "i" || text.charAt(j) === "o" || text.charAt(j) === "u") {
                    result.totalVowels += 1;
                } else {
                    result.totalConsonants += 1;
                }

                j++;
            }

            i = j - 1;

            //store this word to wordOccurrences
            result.wordOccurrences[`${curWord}`] = result.wordOccurrences[`${curWord}`] + 1 || 1; 
        } else {
            result.totalNonLetters += 1;
        }
    }

    //if there are at least one word
    if (Object.keys(result.wordOccurrences).length !== 0) {
        //calculate unique words
        result.uniqueWords = Object.keys(result.wordOccurrences).length;

        let totolLength = 0;
        
        for (let key in result.wordOccurrences) {
            //calculate total words
            result.totalWords += result.wordOccurrences[key];

            //calculate long words that are 6 or more letters long
            if (key.length >= 6) {
                result.longWords += result.wordOccurrences[key];
            }

            //calculate the total length of all words
            totolLength += key.length * result.wordOccurrences[key];
        }

        //calculate the average length of all words
        result.averageWordLength = totolLength / result.totalWords;
    }
    
    return result;
}

module.exports = {createMetrics};

