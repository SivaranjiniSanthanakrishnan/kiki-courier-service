const { calculateDeliveryTime } = require("./delivery-time");
const { calCarriableWeights } = require("./carriable-weight");

jest.mock("./carriable-weight");

describe("calculateDeliveryTime Edge Cases", () => {
  beforeEach(() => {
    calCarriableWeights.mockClear();
  });

  test("Single package exceeding weight limit", () => {
    const packages = [{ id: "P1", weight: 150, distance: 100, time: 0 }];
    const config = {
      noOfVehicles: 1,
      maxSpeed: 60,
      maxCarriableWeight: 100,
    };
    calCarriableWeights.mockReturnValue([]);
    const result = calculateDeliveryTime(packages, config);
    expect(calCarriableWeights).toHaveBeenCalledWith([150], 100);
    expect(result).toEqual([{ error: "NO_FIT" }]);
  });

  test("No packages", () => {
    const packages = [];
    const config = {
      noOfVehicles: 2,
      maxSpeed: 60,
      maxCarriableWeight: 100,
    };
    const result = calculateDeliveryTime(packages, config);
    expect(result).toEqual([]);
  });

  test("Single package within weight limit", () => {
    const packages = [{ id: "P1", weight: 50, distance: 100, time: 0 }];
    const config = {
      noOfVehicles: 1,
      maxSpeed: 60,
      maxCarriableWeight: 100,
    };
    calCarriableWeights.mockReturnValue([50]);
    const result = calculateDeliveryTime(packages, config);
    expect(calCarriableWeights).toHaveBeenCalledWith([50], 100);
    expect(result).toEqual([
      { id: "P1", weight: 50, distance: 100, time: 1.66 },
    ]);
  });

  test("Multiple packages within weight limit", () => {
    const packages = [
      { id: "P1", weight: 50, distance: 100, time: 0 },
      { id: "P2", weight: 50, distance: 200, time: 0 },
    ];
    const config = {
      noOfVehicles: 1,
      maxSpeed: 60,
      maxCarriableWeight: 100,
    };
    calCarriableWeights.mockReturnValue([50, 50]);
    const result = calculateDeliveryTime(packages, config);
    expect(result).toEqual([
      { id: "P1", weight: 50, distance: 100, time: 1.66 },
      { id: "P2", weight: 50, distance: 200, time: 3.33 },
    ]);
  });

  test("Multiple packages exceeding weight limit", () => {
    const packages = [
      { id: "P1", weight: 60, distance: 100, time: 0 },
      { id: "P2", weight: 70, distance: 200, time: 0 },
    ];
    const config = {
      noOfVehicles: 1,
      maxSpeed: 60,
      maxCarriableWeight: 100,
    };
    calCarriableWeights.mockReturnValueOnce([70]).mockReturnValueOnce([60]);

    const result = calculateDeliveryTime(packages, config);
    expect(result).toEqual([
      { id: "P1", weight: 60, distance: 100, time: 8.32 },
      { id: "P2", weight: 70, distance: 200, time: 3.33 },
    ]);
    expect(calCarriableWeights).toHaveBeenCalledTimes(2);
    expect(calCarriableWeights).toHaveBeenCalledWith([60, 70], 100);
    expect(calCarriableWeights).toHaveBeenCalledWith([60], 100);
  });

  test("Multiple vehicles handling multiple packages", () => {
    const packages = [
      { id: "P1", weight: 50, distance: 100, time: 0 },
      { id: "P2", weight: 50, distance: 200, time: 0 },
      { id: "P3", weight: 50, distance: 300, time: 0 },
    ];
    const config = {
      noOfVehicles: 2,
      maxSpeed: 60,
      maxCarriableWeight: 100,
    };
    calCarriableWeights.mockReturnValueOnce([50, 50]).mockReturnValueOnce([50]);

    const result = calculateDeliveryTime(packages, config);
    expect(result).toEqual([
      { id: "P1", weight: 50, distance: 100, time: 1.66 },
      { id: "P2", weight: 50, distance: 200, time: 3.33 },
      { id: "P3", weight: 50, distance: 300, time: 5.0 },
    ]);
    expect(calCarriableWeights).toHaveBeenCalledTimes(2);
    expect(calCarriableWeights).toHaveBeenCalledWith([50, 50, 50], 100);
    expect(calCarriableWeights).toHaveBeenCalledWith([50], 100);
  });

  test("One of the Package weight exceeding max carriable weight", () => {
    const packages = [
      { id: "P1", weight: 100, distance: 100, time: 0 },
      { id: "P2", weight: 150, distance: 200, time: 0 },
    ];
    const config = {
      noOfVehicles: 1,
      maxSpeed: 60,
      maxCarriableWeight: 100,
    };
    calCarriableWeights.mockReturnValueOnce([100]).mockReturnValueOnce([]);
    const result = calculateDeliveryTime(packages, config);
    expect(result).toEqual([{ error: "NO_FIT" }]);
    expect(calCarriableWeights).toHaveBeenCalledTimes(2);
    expect(calCarriableWeights).toHaveBeenCalledWith([100, 150], 100);
    expect(calCarriableWeights).toHaveBeenCalledWith([150], 100);
  });
});
