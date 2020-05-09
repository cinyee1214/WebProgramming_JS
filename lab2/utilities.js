//deepEquality(obj1, obj2)
function checkIsObject(obj, variableName) {
    if (obj === undefined) {
        throw `${variableName} is not provided.`;
    }
    if (typeof obj !== "object") {
        throw `${variableName} is not an object.`;
    }
    if (Array.isArray(obj)) {
        throw `${variableName} is an array.`;
    }
    if (Object.keys(obj).length === 0) {
        throw `${variableName} is empty.`;
    }
}

function deepEquality(obj1, obj2) {
    checkIsObject(obj1, "first object");
    checkIsObject(obj2, "second object");
    
    return deepEqual(obj1, obj2);
}

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }

    if (typeof obj1 === "object" && typeof obj2 === "object") {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
    
        for (let key in obj1) {
            if (obj2.hasOwnProperty(key)) {
                if (!deepEqual(obj1[key], obj2[key])) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;

    } else {
        return false;
    }
}


//uniqueElements(arr)
function checkIsArray(arr) {
    if (arr === undefined) {
        throw "Array is not provided.";
    }
    if (!Array.isArray(arr)) {
        throw "Input is not an array.";
    }
    if (arr.length === 0) {
        throw "Array is empty and there is 0 element.";
    }
}

function uniqueElements(arr) {
    checkIsArray(arr);

    let map = {};

    for (let item of arr) {
        map[item + (typeof item)] = map[item + (typeof item)] + 1 || 1;
    }

    return Object.keys(map).length;
}


//countOfEachCharacterInString(str)
function checkIsString(str) {
    if (str === undefined) {
        throw "String is not provided.";
    }
    if (typeof str !== "string") {
        throw "Input is not a string.";
    }
    if (str.length === 0) {
        throw "String is empty and there is 0 element.";
    }
}

function countOfEachCharacterInString(str) {
    checkIsString(str);

    let strArray = str.split('');
    let charMap = {};

    for (let item of strArray) {
        charMap[item] = charMap[item] + 1 || 1;
    }

    return charMap;
}




module.exports = {
    description: "Three methods for lab2.",
    deepEquality,
    uniqueElements,
    countOfEachCharacterInString
};
