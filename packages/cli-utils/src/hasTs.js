const glob = require("glob");

const hasTs = () => {
  const list = glob.sync("src/**/**.ts");
  return !!list;
};

module.exports = {
  hasTs,
};
