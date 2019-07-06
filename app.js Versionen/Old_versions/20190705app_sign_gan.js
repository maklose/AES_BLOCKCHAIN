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

var jsonInputData = require('C:/Users/demoerc/Desktop/Beispiel1.json');
console.log("W1: " + jsonInputData.Tx1.Wallet1);

//testing: Test Data initialization within coding
iGasPrice = 20000000000;
iGasLimit = 50000;
iPrivateKey = '8e9b1bc69ddf2feb5fb710bd863b84fbd218e17bbc39459b7ebcc064041e6fbd';
iFromAdress = '0xE479b7a82eb2EB5D5586d7696b8D6b29ABbC4db7'; //for getTransactionCount
iToAdress = '0xF338BAcC14357D20DE065C7d88A5806FeA6df163';
iValue = 1;
iData = 'hier sind ein paar input dataasdfasdfasdfasdfaserwearawerfgdafgdsf';

//prepare values to Hex Code
const hexGasLimit = web3.utils.toHex(iGasLimit.toString());
const value = web3.utils.toHex(web3.utils.toWei(iValue.toString(), "ether"));
const data = web3.utils.toHex(iData);


//all functions in single callback method:

//1st Calculate Nonce:
web3.eth.getTransactionCount(iFromAdress, 'pending',(err, txCount) =>
{
  //Estimate Gas Price
  web3.eth.estimateGas({ to: iToAdress, data: web3.eth.abi.encodeFunctionCall({name: 'riseCounterA', 
                                                type: 'function', inputs: 
                                                [{type: 'uint256', name: 'input'}]}, ['6'])}, 
  (err, gasEstimate) => 
  {
  //testing: Show Output in Console
  console.log("Output Transaction values:");
  console.log("");
  console.log("GasEstimate: " + gasEstimate);
  console.log("hexGasLimit: " + hexGasLimit);
  console.log("Value: " + value);
  console.log("Data: " + data);
  console.log("Nonce value: " + txCount);
  console.log("");

  //Create Transaction Object with raw data
  const rawTx = {
  nonce:      web3.utils.toHex(txCount),
  gasPrice:   web3.utils.toHex(iGasPrice.toString()),
  gasLimit:   web3.utils.toHex(iGasLimit.toString()),
  to:         iToAdress,
  value:      value,
  data:       web3.eth.abi.encodeFunctionCall({name: 'riseCounterA', 
                     type: 'function', inputs: 
                     [{type: 'uint256', name: 'input'}]}, ['6'])
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

//prepare json2SAP interface
var obj = {table: []};
obj.table.push({From: iFromAdress, To:iToAdress, Value: iValue});
var json = JSON.stringify(obj);
var fs = require('fs');
fs.writeFile('C:/Users/demoerc/AppData/Roaming/npm/json2SAP/myjsonfile.json', 
      json, 'utf8', function(err) { if (err) throw err; console.log('complete');});