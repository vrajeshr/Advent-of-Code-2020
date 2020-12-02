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

let validPasswords = 0;
let positionallyValid = 0;

for (const currentLine of input) {
    const [bounds, rawLetter, password] = currentLine.split(" ");

    const [minimum, maximum] = bounds.split("-");

    const letter = rawLetter[0];

    const timesLetterSeen = (password.match(new RegExp(letter, "g")) || []).length;

    if (minimum <= timesLetterSeen && timesLetterSeen <= maximum) {
        validPasswords += 1;
    }

    if ((password[minimum - 1] === letter) ^ (password[maximum - 1] === letter)) {
        positionallyValid += 1;
    }
}
//1-3 a: abcde is valid: position 1 contains a and position 3 does not.

console.log(validPasswords);
console.log(positionallyValid);
console.log();
