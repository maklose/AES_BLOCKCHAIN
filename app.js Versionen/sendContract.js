//aktueller favorit
//funktioniert nach Ropsten

const Tx = require('ethereumjs-tx');
const web3Abi = require('web3-eth-abi');

var handleReceipt = (error, receipt) => {
    if (error) console.error(error);
    else {
      console.log(receipt);
      //res.json(receipt);
    }
}

var value = web3.utils.toHex(web3.utils.toWei("2", "ether"));
var GasPrice     = 9999999999999;
var GasLimit     = 1500000;
var FromAddress = "0x4a59E1612FD9EE2266E0158eE308a2D67ed85273";
var ToAddress = "0x3eC7ef9696d5bbedFf3688Cc76bc3e05A06c7E55";
var PrivateKey = "A4499D09E58AD229EA196A1F89418924872C8587116532626E4CC83A32827AAA";

//AES Smart Contract
var CaDABI = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractPartner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"input","type":"uint256"}],"name":"increase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"input","type":"address"}],"name":"setContractPartner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"input","type":"uint256"}],"name":"setCounterLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkCounterLimit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCounterLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var CaDBytecode = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610840806100606000396000f3fe60806040526004361061009e576000357c01000000000000000000000000000000000000000000000000000000009004806312065fe0146100a35780632ee2a7af146100ce57806330f3f0db1461012557806332a2c5d014610153578063442890d5146101aa5780637cdacb9814610201578063992ebc5214610252578063a87d942c1461028d578063a9e0f3ed146102b8578063bdba9255146102e7575b600080fd5b3480156100af57600080fd5b506100b8610312565b6040518082815260200191505060405180910390f35b3480156100da57600080fd5b506100e361037a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101516004803603602081101561013b57600080fd5b81019080803590602001909291905050506103ff565b005b34801561015f57600080fd5b50610168610539565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101b657600080fd5b506101bf61059c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561020d57600080fd5b506102506004803603602081101561022457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610620565b005b34801561025e57600080fd5b5061028b6004803603602081101561027557600080fd5b81019080803590602001909291905050506106bf565b005b34801561029957600080fd5b506102a2610724565b6040518082815260200191505060405180910390f35b3480156102c457600080fd5b506102cd61078c565b604051808215151515815260200191505060405180910390f35b3480156102f357600080fd5b506102fc61080a565b6040518082815260200191505060405180910390f35b6000600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103d757600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561045a57600080fd5b80600460008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555034600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561059657600080fd5b30905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105f957600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561067b57600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561071a57600080fd5b8060058190555050565b6000600460008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b6000600554600460008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015156108025760019050610807565b600090505b90565b600060055490509056fea165627a7a7230582034f46e61c84b17e7e8b82a49a4a40c071cce47f55aa96ff02962c1e7ae6efb610029";
var Data = "0x" + CaDBytecode;

//INternet SmartContract:
//var CaDABI = [{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
//var CaDBytecode = "608060405234801561001057600080fd5b50620f42406000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610252806100666000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a9059cbb14610051578063f8b2cb4f1461009e575b600080fd5b34801561005d57600080fd5b5061009c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506100f5565b005b3480156100aa57600080fd5b506100df600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101de565b6040518082815260200191505060405180910390f35b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561014257600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490509190505600a165627a7a72305820c9da07d4976adbf00a4b5fe4e23330dbaf3cdcbfd4745eed78c702bf27d944060029";


//1st Calculate Nonce:
web3.eth.getTransactionCount(FromAddress, 'pending',(err, txCount) =>
{
    //Estimate Gas Price
    web3.eth.estimateGas({ to: ToAddress, data: Data}, 
    (err, gasEstimate) => 
    {
    
    //Create Transaction Object with raw data
var rawTx = {
    nonce:      web3.utils.toHex(txCount),
    gasPrice:   web3.utils.toHex(GasPrice.toString()),
    gasLimit:   web3.utils.toHex(GasLimit.toString()),
    data:       Data
  };

  //digital signature
 var privateKey = new Buffer(PrivateKey, 'hex');
 var tx = new Tx(rawTx);
  tx.sign(privateKey);

  //send signed Transaction to Blockchain
 var serializedTx = tx.serialize();
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), handleReceipt);
      })
});


