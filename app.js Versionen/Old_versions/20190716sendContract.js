const Tx = require('ethereumjs-tx');
var fs = require('fs'); //reading/writing JSON files
const web3Abi = require('web3-eth-abi');

var handleReceipt = (error, receipt) => {
  if (error) console.error(error);
  else {
    console.log(receipt);
    //res.json(receipt);
  }
}

function changeToAddr(ToAddr) {
  ToAddress = ToAddr;
}

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while (d2 - d < ms);
}

function sendSignedTxToBlockchain(GasPrice, GasLimit, PrivateKey, FromAddress, ToAddress, EthValue, Data) {

  //prepare values to Hex Code
  value = web3.utils.toHex(web3.utils.toWei(EthValue.toString(), "ether"));

  //1st Calculate Nonce:
  web3.eth.getTransactionCount(FromAddress, 'pending', (err, txCount) => {
    txCount = txCount + zaehler;
    zaehler = zaehler + 1;
    //Estimate Gas Price
    web3.eth.estimateGas({ to: ToAddress, data: Data },
      (err, gasEstimate) => {
        //testing: Show Output in Console
        console.log("Output Transaction values:");
        console.log("");
        console.log("ToAddress: " + ToAddress);
        console.log("GasEstimate: " + gasEstimate);
        console.log("iGasPrice: " + iGasPrice)
        console.log("hexGasLimit: " + GasLimit);
        console.log("Value: " + value);
        console.log("Nonce value: " + txCount);
        console.log("Data: " + Data);
        console.log("");

        //Create Transaction Object with raw data
        rawTx = {
          nonce: web3.utils.toHex(txCount),
          gasPrice: web3.utils.toHex(GasPrice.toString()),
          gasLimit: web3.utils.toHex(GasLimit.toString()),
          to: ToAddress,
          value: value,
          data: Data
        };

        //digital signature
        privateKey = new Buffer(PrivateKey, 'hex');
        tx = new Tx(rawTx);
        tx.sign(privateKey);

        //send signed Transaction to Blockchain
        serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), handleReceipt);
      })
  });
}

var filePathNewSC = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_SAP/newSC_Address.json';
var filePathCreateSC = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/CreateMaintContract.json';
var value = web3.utils.toHex(web3.utils.toWei("2", "ether"));
var GasPrice = 9999999999999;
var iGasPrice = 50000;
var GasLimit = 1500000;
var FromAddress;
var ToAddress = '';
var PrivateKey;
var iData;
var zaehler = 0;
var contractPartner;
var iValue = 0;
var jsonInput;
var MaintenanceCost;
var CounterLimitHours;

//AES Smart Contract
var CaDABI = [{ "constant": true, "inputs": [], "name": "getBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getContractPartner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "input", "type": "uint256" }], "name": "increase", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getContractAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getContractOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "input", "type": "address" }], "name": "setContractPartner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "input", "type": "uint256" }], "name": "setCounterLimit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "checkCounterLimit", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCounterLimit", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
var CaDBytecode = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610840806100606000396000f3fe60806040526004361061009e576000357c01000000000000000000000000000000000000000000000000000000009004806312065fe0146100a35780632ee2a7af146100ce57806330f3f0db1461012557806332a2c5d014610153578063442890d5146101aa5780637cdacb9814610201578063992ebc5214610252578063a87d942c1461028d578063a9e0f3ed146102b8578063bdba9255146102e7575b600080fd5b3480156100af57600080fd5b506100b8610312565b6040518082815260200191505060405180910390f35b3480156100da57600080fd5b506100e361037a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101516004803603602081101561013b57600080fd5b81019080803590602001909291905050506103ff565b005b34801561015f57600080fd5b50610168610539565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101b657600080fd5b506101bf61059c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561020d57600080fd5b506102506004803603602081101561022457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610620565b005b34801561025e57600080fd5b5061028b6004803603602081101561027557600080fd5b81019080803590602001909291905050506106bf565b005b34801561029957600080fd5b506102a2610724565b6040518082815260200191505060405180910390f35b3480156102c457600080fd5b506102cd61078c565b604051808215151515815260200191505060405180910390f35b3480156102f357600080fd5b506102fc61080a565b6040518082815260200191505060405180910390f35b6000600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103d757600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561045a57600080fd5b80600460008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555034600360008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561059657600080fd5b30905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105f957600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561067b57600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561071a57600080fd5b8060058190555050565b6000600460008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b6000600554600460008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015156108025760019050610807565b600090505b90565b600060055490509056fea165627a7a7230582034f46e61c84b17e7e8b82a49a4a40c071cce47f55aa96ff02962c1e7ae6efb610029";
var Data = "0x" + CaDBytecode;


