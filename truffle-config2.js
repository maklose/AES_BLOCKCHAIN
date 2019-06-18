const HDWalletProvider = require("truffle-hdwallet-provider");
 
const mnemonic = "false region usage mosquito cushion leisure final tool bottom major bamboo mind";
 
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8550,
      network_id: "2" // Match any network id
    },
ropsten: {
  provider: function() {
    return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/ff67e50923e749d9b8778a98dbcd780e")
  },
  network_id: 3
}   
}
};
