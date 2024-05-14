exports.isValid = (...input) => {
  let invalidInput = input.some((i) => isNaN(i) || i === 0);
  if (invalidInput) {
    console.log("Invalid input provided. Please try again!");
  }
  return invalidInput;
};
