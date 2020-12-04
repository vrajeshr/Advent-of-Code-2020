const fs = require("fs");
input = [];

rawString = "";

try {
    const data = fs.readFileSync(`${__dirname}/input.txt`, "UTF-8");

    const lines = data.split(/\r\n/);

    lines.forEach((line) => {
        input.push(line);
    });
} catch (err) {
    console.error(err);
}

const processStringForPartOne = (string) => {
    let requiredFields = {
        byr: 0, //(Birth Year)
        iyr: 0, //(Issue Year)
        eyr: 0, //(Expiration Year)
        hgt: 0, //(Height)
        hcl: 0, //(Hair Color)
        ecl: 0, //(Eye Color)
        pid: 0, //(Passport ID)
        cid: 0, //(Country ID)
    };

    for (const field of string.split(" ")) {
        const [acronym, data] = field.split(":");
        requiredFields[acronym]++;
    }

    if (!requiredFields["byr"]) return false;
    if (!requiredFields["iyr"]) return false;
    if (!requiredFields["eyr"]) return false;
    if (!requiredFields["hgt"]) return false;
    if (!requiredFields["hcl"]) return false;
    if (!requiredFields["ecl"]) return false;
    if (!requiredFields["pid"]) return false;
    // if (!requiredFields["cid"]) return false;
    return true;
};

const processStringForPartTwo = (string) => {
    let requiredFields = {
        byr: 0, //(Birth Year)
        iyr: 0, //(Issue Year)
        eyr: 0, //(Expiration Year)
        hgt: 0, //(Height)
        hcl: 0, //(Hair Color)
        ecl: 0, //(Eye Color)
        pid: 0, //(Passport ID)
        cid: 0, //(Country ID)
    };

    for (const field of string.split(" ")) {
        const [acronym, data] = field.split(":");
        if (acronym === "byr") {
            let num = parseInt(data);
            if (data.length === 4 && 1920 <= num && num <= 2002) {
                requiredFields[acronym]++;
            }
        }
        if (acronym === "iyr") {
            let num = parseInt(data);
            if (data.length === 4 && 2010 <= num && num <= 2020) {
                requiredFields[acronym]++;
            }
        }
        if (acronym === "eyr") {
            let num = parseInt(data);
            if (data.length === 4 && 2020 <= num && num <= 2030) {
                requiredFields[acronym]++;
            }
        }
        if (acronym === "hgt") {
            let [number, units] = [data.slice(0, data.length - 2), data.slice(data.length - 2)];
            if (
                (units == "cm" && 150 <= number && number <= 193) ||
                (units == "in" && 59 <= number && number <= 76)
            ) {
                requiredFields[acronym]++;
            }
        }
        if (acronym === "hcl") {
            let hexColor = parseInt(data.slice(1), 16);
            if (hexColor.toString(16) == data.slice(1)) {
                requiredFields[acronym]++;
            }
        }
        if (acronym === "pid") {
            if (data.length === 9) {
                if (Number.isInteger(parseInt(data))) {
                    requiredFields[acronym]++;
                }
            }
        }
        if (acronym === "ecl") {
            if (
                data === "amb" ||
                data === "blu" ||
                data === "brn" ||
                data === "gry" ||
                data === "grn" ||
                data === "hzl" ||
                data === "oth"
            ) {
                requiredFields[acronym]++;
            }
        }
    }

    if (!requiredFields["byr"]) return false;
    if (!requiredFields["iyr"]) return false;
    if (!requiredFields["eyr"]) return false;
    if (!requiredFields["hgt"]) return false;
    if (!requiredFields["hcl"]) return false;
    if (!requiredFields["ecl"]) return false;
    if (!requiredFields["pid"]) return false;
    // if (!requiredFields["cid"]) return false;
    return true;
};

const partOneSolution = () => {
    let validPassportsForPartOne = 0;
    let validPassportsForPartTwo = 0;

    let currentLine = 0;
    let stringBuffer = "";
    while (currentLine < input.length) {
        if (input[currentLine] === "") {
            validPassportsForPartOne += processStringForPartOne(stringBuffer);
            validPassportsForPartTwo += processStringForPartTwo(stringBuffer);
            stringBuffer = "";
        } else if (stringBuffer.length != 0) {
            stringBuffer += " " + input[currentLine];
        } else {
            stringBuffer += input[currentLine];
        }
        currentLine++;
    }
    console.log("Question 1 answer : ", validPassportsForPartOne);
    console.log("Question 2 answer : ", validPassportsForPartTwo);
};
partOneSolution();
