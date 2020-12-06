const fs = require("fs");
input = [];
try {
    const data = fs.readFileSync(`${__dirname}/input.txt`, "UTF-8");

    const lines = data.split(/\r\n/);

    lines.forEach((line) => {
        input.push(line);
    });
} catch (err) {
    console.error(err);
}

const partOneSolution = () => {
    let sum = 0;

    let answerSet = new Set();

    for (let x = 0; x < input.length; x++) {
        if (input[x] === "") {
            sum += answerSet.size;
            answerSet = new Set();
        } else {
            for (let item of input[x]) {
                answerSet.add(item);
            }
        }
    }
    sum += answerSet.size;

    console.log(sum);
};
// partOneSolution();

const partTwoSolution = () => {
    let sum = 0;
    let previousPosition = 0;
    let answerSet = new Set();
    let currentGroup = {};

    for (let x = 0; x < input.length; x++) {
        if (input[x] === "") {
            let numberOfPeople = x - previousPosition;
            previousPosition = x + 1;

            for (const key in currentGroup) {
                if (currentGroup[key] === numberOfPeople) {
                    sum += 1;
                }
            }
            currentGroup = {};
            answerSet = new Set();
        } else {
            for (let item of input[x]) {
                answerSet.add(item);
                if (!currentGroup.hasOwnProperty(item)) {
                    currentGroup[item] = 1;
                } else {
                    currentGroup[item] += 1;
                }
            }
        }
    }

    console.log(sum);
};
partTwoSolution();
