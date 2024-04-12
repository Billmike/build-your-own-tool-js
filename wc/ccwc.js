const { handleCommandLineInput } = require("./utils");

function wcClone() {
  const args = process.argv.slice(2);
  let inputStream;

  if (args.length === 0) {
    console.log("Usage: wc [OPTION]... [FILE]...");
    return;
  }

  if (
    args.length === 1 &&
    (args[0] === "-c" ||
      args[0] === "-l" ||
      args[0] === "-w" ||
      args[0] === "-m")
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
