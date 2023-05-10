
const fsPromises = require("fs/promises");
const path = require("path");
const input = path.join(__dirname, "files");
const output = path.join(__dirname, "files-copy");

async function copyDir(input, output) {
  await fsPromises.rm(output, { force: true, recursive: true });
  await fsPromises.mkdir(`${output}`, { recursive: true });
  let files = await fsPromises.readdir(input, {withFileTypes:true});
  for(let file of files){
     await fsPromises.copyFile(`${input}/${file.name}`, `${output}/${file.name}`);
  };
}

copyDir(input, output);
