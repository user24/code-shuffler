// Define possible operations
// If you have domain-specific knowledge, you can make these quite complex
// for instance if you know the calculation `input = 52 / input % 24` is involved
// you don't need to break that up. Though you might want to throw in some variations.
const operations = [
  input => Math.sqrt(input),
  input => Math.pow(input, 2),
  input => Math.pow(input, 3),
  input => Math.PI * input,
  input => input ^ 2,
  input => input / 2,
  input => input * 2,
  input => input + 1,
  input => input - 1,
  input => Math.abs(input),
  input => Math.round(input),
  input => Math.floor(input),
  input => Math.ceil(input),
];

module.exports = operations;