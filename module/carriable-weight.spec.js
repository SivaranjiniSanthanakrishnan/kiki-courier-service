const { calCarriableWeights } = require("./carriable-weight");

describe("test module Calculate CarriableWeights", () => {
  test("No weights and zero max carriable weight", () => {
    expect(calCarriableWeights([], 0)).toEqual([]);
  });
  test("Single weight exactly equal to max carriable weight", () => {
    expect(calCarriableWeights([10], 10)).toEqual([10]);
  });
  test("Single weight less than max carriable weight", () => {
    expect(calCarriableWeights([5], 10)).toEqual([5]);
  });
  test("Single weight greater than max carriable weight", () => {
    expect(calCarriableWeights([15], 10)).toEqual([]);
  });
  test("Multiple weights where no combination matches max carriable weight", () => {
    expect(calCarriableWeights([1, 2, 3], 10)).toEqual([3, 2, 1]);
  });
  test("Multiple weights where one combination matches max carriable weight", () => {
    expect(calCarriableWeights([2, 5, 8], 10)).toEqual([8, 2]);
  });
  test("Multiple weights where exact match is not possible, but closest match is found", () => {
    expect(calCarriableWeights([1, 3, 4, 6], 7)).toEqual([6, 1]);
  });
  test("Weights including zero", () => {
    expect(calCarriableWeights([0, 5, 10], 10)).toEqual([10]);
  });
  test("Duplicate weights", () => {
    expect(calCarriableWeights([2, 2, 3, 3], 5)).toEqual([3, 2]);
  });
  test("Large number of weights", () => {
    expect(
      calCarriableWeights(
        Array.from({ length: 1000 }, (_, i) => i + 1),
        100
      )
    ).toEqual([100]);
  });
  test("Compare Huge number in array with single value", () => {
    expect(
      calCarriableWeights(
        [87182936721542678696554357896543678456879789654367],
        5
      )
    ).toStrictEqual([]);
  });
  test("Test with same weight", () => {
    expect(calCarriableWeights([871829], 871829)).toStrictEqual([871829]);
  });
});
