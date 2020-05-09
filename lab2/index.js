const geometry = require("./geometry");
const utilities = require("./utilities");

//test volumeOfRectangularPrism(length, width, height)
//1. test for less arguments
try {
    console.log(geometry.volumeOfRectangularPrism(1, 2));
} catch (error) {
    console.log(error);
}

//2. test for not numbers
try {
    console.log(geometry.volumeOfRectangularPrism(1, 2, "st"));
} catch (error) {
    console.log(error);
}

//3. test for NaN
try {
    console.log(geometry.volumeOfRectangularPrism(1, NaN, 3));
} catch (error) {
    console.log(error);
}

//4. test for improper numbers
try {
    console.log(geometry.volumeOfRectangularPrism(1, -2, 0));
} catch (error) {
    console.log(error);
}

//5. test for proper numbers
try {
    //should output 6
    console.log(geometry.volumeOfRectangularPrism(1, 2, 3));
} catch (error) {
    console.log(error);
}


//test surfaceAreaOfRectangularPrism(length, width, height)
//1. test for less arguments
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1, 2));
} catch (error) {
    console.log(error);
}

//2. test for not numbers
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1, 2, "st"));
} catch (error) {
    console.log(error);
}

//3. test for NaN
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1, NaN, 3));
} catch (error) {
    console.log(error);
}

//4. test for improper numbers
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1, -2, 0));
} catch (error) {
    console.log(error);
}

//5. test for proper numbers
try {
    //should output 22
    console.log(geometry.surfaceAreaOfRectangularPrism(1, 2, 3));
} catch (error) {
    console.log(error);
}


//test volumeOfSphere(radius)
//1. test for less arguments
try {
    console.log(geometry.volumeOfSphere());
} catch (error) {
    console.log(error);
}

//2. test for not numbers
try {
    console.log(geometry.volumeOfSphere("radius"));
} catch (error) {
    console.log(error);
}

//3. test for NaN
try {
    console.log(geometry.volumeOfSphere(NaN));
} catch (error) {
    console.log(error);
}

//4. test for improper numbers
try {
    console.log(geometry.volumeOfSphere(-5));
} catch (error) {
    console.log(error);
}

//5. test for proper numbers
try {
    //should output ~113.1
    console.log(geometry.volumeOfSphere(3));
} catch (error) {
    console.log(error);
}


//test surfaceAreaOfSphere(radius)
//1. test for less arguments
try {
    console.log(geometry.surfaceAreaOfSphere());
} catch (error) {
    console.log(error);
}

//2. test for not numbers
try {
    console.log(geometry.surfaceAreaOfSphere("radius"));
} catch (error) {
    console.log(error);
}

//3. test for NaN
try {
    console.log(geometry.surfaceAreaOfSphere(NaN));
} catch (error) {
    console.log(error);
}

//4. test for improper numbers
try {
    console.log(geometry.surfaceAreaOfSphere(-5));
} catch (error) {
    console.log(error);
}

//5. test for proper numbers
try {
    //should output ~314.16
    console.log(geometry.surfaceAreaOfSphere(5));
} catch (error) {
    console.log(error);
}


//test deepEquality(obj1, obj2)
//1. test for less arguments
try {
    console.log(utilities.deepEquality({1: 1}));
} catch (error) {
    console.log(error);
}

//2. test for non object
try {
    console.log(utilities.deepEquality({1: 2}, 2));
} catch (error) {
    console.log(error);
}

//3. test for array
try {
    console.log(utilities.deepEquality([1, 2], {2: 3}));
} catch (error) {
    console.log(error);
}

//4. test for empty object
try {
    console.log(utilities.deepEquality({1: 1}, {}));
} catch (error) {
    console.log(error);
}

//5. test for proper inputs
try {
    //false
    console.log(utilities.deepEquality({1: 1}, {2: 2}));
} catch (error) {
    console.log(error);
}

try {
    //true
    console.log(utilities.deepEquality({1: 1, 2: 2}, {2: 2, 1: 1}));
} catch (error) {
    console.log(error);
}

try {
    //true
    console.log(utilities.deepEquality({"1": 1}, {1: 1}));
} catch (error) {
    console.log(error);
}

try {
    //true
    console.log(utilities.deepEquality({1: {1: 1, "st": 'w'}, 2: 2}, {2: 2, 1: {'st': "w", 1: 1}}));
} catch (error) {
    console.log(error);
}

try {
    //false
    console.log(utilities.deepEquality({1: undefined}, {"1": 1}));
} catch (error) {
    console.log(error);
}


//test uniqueElements(arr)
//1. test for less arguments
try {
    console.log(utilities.uniqueElements());
} catch (error) {
    console.log(error);
}

//2. test for non array
try {
    console.log(utilities.uniqueElements({1: 1}));
} catch (error) {
    console.log(error);
}

//3. test for empty array
try {
    console.log(utilities.uniqueElements([]));
} catch (error) {
    console.log(error);
}

//4. test for proper array
try {
    //should output 5
    console.log(utilities.uniqueElements(["a", "a", "1", 1, 1, 2, 'absd']));
} catch (error) {
    console.log(error);
}

//5. test for proper array
try {
    //should output 1
    console.log(utilities.uniqueElements([1, 1, 1, 1]));
} catch (error) {
    console.log(error);
}

//6. test for proper array
try {
    //should output 3
    console.log(utilities.uniqueElements([{1: 2}, 1, 1, 1, "1", "1"]));
} catch (error) {
    console.log(error);
}

//7. test for proper array
try {
    //should output 3
    console.log(utilities.uniqueElements(["a", "a", "b", "a", "b", "c"]));
} catch (error) {
    console.log(error);
}

//8. test for proper array
try {
    //should output 1
    console.log(utilities.uniqueElements([1, 1.0, 1.00]));
} catch (error) {
    console.log(error);
}


//test countOfEachCharacterInString(str)
//1. test for less arguments
try {
    console.log(utilities.countOfEachCharacterInString());
} catch (error) {
    console.log(error);
}

//2. test for non string
try {
    console.log(utilities.countOfEachCharacterInString(['1', 2]));
} catch (error) {
    console.log(error);
}

//3. test for empty string
try {
    console.log(utilities.countOfEachCharacterInString(""));
} catch (error) {
    console.log(error);
}

//4. test for proper string
try {
    console.log(utilities.countOfEachCharacterInString("Hello, the pie is in the oven"));
} catch (error) {
    console.log(error);
}

//5. test for proper string
try {
    console.log(utilities.countOfEachCharacterInString("abcABC +-*/ ''. 1 '2' ."));
} catch (error) {
    console.log(error);
}