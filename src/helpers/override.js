/*
 * func
 * @param {number} fx
 * @param {number} override
 * @returns {boolean}
 */
export const shouldDisableOverride = (fx, override) => {
  const diff = Math.abs(fx - override);

  const fx_two_perfect = (fx * 2) / 100;

  return diff > fx_two_perfect;
};
