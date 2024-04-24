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

// Example usage
const config = require('./config.js');

const productKey = 'KEY1'; // Product key provided by the user

if (config.isValidProductKey(productKey)) {
  // Product key is valid, allow access
  console.log('Access granted!');
} else {
  // Product key is invalid, deny access
  console.log('Access denied!');
}
