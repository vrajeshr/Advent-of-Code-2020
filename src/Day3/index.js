const fs = require("fs");
input = [];
try {
    const data = fs.readFileSync(`${__dirname}/input.txt`, "UTF-8");

    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
        input.push(line);
    });
} catch (err) {
    console.error(err);
}

// open squares (.) and trees (#)
//  all the trees you would encounter for the slope right 3, down 1:
//      O where there was an open square and
//      X where there was a tree

const partOneSolution = () => {
    let rowLength = input[0].length;

    let row = 0;
    let column = 0;

    let numberOfTrees = 0;

    while (row < input.length) {
        if (column >= rowLength) {
            column -= rowLength;
        }

        if (input[row][column] === "#") {
            // input[row][column] = 'X'
            numberOfTrees += 1;
        }

        if (input[row][column] === ".") {
            // input[row][column] = 'O'
        }
        row += 1;
        column += 3;
    }
    console.log("Day 3 - Question 1 answer : ", numberOfTrees);
};

partOneSolution();

// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.

const partTwoSolution = () => {
    let rowLength = input[0].length;

    let result = 1;

    let traversals = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    for ([columnIncrement, rowIncrement] of traversals) {
        let numberOfTrees = 0;
        let row = 0;
        let column = 0;
        while (row < input.length) {
            if (column >= rowLength) {
                column -= rowLength;
            }

            if (input[row][column] === "#") {
                // input[row][column] = 'X'
                numberOfTrees += 1;
            }

            if (input[row][column] === ".") {
                // input[row][column] = 'O'
            }
            column += columnIncrement;
            row += rowIncrement;
        }
        result *= numberOfTrees;
    }
    console.log("Day 3 - Question 2 answer : ", result);
};

partTwoSolution();
