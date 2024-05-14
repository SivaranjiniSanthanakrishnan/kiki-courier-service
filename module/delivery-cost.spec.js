const { calculateDeliveryCost } = require("./delivery-cost");

describe("test module Calculate Delivery Cost", () => {
  test("calculate delivery cost", () => {
    expect(calculateDeliveryCost(100, 15, 5)).toStrictEqual(275);
  });
  test("calculate delivery cost", () => {
    expect(calculateDeliveryCost(150, 101.3, 103)).toStrictEqual(1678);
  });
  test("calculate delivery cost", () => {
    expect(calculateDeliveryCost(189, 70, 199)).toStrictEqual(1884);
  });
  test("calculate delivery cost", () => {
    expect(calculateDeliveryCost(600, 10, 161, "OFR003")).toStrictEqual(1505);
  });
});
