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

    if (char === "t" || char === "f" || char === "T" || char === "F") {
      let value = "";

      while (trimString[current] !== "e") {
        value += trimString[current];
        current++;
      }

      if (value === "tru") {
        tokens.push({ type: "BOOLEAN", value: true });
        current++;
        continue;
      } else if (value === "fals") {
        tokens.push({ type: "BOOLEAN", value: false });
        current++;
        continue;
      } else {
        tokens.push({
          type: "INVALID TOKEN",
          value: `INVALID TOKEN: Invalid boolean value provided. Value passed: ${value}e, Expected value: ${
            value === "Fals" ? false : true
          }`,
        });
        current++;
        continue;
      }
    }

    if (char === "n") {
      let value = "";

      while (trimString[current] !== "l") {
        value += trimString[current];
        current++;
      }

      if (value === "nu") {
        tokens.push({ type: "NULL", value: null });
        current += 2;
        continue;
      }
    }

    if (typeof parseInt(char) === "number") {
      let value = "";

      while (
        typeof parseInt(trimString[current]) === "number" &&
        !isNaN(trimString[current])
      ) {
        value += trimString[current].toString();
        current++;
      }

      tokens.push({ type: "NUMBER", value: parseInt(value) });
      continue;
    }

    throw new Error("Invalid character: " + char);
  }

  return tokens;
}

function parser(tokens) {
  let current = 0;
  const allowedTypes = ["STRING", "NUMBER", "BOOLEAN", "NULL"];

  function walk() {
    let token = tokens[current];

    if (token && token.type === "LBRACE") {
      let node = { type: "Object", children: [] };
      token = tokens[++current];

      while (token.type !== "RBRACE") {
        if (token.type === "STRING") {
          let key = token.value;
          token = tokens[++current];

          if (token.type === "COLON") {
            token = tokens[++current];

            if (allowedTypes.includes(token.type)) {
              let value = token.value;
              node.children.push({ key, value });
            } else if (token.type === "INVALID TOKEN") {
              return { type: token.value };
            } else {
              return {
                type: "Invalid JSON: Expected STRING, NUMBER, BOOLEAN or NULL as value after COLON",
              };
            }
          } else {
            return { type: "Invalid JSON: Expected COLON after key" };
          }
        } else {
          return { type: "Invalid JSON: Expected STRING as key" };
        }

        token = tokens[++current];

        if (token.type === "COMMA") {
          token = tokens[++current];

          if (token.type !== "STRING") {
            return { type: "Invalid JSON: Expected STRING after COMMA" };
          }
        } else if (token.type !== "RBRACE") {
          return {
            type: "Invalid JSON: Unexpected token after key-value pair",
          };
        }
      }

      return node;
    }

    return { type: "Invalid JSON" };
  }

  return walk();
}

module.exports = {
  lexer,
  parser,
};
