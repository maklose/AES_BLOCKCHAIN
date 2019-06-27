const Tx = require('ethereumjs-tx');

//Callback handling of sent transaction
var handleReceipt = (error, receipt) => {
  if (error) console.error(error);
  else {
    console.log(receipt);
    //res.json(receipt);
  }
}

//Declaration of single variables for Raw Transaction Data
var iGasPrice;
var iGasLimit;
var iToAdress;
var iValue;
var iData;           //important for function argument & function selector
var iPrivateKey;


//testing: Test Data initialization within coding
iGasPrice = 20000000000;
iGasLimit = 6721975;
iPrivateKey = '8e9b1bc69ddf2feb5fb710bd863b84fbd218e17bbc39459b7ebcc064041e6fbd';
iToAdress = '0x5ac12B90f9a6653eE7EdE68c78133B79B67a057C';
iValue = 1;
iData = 'hier sind ein paar input data';


//testing: Show Output in Console
const hexGasPrice = web3.utils.toHex(iGasPrice.toString());
const hexGasLimit = web3.utils.toHex(iGasLimit.toString());
const value = web3.utils.toHex(web3.utils.toWei(iValue.toString(), "ether"));
const data = web3.utils.toHex(iData);
console.log("Output Transaction values:");
console.log("");
console.log("HexGasPrice: " + hexGasPrice);
console.log("hexGasLimit: " + hexGasLimit);
console.log("Value: " + value);
console.log("Data: " + data);
console.log("");


//To-Do: nonce kalkulieren
//var nonce = web3.utils.toHex(11);
var iNonceValue = web3.utils.toHex(4);
console.log("Nonce value: " + iNonceValue);
//To-Do: GasPrice abfragen


//Create Transaction Object with raw data
var rawTx = {
  nonce:      "0x" + iNonceValue,
  gasPrice:   web3.utils.toHex(iGasPrice.toString()),
  gasLimit:   web3.utils.toHex(iGasLimit.toString()),
  to:         iToAdress,
  value:      value,
  data:       data
};

//digital signature
var privateKey = new Buffer(iPrivateKey, 'hex');
const tx = new Tx(rawTx);
tx.sign(privateKey);

//send signed Transaction to Blockchain
const serializedTx = tx.serialize();
console.log('0x' + serializedTx.toString('hex'));
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), handleReceipt);

