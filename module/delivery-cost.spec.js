const { calculateDeliveryCost } = require("./delivery-cost");

describe("test cases for Calculate Delivery Cost module", () => {
  test("General scenario with all values filled", () => {
    expect(calculateDeliveryCost(100, 15, 5)).toStrictEqual(
      100 + 15 * 10 + 5 * 5
    );
  });
  test("Weights in decimal", () => {
    expect(calculateDeliveryCost(150, 101.3, 103)).toStrictEqual(
      150 + 101.3 * 10 + 103 * 5
    );
  });
  test("Base case with all values filled", () => {
    expect(calculateDeliveryCost(189, 70, 199)).toStrictEqual(
      189 + 70 * 10 + 199 * 5
    );
  });
  test("Base case with extra params passed", () => {
    expect(calculateDeliveryCost(600, 10, 161, "OFR003")).toStrictEqual(
      600 + 10 * 10 + 161 * 5
    );
  });
  test("Base case with all zeros", () => {
    expect(calculateDeliveryCost(0, 0, 0)).toBe(0);
  });

  test("Base delivery cost only", () => {
    expect(calculateDeliveryCost(100, 0, 0)).toBe(100);
  });

  test("Weight only", () => {
    expect(calculateDeliveryCost(0, 10, 0)).toBe(100);
  });

  test("Distance only", () => {
    expect(calculateDeliveryCost(0, 0, 10)).toBe(50);
  });

  test("High values for base delivery cost, weight, and distance", () => {
    expect(calculateDeliveryCost(1000, 100, 200)).toBe(
      1000 + 100 * 10 + 200 * 5
    );
  });

  test("Negative values for weight and distance", () => {
    expect(calculateDeliveryCost(100, -10, -20)).toBe(100 + -10 * 10 + -20 * 5);
  });

  test("Zero base delivery cost with positive weight and distance", () => {
    expect(calculateDeliveryCost(0, 10, 20)).toBe(10 * 10 + 20 * 5);
  });

  test("Large positive values for all parameters", () => {
    expect(calculateDeliveryCost(1000000, 1000000, 1000000)).toBe(16000000);
  });
});
