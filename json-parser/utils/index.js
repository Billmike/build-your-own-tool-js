function lexer(jsonString) {
  const trimString = jsonString.replace(/\s/g, "");
  const tokens = [];
  let current = 0;

  while (current < trimString.length) {
    let char = trimString[current];
    console.log("char:", char);

    if (char === "{") {
      tokens.push({ type: "LBRACE", value: "{" });
      current++;
      continue;
    }

    if (char === "}") {
      tokens.push({ type: "RBRACE", value: "}" });
      current++;
      continue;
    }

    if (char === '"') {
      let value = "";
      current++;

      while (trimString[current] !== '"') {
        value += trimString[current];
        current++;
      }

      tokens.push({ type: "STRING", value });
      current++;
      continue;
    }

    if (char === ":") {
      tokens.push({ type: "COLON", value: ":" });
      current++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "COMMA", value: "," });
      current++;
      continue;
    }

    if (char === " ") {
      tokens.push({ type: "SPACE", value: " " });
      current++;
      continue;
    }

    throw new Error("Invalid character: " + char);
  }

  return tokens;
}

function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === "LBRACE") {
      let node = { type: "Object", children: [] };
      token = tokens[++current];

      while (token.type !== "RBRACE") {
        if (token.type === "STRING") {
          let key = token.value;
          token = tokens[++current];

          if (token.type === "COLON") {
            token = tokens[++current];

            if (token.type === "STRING") {
              let value = token.value;
              node.children.push({ key, value });
            } else {
              throw new Error("Invalid JSON: Expected STRING after COLON");
            }
          } else {
            throw new Error("Invalid JSON: Expected COLON after STRING");
          }
        } else {
          throw new Error("Invalid JSON: Expected STRING as key");
        }

        token = tokens[++current];

        if (token.type === "COMMA") {
          token = tokens[++current];

          if (token.type !== "STRING") {
            throw new Error("Invalid JSON: Expected STRING after COMMA");
          }
        } else if (token.type !== "RBRACE") {
          throw new Error(
            "Invalid JSON: Unexpected token after key-value pair"
          );
        }
      }

      return node;
    }
  }

  return walk();
}

module.exports = {
  lexer,
  parser,
};
