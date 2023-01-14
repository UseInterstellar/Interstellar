export const round = (num, precision = 2) => {
  if (isNaN(num)) {
    return 0;
  }
  let p = 1;
  while (precision-- > 0) p *= 10;

  // epsilon correction
  const c = 0.5 * Number.EPSILON * num;
  return Math.round((num + c) * p) / p;
}
