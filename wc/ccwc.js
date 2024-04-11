const fs = require("fs");

function countBytes(filename, isFile = true) {
  try {
    if (isFile) {
      return fs.statSync(filename).size;
    }
    return Buffer.byteLength(filename, "utf8");
  } catch (error) {
    console.log(`Error reading file: ${filename}`, error);
  }
}

function countLines(fileContent, isFile = true) {
  try {
    const fileContentData = isFile
      ? fs.readFileSync(fileContent, "utf8")
      : fileContent;
    let numberOfLines = fileContentData.split("\n").length;

    // Check if the last line is empty (no trailing newline)
    if (fileContentData[fileContentData.length - 1] === "\n") {
      numberOfLines -= 1;
    }

    return numberOfLines;
  } catch (error) {
    console.log(`Error reading file: ${fileContent}`, error);
  }
}

function countWords(filename) {
  try {
    const fileContentData = fs.readFileSync(filename, "utf8");
    const words = fileContentData
      .split(/\s+/)
      .filter((word) => word.length > 0);
    return words.length;
  } catch (error) {
    console.log(`Error reading file: ${filename}`, error);
  }
}

function countCharacters(filename) {
  try {
    const fileContentData = fs.readFileSync(filename, "utf8");

    // Check if the locale supports multibyte characters
    const isMultibyteSupported =
      new Intl.PluralRules().resolvedOptions().maximumFractionDigits > 0;

    // Count characters based on the locale
    const charactersCount = isMultibyteSupported
      ? [...fileContentData].length
      : fileContentData.length;

    return charactersCount;
  } catch (error) {
    console.log(`Error reading file: ${filename}`, error);
  }
}

function handleCommandLineInput({ option, file, isFile = true }) {
  switch (option) {
    case "-c":
      console.log(`${countBytes(file, isFile)} ${isFile ? file : ""}`);
      break;
    case "-l":
      console.log(`${countLines(file, isFile)} ${isFile ? file : ""}`);
      break;
    case "-w":
      console.log(`${countWords(file)} ${file}`);
      break;
    case "-m":
      console.log(`${countCharacters(file)} ${file}`);
      break;
    default:
      console.log(
        `${countLines(file)} ${countWords(file)} ${countBytes(file)} ${file}`
      );
      break;
  }
}

function wcClone() {
  const args = process.argv.slice(2);
  let inputStream;

  if (
    args.length === 1 &&
    (args[0] === "-c" || args[0] === "-l" || args[0] === "-w")
  ) {
    inputStream = process.stdin;
  }

  const option = args[0];
  const filename = args.length === 2 ? args[1] : args[0];

  if (inputStream) {
    let input = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => {
      input += chunk;
    });

    process.stdin.on("end", () => {
      const content = input.toString();
      handleCommandLineInput({ option, file: content, isFile: false });
    });
  } else {
    handleCommandLineInput({ option, file: filename });
  }
}

wcClone();
