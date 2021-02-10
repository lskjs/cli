/* eslint-disable no-console */
const { getPaths } = require("../utils");

console.log("getPaths()");
console.log(getPaths());

console.log("getPaths({ nodemodules: 1 })");
console.log(getPaths({ nodemodules: 1 }));
