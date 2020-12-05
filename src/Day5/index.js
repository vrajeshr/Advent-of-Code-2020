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

const partOneSolution = () => {
    console.log("Day X - Question 1 answer : "input);
};

partOneSolution();
