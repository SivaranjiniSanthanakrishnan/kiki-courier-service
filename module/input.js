const { isValid } = require("./validate-input");
const { calculateDeliveryCost } = require("./delivery-cost");
const { calculateDeliveryTime } = require("./delivery-time");
const { calculateDiscount } = require("./discount");
const { OFFERS } = require("./offers");
const { getUserInput } = require("./user-input");
const { rl } = require("./user-input");

exports.getInput = async () => {
  console.log("**** Welcome to Kiki Courier Service ****");
  const input = await getUserInput();
  const [baseDeliveryCost, totalPackages] = input.split(" ").map(Number);
  if (isValid(baseDeliveryCost, totalPackages)) return rl.close();

  let packages = [];
  for (let i = 0; i < totalPackages; i++) {
    const data = await getUserInput();
    let [name, weight, distance, offerCode] = data.split(" ");
    weight = Number(weight);
    distance = Number(distance);

    if (isValid(weight, distance)) return rl.close();
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

  if (isValid(noOfVehicles, maxSpeed, maxCarriableWeight)) return rl.close();

  calculateDeliveryTime(packages, {
    noOfVehicles,
    maxSpeed,
    maxCarriableWeight,
  }).forEach((p) =>
    console.log(
      `${
        p.error
          ? "Vehicle weight doesn't fit for any package"
          : `${p.name} ${p.discount} ${p.totalCost} ${p.time}`
      } `
    )
  );
};
