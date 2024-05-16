const { calCarriableWeights } = require("./carriable-weight");

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

    let carriableWeight = calCarriableWeights(
      packages.filter((p) => !p.time).map((p) => p.weight),
      maxCarriableWeight
    );

    // Packages to deliver is chosed from the packages for which time has not been updated
    let packagesToDeliver = packages.filter((p) => {
      let index = carriableWeight.findIndex((w) => w === p.weight && !p.time);
      if (index !== -1) {
        carriableWeight.splice(index, index + 1);
        return true;
      }
    });

    if (packagesToDeliver.length === 0 && packagesRemaining > 0) {
      return [{ error: "NO_FIT" }];
    }
    let maxReturnTime = 0;
    packagesRemaining = packagesRemaining - packagesToDeliver.length;

    // "Time" property is calculated and updated in packages obj itself
    packagesToDeliver.forEach((p) => {
      packages[packages.indexOf(p)].time =
        Math.trunc((Number(minVehicleTime) + p.distance / maxSpeed) * 100) /
        100;
      if (p.time > maxReturnTime) maxReturnTime = p.time;
    });

    // Vehicle's return time is updated by calculating 2 * deliverytime
    vehicles[minVehicleKey] =
      Number(vehicles[minVehicleKey]) + (maxReturnTime * 2).toFixed(2);
  }
  return packages;
};
