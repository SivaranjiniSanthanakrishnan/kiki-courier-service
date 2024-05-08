exports.OFFERS = {
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
};
