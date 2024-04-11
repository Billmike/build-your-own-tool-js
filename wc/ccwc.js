const fs = require("fs");

function countBytes(filename) {
  try {
    const stats = fs.statSync(filename);
    return stats.size;
  } catch (error) {
    console.log(`Error reading file: ${filename}`, error);
  }
}

function countLines(filename) {
  try {
    const fileContentData = fs.readFileSync(filename, "utf8");
    let numberOfLines = fileContentData.split("\n").length;

    // Check if the last line is empty (no trailing newline)
    if (fileContentData[fileContentData.length - 1] === "\n") {
      numberOfLines -= 1;
    }

    return numberOfLines;
  } catch (error) {
    console.log(`Error reading file: ${filename}`, error);
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

function wcClone() {
  const args = process.argv.slice(2);

  const option = args[0];
  const filename = args.length === 2 ? args[1] : args[0];

  switch (option) {
    case "-c":
      console.log(`${countBytes(filename)} ${filename}`);
      break;
    case "-l":
      console.log(`${countLines(filename)} ${filename}`);
      break;
    case "-w":
      console.log(`${countWords(filename)} ${filename}`);
      break;
    case "-m":
      console.log(`${countCharacters(filename)} ${filename}`);
      break;
    default:
      console.log(
        `${countLines(filename)} ${countWords(filename)} ${countBytes(
          filename
        )} ${filename}`
      );
      break;
  }
}

wcClone();
