const CounterA = artifacts.require("CounterA");

module.exports = function(deployer) {
  deployer.deploy(CounterA);
};