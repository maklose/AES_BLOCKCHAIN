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
iGasPrice = 60000;
iGasLimit = 50000;
iPrivateKey = '15EF5EB48D8D1A514C7C392483209ADBF737E45ADB962633240437BFB9352231';
iToAdress = '0x3eC7ef9696d5bbedFf3688Cc76bc3e05A06c7E55';
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


//--> jedes mal neu einstellen:
var nonce = web3.utils.toHex(4);

//Create Transaction Object with raw data
var rawTx = {
  nonce:      nonce,
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

