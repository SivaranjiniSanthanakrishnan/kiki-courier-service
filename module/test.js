const {
  calculateDiscount,
  calCarriableWeights,
  calculateDeliveryCost,
  calculateDeliveryTime,
} = require("./helper");

describe("test module Discount Offer", () => {
  let offerAvailable = {
    OFR001: {
      discountInPercentile: 10,
      criteria: {
        weight: [">=70", "<=200"],
        distance: ["<200"],
      },
    },
    OFR002: {
      discountInPercentile: 7,
      criteria: {
        weight: [">=100", "<=250"],
        distance: [">=50", "<=150"],
      },
    },
    OFR003: {
      discountInPercentile: 5,
      criteria: {
        weight: [">=10", "<=150"],
        distance: [">=50", "<=250"],
      },
    },
    OFR004: {
      discountInPercentile: 4,
      criteria: {
        weight: [">=10", "<=150"],
        distance: [">=50", "<=250"],
        height: [">=50", "<=100"],
      },
    },
    OFR005: {
      discountInPercentile: 9,
      criteria: {
        distance: [">=70", "<=150"],
      },
    },
    OFR006: {
      discountInPercentile: 3,
      criteria: {
        weight: [">=70", "<=190"],
      },
    },
  };
  test("Test with offer code OFR001", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR001", { weight: 5, distance: 175 })
    ).toBe(0);
  });
  test("Test with offer code OFR001", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR001", { weight: 70, distance: 199 })
    ).toBe(0.1);
  });
  test("Test with offer code OFR002", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR002", { weight: 15, distance: 5 })
    ).toBe(0);
  });
  test("Test with offer code OFR002", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR002", {
        weight: 110,
        distance: 102,
      })
    ).toBe(0.07);
  });
  test("Test with offer code OFR003", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR003", { weight: 70, distance: 60 })
    ).toBe(0.05);
  });
  test("Test with offer code OFR003", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR003", { weight: 5, distance: 100 })
    ).toBe(0);
  });
  test("Test with offer code OFR004", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR004", {
        weight: 10,
        distance: 100,
        height: 60,
      })
    ).toBe(0.04);
  });
  test("Test with offer code OFR005", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR005", { weight: 10, distance: 100 })
    ).toBe(0.09);
  });
  test("Test with offer code OFR006", () => {
    expect(
      calculateDiscount(offerAvailable, "OFR006", { weight: 70, distance: 100 })
    ).toBe(0.03);
  });
});

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

describe("test module Calculate Delivery Cost", () => {
  test("calculateDeliveryTime with three packages", () => {
    let responseTime = [0.07, 0.07, 1.42];
    let response = calculateDeliveryTime(
      [
        {
          weight: 5,
          distance: 5,
        },
        {
          weight: 15,
          distance: 5,
        },
        {
          weight: 10,
          distance: 100,
        },
      ],
      { noOfVehicles: 2, maxSpeed: 70, maxCarriableWeight: 200 }
    );
    expect(
      response
        .map(
          (p, i) =>
            JSON.stringify(p) ===
            JSON.stringify({ ...p, time: responseTime[i] })
        )
        .filter((p) => !p).length
    ).toBe(0);
  });

  test("CalculateDeliveryTime with five packages", () => {
    let responseTime = [3.98, 1.78, 1.42, 0.85, 4.19];
    let response = calculateDeliveryTime(
      [
        {
          weight: 50,
          distance: 30,
        },
        {
          weight: 75,
          distance: 125,
        },
        {
          weight: 175,
          distance: 100,
        },
        {
          weight: 110,
          distance: 60,
        },
        {
          weight: 155,
          distance: 95,
        },
      ],
      { noOfVehicles: 2, maxSpeed: 70, maxCarriableWeight: 200 }
    );
    expect(
      response
        .map(
          (p, i) =>
            JSON.stringify(p) ===
            JSON.stringify({ ...p, time: responseTime[i] })
        )
        .filter((p) => !p).length
    ).toBe(0);
  });
});
