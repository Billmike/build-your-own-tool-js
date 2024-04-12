function lexer(jsonString) {
  const tokens = [];
  let current = 0;

  while (current < jsonString.length) {
    let char = jsonString[current];

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

    if (char === " ") {
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
      current++;

      if (tokens[current].type === "RBRACE") {
        return { type: "Object", properties: [] };
      }

      throw new Error("Invalid JSON object");
    }

    throw new Error("Invalid token: " + token.type);
  }

  return walk();
}

module.exports = {
  lexer,
  parser,
};
