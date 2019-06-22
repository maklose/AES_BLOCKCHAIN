const NewCounter = artifacts.require("NewCounter");

module.exports = function(deployer) {
  deployer.deploy(NewCounter);
};