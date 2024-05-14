const { calCarriableWeights } = require("./carriable-weight");

describe("test module Calculate CarriableWeights", () => {
  test("test min carriable weight", () => {
    expect(calCarriableWeights([10, 30, 40, 10], 20)).toStrictEqual([10, 10]);
  });
  test("test min carriable weight", () => {
    expect(calCarriableWeights([10, 30, 40], 55)).toStrictEqual([40, 10]);
  });
  test("test min carriable weight", () => {
    expect(calCarriableWeights([10, 30, 40], 5)).toStrictEqual([]);
  });
});
