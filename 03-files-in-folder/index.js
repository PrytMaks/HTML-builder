const fs = require("fs");
const { stdout } = process;
const path = require("path");
const inputPath = path.join(__dirname, "secret-folder");

fs.readdir(inputPath, { withFileTypes: true }, (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  data.forEach((file) => {
    if (file.isFile()) {
      fs.stat(`${inputPath}/${file.name}`, (error, stats) => {
        if(error){
          console.error(error);
          return;
        }
        stdout.write(`${file.name.split(".")[0]} - ${path.extname(file.name).split(".")[1]} - ${stats.size / 1000}kb\n`
        );
      });
    }
  });
});
