## WC Clone

Inspired by John Crickett's Coding Challenge series, this challenge is to build my own version of the Unix command line tool wc!

The Unix command line tools are a great metaphor for good software engineering and they follow the Unix Philosophies of:

- Writing simple parts connected by clean interfaces - each tool does just one thing and provides a simple CLI that handles text input from either files or file streams.
- Design programs to be connected to other programs - each tool can be easily connected to other tools to create incredibly powerful compositions.
- Following these philosophies has made the simple unix command line tools some of the most widely used software engineering tools - allowing us to create very complex text data processing pipelines from simple command line tools.

#### Usage

Using the CLI is pretty straightforward. To execute the CLI, run the following command:

```bash
node ccwc.js -c test.txt
```

This will print out the number of bytes in the file `test.txt`. The supported flags are:

- `-c` - print the byte size of the file.
- `-l` - print the number of lines in the file.
- `-w` - print the number of words in the file.
- `-m` - print the number of characters in the file, taking the locale into consideration.

You can also run the CLI by piping the contents of a file. For example,

```bash
cat test.txt | node ccwc.js -l
```

will print out the number of lines in the file `test.txt`
