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

const processString = (string) => {
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

const partOneSolution = () => {
    let validPassports = 0;

    let currentLine = 0;
    let stringBuffer = "";
    while (currentLine < input.length) {
        if (input[currentLine] === "") {
            validPassports += processString(stringBuffer);
            stringBuffer = "";
        } else if (stringBuffer.length != 0) {
            stringBuffer += " " + input[currentLine];
        } else {
            stringBuffer += input[currentLine];
        }
        currentLine++;
    }
    console.log(validPassports);
};
partOneSolution();
