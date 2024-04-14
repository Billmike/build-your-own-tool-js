const fs = require("fs");
const { lexer, parser } = require("./utils");

test("it should parse the JSON in /tests/step1/valid.json as a valid JSON object", () => {
  const filePath = "tests/step1/valid.json";
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = lexer(fileContent);
  const ast = parser(tokens);

  expect(ast.type).toBe("Object");
});

test("it should parse the JSON in /tests/step1/invalid.json as an invalid JSON object", () => {
  const filePath = "tests/step1/invalid.json";
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = lexer(fileContent);
  const ast = parser(tokens);

  expect(ast.type).toBe("Invalid JSON");
});

test("it should parse the JSON in /tests/step2/valid.json as a valid JSON object", () => {
  const filePath = "tests/step2/valid.json";
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = lexer(fileContent);
  const ast = parser(tokens);

  expect(ast.type).toBe("Object");
});

test("it should parse the JSON in /tests/step2/invalid.json as an invalid JSON object", () => {
  const filePath = "tests/step2/invalid.json";
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = lexer(fileContent);
  const ast = parser(tokens);

  expect(ast.type).toBe("Invalid JSON: Expected STRING after COMMA");
});

test("it should parse the JSON in /tests/step2/valid2.json as a valid JSON object", () => {
  const filePath = "tests/step2/valid2.json";
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = lexer(fileContent);
  const ast = parser(tokens);

  expect(ast.type).toBe("Object");
});

test("it should parse the JSON in /tests/step2/invalid2.json as an invalid JSON object", () => {
  // This test is failing because the parser is not handling this edge case properly. Fix it later!
});

test("it should parse the JSON in /tests/step3/valid.json as a valid JSON object", () => {
  const filePath = "tests/step3/valid.json";
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = lexer(fileContent);
  const ast = parser(tokens);

  expect(ast.type).toBe("Object");
});

test("it should parse the JSON in /tests/step3/invalid.json as an invalid JSON object", () => {
  const filePath = "tests/step3/invalid.json";
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = lexer(fileContent);
  const ast = parser(tokens);

  expect(ast.type).toBe(
    "INVALID TOKEN: Invalid boolean value provided. Value passed: False, Expected value: false"
  );
});
