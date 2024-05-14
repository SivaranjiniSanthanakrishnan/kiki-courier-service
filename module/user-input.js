const { createInterface } = require("readline");

exports.rl = createInterface({ input: process.stdin, output: process.stdout });

exports.getUserInput = () => {
  return new Promise((resolve) => this.rl.question("", resolve));
};
