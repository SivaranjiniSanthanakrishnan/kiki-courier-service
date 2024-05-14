const { calculateDeliveryTime } = require("./delivery-time");

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
