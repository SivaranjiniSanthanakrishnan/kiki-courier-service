exports.calculateDeliveryCost = (baseDeliveryCost, weight, distance) => {
  return baseDeliveryCost + weight * 10 + distance * 5;
};

exports.calculateDeliveryTime = (
  packages,
  { noOfVehicles, maxSpeed, maxCarriableWeight }
) => {
  let vehicles = {};
  // Create vehicle object and assign key value pair for each no of vehicle
  for (let i = 0; i < noOfVehicles; i++) {
    vehicles[`V${i + 1}`] = 0;
  }

  let packagesRemaining = packages.length;

  // Once package remaining is 0 it is considered that all packages are updated with time
  while (packagesRemaining > 0) {
    // Find the minimum time from the available vehicles. The min timed vehicle will be available to carry next package
    const [minVehicleKey, minVehicleTime] = Object.entries(vehicles).reduce(
      ([minVehicleName, minVehicleTime], [key, value]) =>
        value < minVehicleTime
          ? [key, value]
          : [minVehicleName, minVehicleTime],
      ["V1", vehicles["V1"]]
    );

    // Packages to deliver is chosed from the packages for which time has not been updated
    let packagesToDeliver = packages.filter((p) =>
      this.calCarriableWeights(
        packages.filter((p) => !p.time).map((p) => p.weight),
        maxCarriableWeight
      ).includes(p.weight)
    );

    let maxReturnTime = 0;

    // "Time" property is calculated and updated in packages obj itself
    packagesToDeliver.forEach((p) => {
      packages[packages.indexOf(p)].time =
        Math.trunc((Number(minVehicleTime) + p.distance / maxSpeed) * 100) /
        100;
      if (p.time > maxReturnTime) maxReturnTime = p.time;
      // Once package is assigned it is reduced
      packagesRemaining--;
    });

    // Vehicle's return time is updated by calculating 2 * deliverytime
    vehicles[minVehicleKey] =
      Number(vehicles[minVehicleKey]) + (maxReturnTime * 2).toFixed(2);
  }
  return packages;
};

exports.calculateDiscount = (offersAvailable, offerCode, criteria) => {
  const offerApplied = offersAvailable[offerCode];
  if (!offerApplied) return 0;
  let appliedOfferKeys = Object.keys(offerApplied.criteria);

  // Map all the user provided criteria with the available criteria from JSON and eval the criterias
  return !appliedOfferKeys.every((value) =>
    Object.keys(criteria).includes(value)
  )
    ? 0
    : appliedOfferKeys
        .map((c) => {
          return offerApplied.criteria[c].map((val) => {
            return eval(`${criteria[c]} ${val}`);
          });
        })
        .every((v) => v.every((v) => v))
    ? offerApplied.discountInPercentile / 100
    : 0;
};

exports.calCarriableWeights = (weights, maxCarriableWeight) => {
  const dp = Array(maxCarriableWeight + 1).fill(null);
  dp[0] = [];

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    for (let j = maxCarriableWeight; j >= weight; j--) {
      if (dp[j - weight] !== null) {
        if (dp[j] === null || weight > dp[j][0]) {
          dp[j] = [weight, ...dp[j - weight]];
        }
      }
    }
  }

  let max = 0;
  for (let i = maxCarriableWeight; i >= 0; i--) {
    if (dp[i] !== null) {
      max = Math.max(max, dp[i][0]);
      if (dp[i][0] === max) {
        return dp[i];
      }
    }
  }

  return [];
};
