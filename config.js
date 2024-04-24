// config.js

// List of valid product keys
const validProductKeys = [
  'KEY1',
  'KEY2',
  'KEY3'
];

// Function to check if a product key is valid
function isValidProductKey(key) {
  return validProductKeys.includes(key);
}

module.exports = {
  isValidProductKey
};
