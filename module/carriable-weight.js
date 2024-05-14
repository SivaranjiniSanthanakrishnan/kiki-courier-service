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
