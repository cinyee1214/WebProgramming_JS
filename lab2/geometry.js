//check the arguments
function checkIsProperNumber(num, variableName) {
    if (num === undefined) {
        throw `${variableName} is not provided.`;
    }
    if (typeof num !== "number") {
        throw `${variableName} is not a number.`;
    }
    if (isNaN(num)) {
        throw `${variableName} is NaN.`;
    }
    if (num <= 0) {
        throw `${variableName} is not more than 0."`
    }
}

module.exports = {
    description: "Four methods about geometry in lab2.",

    //calculate the volume of a rectangular prism
    volumeOfRectangularPrism: (length, width, height) => {
        checkIsProperNumber(length, "length");
        checkIsProperNumber(width, "width");
        checkIsProperNumber(height, "height");

        return length * width * height;
    },

    //calculate the surface area of a rectangular prism
    surfaceAreaOfRectangularPrism: (length, width, height) => {
        checkIsProperNumber(length, "length");
        checkIsProperNumber(width, "width");
        checkIsProperNumber(height, "height");

        return 2 * (length * width + length * height + width * height);
    },

    //calculate the volume of a sphere
    volumeOfSphere: (radius) => {
        checkIsProperNumber(radius, "radius");

        return 4 / 3 * Math.PI * Math.pow(radius, 3);
    },

    //calculate the surface area of a sphere
    surfaceAreaOfSphere: (radius) => {
        checkIsProperNumber(radius, "radius");

        return 4 * Math.PI * Math.pow(radius, 2);
    }
};