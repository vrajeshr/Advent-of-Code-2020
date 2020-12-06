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
            for (const item of input[x]) {
                answerSet.add(item);
            }
        }
    }

    console.log("Day 6 - Question 1 answer : ", sum);
};
partOneSolution();

const partTwoSolution = () => {
    let sum = 0;
    let answerSet = new Set();

    let previousPosition = 0;
    let currentGroup = {};

    for (let x = 0; x < input.length; x++) {
        if (input[x] === "") {
            let numberOfPeople = x - previousPosition;

            for (const key in currentGroup) {
                if (currentGroup[key] === numberOfPeople) {
                    sum += 1;
                }
            }

            previousPosition = x + 1;
            currentGroup = {};
            answerSet = new Set();
        } else {
            for (const item of input[x]) {
                if (!(item in currentGroup)) {
                    currentGroup[item] = 1;
                } else {
                    currentGroup[item] += 1;
                }
                answerSet.add(item);
            }
        }
    }

    console.log("Day 6 - Question 2 answer : ", sum);
};
partTwoSolution();
