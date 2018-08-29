export function pickRandomlyFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function pickRandomArrayIndex(array) {
  return Math.floor(Math.random() * array.length);
}

export function intBetweenInclusive(low, high) {
  return Math.floor(Math.random() * (high - low + 1)) + low;
}
