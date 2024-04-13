const fs = require("fs");
const { lexer, parser } = require("./utils");

function main() {
  const filePath = process.argv[2];
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = lexer(fileContent);
  const ast = parser(tokens);

  if (ast.type === "Object") {
    console.log("Valid JSON object");
    process.exit(0);
  } else {
    console.log("Invalid JSON object");
    process.exit(1);
  }
}

main();
