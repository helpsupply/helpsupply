// This is a stub file which loads the "real" index in main.js
// This is required so what we can use ES6 modules with the esm
// library, because Firebase runs Node 10 without any flags
// (that would enable us to use ES6 modules)
require = require('esm')(module);
module.exports = require('./main.js');
