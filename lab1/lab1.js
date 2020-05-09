const questionOne = function questionOne(arr) {
    // Implement question 1 here

    // Calculate the squared nums and put them in a new array
    let numArraySquared = arr.map((x) => {
        return x * x;
    });

    // Calculate the sum of the new array
    let sumOfSquared = numArraySquared.reduce((currentTotal, newValue) => {
        return currentTotal + newValue;
    }, 0);

    return sumOfSquared;
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    if (num < 1) {
        return 0;
    } else if (num === 1) {
        return 1;
    } else {
        return questionTwo(num - 1) + questionTwo(num - 2);
    }
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let sumOfVowel = 0;
    let newText = text.toLowerCase();
    for (let i = 0; i < newText.length; ++i) {
        let character = newText.charAt(i);
        if (character === 'a' || character === 'e' || character === 'i' || character === 'o' || character === 'u') {
            sumOfVowel += 1;
        } 
    }
    return sumOfVowel;
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    if (num < 0) {
        return 'NaN';
    } else if (num === 0) {
        return 1;
    } else {
        return questionFour(num - 1) * num;
    }
}

module.exports = {
    firstName: "XINYI", 
    lastName: "ZHAO", 
    studentId: "10451738",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};