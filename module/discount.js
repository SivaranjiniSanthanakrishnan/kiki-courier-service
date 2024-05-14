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
