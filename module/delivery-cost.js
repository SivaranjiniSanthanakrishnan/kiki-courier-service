exports.calculateDeliveryCost = (baseDeliveryCost, weight, distance) => {
  return baseDeliveryCost + weight * 10 + distance * 5;
};
