const fs = require("fs");
const { lexer, parser } = require("./utils");

// function lex(input) {
//   const tokens = [];
//   let current = 0;

//   while (current < input.length) {
//     let char = input[current];

//     if (char === "{") {
//       tokens.push({ type: "LBRACE", value: "{" });
//       current++;
//       continue;
//     }

//     if (char === "}") {
//       tokens.push({ type: "RBRACE", value: "}" });
//       current++;
//       continue;
//     }

//     if (char === " ") {
//       current++;
//       continue;
//     }

//     throw new Error("Invalid character: " + char);
//   }

//   return tokens;
// }

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
