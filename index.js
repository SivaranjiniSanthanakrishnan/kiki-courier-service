const { createInterface } = require("readline");
const { OFFERS } = require("./module/offers");
const {
  calculateDeliveryCost,
  calculateDeliveryTime,
  calculateDiscount,
} = require("./module/helper");

const rl = createInterface({ input: process.stdin, output: process.stdout });
const getUserInput = () => new Promise((resolve) => rl.question("", resolve));

(async function () {
  console.log("**** Welcome to Kiki Courier Service ****");

  const input = await getUserInput();
  const [baseDeliveryCost, totalPackages] = input.split(" ").map(Number);
  if (isNaN(baseDeliveryCost) || isNaN(totalPackages) || !totalPackages) {
    console.log("Invalid input provided. Please try again!");
    return rl.close();
  }

  let packages = [];
  for (let i = 0; i < totalPackages; i++) {
    const data = await getUserInput();
    let [name, weight, distance, offerCode] = data.split(" ");
    weight = Number(weight);
    distance = Number(distance);
    if (
      !name ||
      isNaN(weight) ||
      !weight ||
      isNaN(distance) ||
      !distance ||
      !offerCode
    ) {
      console.log("Invalid input provided. Please try again!");
      return rl.close();
    }

    if (packages.some((e) => e.name === name)) {
      console.log("Package already provided!");
      return rl.close();
    }

    const totalCost = calculateDeliveryCost(baseDeliveryCost, weight, distance);
    const discount = Number(
      totalCost *
        calculateDiscount(OFFERS, offerCode, { distance, weight }).toFixed(2)
    );
    packages.push({
      name,
      weight,
      distance,
      offerCode,
      discount,
      totalCost: totalCost - discount,
    });
  }

  const vehicleInput = await getUserInput();
  rl.close();

  const [noOfVehicles, maxSpeed, maxCarriableWeight] = vehicleInput
    .split(" ")
    .map(Number);
  if (
    isNaN(noOfVehicles) ||
    !noOfVehicles ||
    isNaN(maxSpeed) ||
    !maxSpeed ||
    isNaN(maxCarriableWeight) ||
    !maxCarriableWeight
  ) {
    console.log("Invalid input provided. Please try again!");
    return;
  }

  calculateDeliveryTime(packages, {
    noOfVehicles,
    maxSpeed,
    maxCarriableWeight,
  }).forEach((p) =>
    console.log(`${p.name} ${p.discount} ${p.totalCost} ${p.time}`)
  );
})();
