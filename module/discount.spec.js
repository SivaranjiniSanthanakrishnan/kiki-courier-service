const { calculateDiscount } = require("./discount");

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
