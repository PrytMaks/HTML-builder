const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const inputStyles = path.join(__dirname, 'styles');

const inputAssets = path.join(__dirname, 'assets');
const outputAssets = path.join(__dirname, 'project-dist', 'assets');

const inputTemplate = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const inputHtml = path.join(__dirname, 'project-dist', 'index.html');

const output = path.join(__dirname, 'project-dist');

async function createDir() {
  await fsPromises.rm(output, { force: true, recursive: true });
  await fsPromises.mkdir(output, { recursive: true });
}


async function mergeStyles() {
  await fsPromises.writeFile(`${output}/style.css`, '');
  let writeStream = fs.createWriteStream(`${output}/style.css`);
  let files = await fsPromises.readdir(inputStyles, { withFileTypes: true });
  for (let file of files) {
    if (path.extname(file.name).split().pop() === '.css') {
      let readStream = fs.createReadStream(`${inputStyles}/${file.name}`);
      readStream.pipe(writeStream);
    }
  }
}

async function copyDir(input, output) {
  await fsPromises.rm(output, { force: true, recursive: true });
  await fsPromises.mkdir(output, { recursive: true });
  let files = await fsPromises.readdir(input, {withFileTypes:true});
  for(let file of files){
    let inputFolder = path.join(input, file.name);
    let outputFolder = path.join(output, file.name);
    if(file.isDirectory()){
      await copyDir(inputFolder, outputFolder);
    } else{
      await fsPromises.copyFile(inputFolder, outputFolder);
    }
  }
}


async function addTemplate(){
  let readTemplate = fs.createReadStream(inputTemplate, 'utf-8');
  let templates = await fsPromises.readdir(components, { withFileTypes: true });
  let data = '';
  readTemplate.on('data', chunk => {
    data += chunk;
    for(let template of templates){
      let templateName = template.name.split('.')[0];
      let readTemplates =  fs.createReadStream(path.join(components, template.name), 'utf-8');
      let dataReplace ='';
      readTemplates.on('data', chunk => {
        dataReplace += chunk;
        data = data.replace(`{{${templateName}}}`, dataReplace);
        const writeHtml = fs.createWriteStream(inputHtml);
        writeHtml.write(data);
      });
    }
  });
}

async function createBundle(){
  await createDir();
  await mergeStyles();
  await copyDir(inputAssets, outputAssets);
  await addTemplate();
}
createBundle();