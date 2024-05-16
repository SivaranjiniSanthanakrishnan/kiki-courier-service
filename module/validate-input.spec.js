const { isValid } = require("./validate-input");

describe("isValid", () => {
  test("Returns false when all inputs are valid", () => {
    expect(isValid(1, 2, 3)).toBe(false);
  });

  test("Returns true and logs error message when some inputs are invalid", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    expect(isValid(1, "a", 3)).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Invalid input provided. Please try again!"
    );
    consoleSpy.mockRestore();
  });

  test("Returns true and logs error message when all inputs are invalid", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    expect(isValid("a", "b", "c")).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Invalid input provided. Please try again!"
    );
    consoleSpy.mockRestore();
  });
});
