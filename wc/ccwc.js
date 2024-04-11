const fs = require("fs");

function countBytes(filename) {
  try {
    const stats = fs.statSync(filename);
    return stats.size;
  } catch (error) {
    return -1;
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
    return -1;
  }
}

function wcClone() {
  const args = process.argv.slice(2);

  if (args.length !== 2 || (args[0] !== "-c" && args[0] !== "-l")) {
    console.log("Usage: node ccwc.js -c|-l filename");
    return;
  }

  const option = args[0];
  const filename = args[1];

  if (option === "-l") {
    const lineCount = countLines(filename);

    if (lineCount === -1) {
      console.error(`Error reading file: ${filename}`);
      process.exit(1);
    }

    console.log(`${lineCount} ${filename}`);
  } else if (option === "-c") {
    const byteCount = countBytes(filename);

    if (byteCount === -1) {
      console.error(`Error reading file: ${filename}`);
      process.exit(1);
    }

    console.log(`${byteCount} ${filename}`);
  }
}

wcClone();