//Read JSON File and fill into variables oben!!
jsonInput           = require(filePathCreateSC);
FromAddress         = jsonInput.NewContract.Machine_Wallet;
PrivateKey          = jsonInput.NewContract.PrivateKey_Machine_W;
contractPartner     = jsonInput.NewContract.CP_Wallet;
MaintenanceCost     = jsonInput.NewContract.MaintenanceCost;
CounterLimitHours   = jsonInput.NewContract.CounterLimitHours;


//1st Calculate Nonce:
web3.eth.getTransactionCount(FromAddress, 'pending', (err, txCount) => {
  //Estimate Gas Price
  web3.eth.estimateGas({ to: contractPartner, data: Data },
    (err, gasEstimate) => {

      //Create Transaction Object with raw data
      var rawTx = {
        nonce: web3.utils.toHex(txCount),
        gasPrice: web3.utils.toHex(GasPrice.toString()),
        gasLimit: web3.utils.toHex(GasLimit.toString()),
        data: Data
      };

      //digital signature
      var privateKey = new Buffer(PrivateKey, 'hex');
      var tx = new Tx(rawTx);
      tx.sign(privateKey);

      //send signed Transaction to Blockchain
      var serializedTx = tx.serialize();
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
        if (err) {
          console.log(err); return;
        }

        // Log the tx, you can explore status manually with eth.getTransaction()
        console.log('Contract creation tx: ' + hash);
        // Wait for the transaction to be mined

        wait(4000);
        web3.eth.getTransactionReceipt(hash, (err, receipt) => {
          console.log("cAddr: " + receipt.contractAddress);
          var json = '{ "SC_Address": "' + receipt.contractAddress + '" }';
          fs.writeFile(filePathNewSC,
            json, 'utf8', function (err) { if (err) throw err; console.log('complete'); });

 
            
  //Hier ist er zu langsam!!!
          ToAddress = receipt.contractAddress;

          console.log('wait 10sec');
          wait(10000);
          console.log('To-Address: ' + ToAddress);

          //Define ContractPartner
          iData = web3.eth.abi.encodeFunctionCall({
            name: 'setContractPartner', type: 'function',
            inputs: [{ type: 'address', name: 'input' }]
          }, [contractPartner]);
          wait(2000);
          sendSignedTxToBlockchain(iGasPrice, GasLimit, PrivateKey, FromAddress, ToAddress,
            iValue, iData);

          //Define CounterLimit
          wait(2000);
          iData = "";
          iData = web3.eth.abi.encodeFunctionCall({
            name: 'setCounterLimit', type: 'function',
            inputs: [{ type: 'uint256', name: 'input' }]
          }, [CounterLimitHours])});

        wait(2000);
        sendSignedTxToBlockchain(iGasPrice, GasLimit, PrivateKey, FromAddress, ToAddress,
          iValue, iData);


        wait(2000);
        //4. MoneyLimit (warten auf Smart Contract) - Geld, das eine Wartung kostet
      //variable: MaintenanceCost
        sendSignedTxToBlockchain(iGasPrice, GasLimit, PrivateKey, FromAddress, ToAddress,
          iValue, iData);


        });
    });
});
