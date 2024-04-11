const fs = require("fs");

function countBytes(filename) {
  try {
    const stats = fs.statSync(filename);
    return stats.size;
  } catch (error) {
    return -1;
  }
}

function wcClone() {
  const args = process.argv.slice(2);

  if (args.length !== 2 || args[0] !== "-c") {
    console.log("Usage: node ccwc.js -c filename");
    return;
  }

  const filename = args[1];
  const byteCount = countBytes(filename);

  if (byteCount === -1) {
    console.error(`Error reading file: ${filename}`);
    process.exit(1);
  }

  console.log(byteCount);
}

wcClone();
