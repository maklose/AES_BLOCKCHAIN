const Tx = require('ethereumjs-tx');
const web3Abi = require('web3-eth-abi');

//Callback handling of sent transaction
var handleReceipt = (error, receipt) => {
  if (error) console.error(error);
  else {
    console.log(receipt);
    //res.json(receipt);
  }
}

//--> in config packen, wichtig!
//Declaration of single variables for Raw Transaction Data
var iGasPrice;
var iGasLimit;
var iToAdress;
var iValue;
var iData;           //important for function argument & function selector
var iPrivateKey;


//PK1:1B56F03913629AD03DA312AD9438A7D119CA17AE664B5588E705CE65D1CD8FFB
//W1:0x3eC7ef9696d5bbedFf3688Cc76bc3e05A06c7E55
//PK2: 15EF5EB48D8D1A514C7C392483209ADBF737E45ADB962633240437BFB9352231
//W2: 0xF6b7Aef42305A4A24fbD28db9B7376C2267FcD3A


//testing: Test Data initialization within coding
iGasPrice = 600000000000;
iGasLimit = 5000000;
iPrivateKey = 'A4499D09E58AD229EA196A1F89418924872C8587116532626E4CC83A32827AAA';
iFromAdress = '0x4a59e1612fd9ee2266e0158ee308a2d67ed85273';
iToAdress = '0x93427e62cF6CDC9259853b075a72fe6f591d3b9C';
iValue = 0;


var iData = web3.eth.abi.encodeFunctionCall({name: 'increase', 
  type: 'function', inputs: 
  [{type: 'uint256',
    name: 'input'}]}, 
    ['6']);

var jsonInputData = require('C:/Users/demoerc/Desktop/Beispiel1.json');
console.log("W1: " + jsonInputData.Tx1.Wallet1);

//prepare values to Hex Code
const hexGasLimit = web3.utils.toHex(iGasLimit.toString());
const value = web3.utils.toHex(web3.utils.toWei(iValue.toString(), "ether"));
//const data = web3.utils.toHex(iData);


//all functions in single callback method:

//1st Calculate Nonce:
web3.eth.getTransactionCount(iFromAdress, 'pending',(err, txCount) =>
{
  //Estimate Gas Price
  web3.eth.estimateGas({ to: iToAdress, data: iData}, (err, gasEstimate) => 
  {
  //testing: Show Output in Console
  console.log("Output Transaction values:");
  console.log("");
  console.log("GasEstimate: " + gasEstimate);
  console.log("hexGasLimit: " + hexGasLimit);
  console.log("Value: " + value);
  console.log("Data: " + iData);
  console.log("Nonce value: " + txCount);
  console.log("");

//Wie hoch GasPrice & Gas Limit ansetzen?

  //Create Transaction Object with raw data
  const rawTx = {
  nonce:      web3.utils.toHex(txCount),
  gasPrice:   web3.utils.toHex(iGasPrice.toString()),
  gasLimit:   web3.utils.toHex(iGasLimit.toString()),
  to:         iToAdress,
  value:      value,
  data:       iData
};

//digital signature
var privateKey = new Buffer(iPrivateKey, 'hex');
const tx = new Tx(rawTx);
tx.sign(privateKey);

//send signed Transaction to Blockchain
const serializedTx = tx.serialize();
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), handleReceipt);
})
});

web3.eth.call({to: iToAdress, data:web3Abi.encodeFunctionSignature('getCount()')},(err, machineCounter) => {var MC = web3.utils.toDecimal(machineCounter); console.log(MC)});

//prepare json2SAP interface
var obj = {table: []};
obj.table.push({From: iFromAdress, To:iToAdress, Value: iValue});
var json = JSON.stringify(obj);
var fs = require('fs');
fs.writeFile('C:/Users/demoerc/AppData/Roaming/npm/json2SAP/myjsonfile.json', 
      json, 'utf8', function(err) { if (err) throw err; console.log('complete');});