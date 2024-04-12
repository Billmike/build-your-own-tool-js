const exp = require("constants");
const {
  countLines,
  countBytes,
  countCharacters,
  countWords,
} = require("./utils");

const fileContentAsString = `This is the first line.
This is the second line.
This is the third line.`;

const fileContentAsFilePath = "test.txt";

test("countLines() counts the number of lines in a file", () => {
  expect(countLines(fileContentAsString, false)).toBe(3);
  expect(countLines(fileContentAsFilePath)).toBe(7145);
});

test("countBytes() counts the number of bytes in a file", () => {
  expect(countBytes(fileContentAsString, false)).toBe(72);
  expect(countBytes(fileContentAsFilePath)).toBe(342190);
});

test("countCharacters() counts the number of characters in a file", () => {
  expect(countCharacters(fileContentAsString, false)).toBe(72);
  expect(countCharacters(fileContentAsFilePath)).toBe(339292);
});

test("countWords() counts the number of words in a file", () => {
  expect(countWords(fileContentAsString, false)).toBe(15);
  expect(countWords(fileContentAsFilePath)).toBe(58164);
});
