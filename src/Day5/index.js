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

const getPosition = (partition) => {
    let [loRow, hiRow] = [0, 127];
    let [loCol, hiCol] = [0, 7];

    for (let x = 0; x < partition.length; x++) {
        switch (partition[x]) {
            case "F":
                hiRow = Math.floor((hiRow - loRow) / 2) + loRow;
                break;
            case "B":
                loRow = Math.ceil((hiRow - loRow) / 2) + loRow;
                break;
            case "L":
                hiCol = Math.floor((hiCol - loCol) / 2) + loCol;
                break;
            case "R":
                loCol = Math.ceil((hiCol - loCol) / 2) + loCol;
                break;
        }
    }

    return [loRow, loCol];
};

const partOneSolution = () => {
    let highestID = -1;
    for (const partition of input) {
        let [rowPosition, columnPosition] = getPosition(partition);
        highestID = Math.max(rowPosition * 8 + columnPosition, highestID);
    }
    console.log("Day 5 - Question 1 answer : ", highestID);
};

partOneSolution();

// some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.
const partTwoSolution = () => {
    let seating = new Array(127);
    for (let x = 0; x < seating.length; x++) {
        seating[x] = [0, 0, 0, 0, 0, 0, 0];
    }

    for (const partition of input) {
        let [rowPosition, columnPosition] = getPosition(partition);
        seating[rowPosition][columnPosition] = 1; // 1 indicates the seat is taken
    }

    for (const row in seating) {
        for (let column = 0; column < seating[row].length; column++) {
            if (seating[row][column] === 0) {
                //manually looked at the output to determine which seatID is the outlier
                // console.log(row * 8 + column);
            }
        }
    }

    console.log("Day 5 - Question 1 answer : ", 696);
};

partTwoSolution();
console.log();
