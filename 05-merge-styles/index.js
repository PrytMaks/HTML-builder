const fsPromises = require('fs/promises');
const path = require('path');
const input = path.join(__dirname, 'styles');
const output = path.join(__dirname, 'project-dist');
const fs = require('fs');

async function mergeStyles(input){
  await fsPromises.rm(`${output}/bundle.css`, { force: true, recursive: true });
  await fsPromises.writeFile(`${output}/bundle.css`, '');

  let writeStream = fs.createWriteStream(`${output}/bundle.css`);
  let files = await fsPromises.readdir(input, {withFileTypes: true});
  for(let file of files){
    if(path.extname(file.name).split().pop() === '.css'){
      let readStream = fs.createReadStream(`${input}/${file.name}`);
      readStream.pipe(writeStream);
    }
  }
}

mergeStyles(input, output);