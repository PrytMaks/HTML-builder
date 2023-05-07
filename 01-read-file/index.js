const fs = require("fs");
const path = require("path");
const { stdout } = process;

const inputPath = path.join(__dirname, "text.txt");
const readStream = fs.createReadStream(inputPath, "utf-8");

let data = "";
readStream.on("data", (chunk) => {
  data += chunk;
  stdout.write(data);
});
