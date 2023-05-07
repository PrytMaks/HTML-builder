const path = require("path");
const { stdout, stdin } = process;
const fs = require("fs");
const outputPath = path.join(__dirname, "text.txt");
const writeStream = fs.createWriteStream(outputPath);

stdout.write("Здравствуйте, введите текст для записи в файл:\n");
stdin
  .on("data", (data) => {
    const dataText = data.toString().trim();
    if (dataText === "exit") {
      stdout.write("Успехов Вам, до свидания!");
      process.exit();
    }
  })
  .pipe(writeStream);

process.on("SIGINT", () => {
  stdout.write("Удачи и успехов!");
  process.exit();
});
