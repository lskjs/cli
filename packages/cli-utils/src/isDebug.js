const isDebug = () => process.env.DEBUG || process.env.USER === "isuvorov";

module.exports = {
  isDebug,
};
