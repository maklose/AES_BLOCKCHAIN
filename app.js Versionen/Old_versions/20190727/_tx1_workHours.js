//-------------------------------------------------------------------------------------------------------------------//
//Import additional packages
const Tx = require('ethereumjs-tx');
var fs = require('fs'); //reading/writing JSON files
const web3Abi = require('web3-eth-abi');


//-------------------------------------------------------------------------------------------------------------------//
//Function Library

//1. Function: Handle Callback of SendSignedTransaction
var handleReceipt = (error, receipt) => {
  if (error) console.error(error);
  else {
    console.log(receipt);
    //res.json(receipt);
  }
}


//2. Function: Delete JSON File from Directory
function deleteJSONfile(filePath) {
<<<<<<< HEAD
  //fs.unlink(filePath, function (err) {});
=======
  fs.unlink(filePath, function (err) { });
>>>>>>> 939062b45d42783340ddd24951485b69f2b8c8ae
  console.log('JSON File deleted');
}


//3. Function: SendSignedTransaction

function sendSignedTxToBlockchain(GasPrice, GasLimit, PrivateKey, FromAddress, ToAddress, EthValue, Data) {

  //prepare values to Hex Code
  value = web3.utils.toHex(web3.utils.toWei(EthValue.toString(), "ether"));

  //1st Calculate Nonce:
  web3.eth.getTransactionCount(FromAddress, 'pending', (err, txCount) => {
    //Estimate Gas Price

    web3.eth.estimateGas({ to: ToAddress, data: Data },
      (err, gasEstimate) => {
        //testing: Show Output in Console
        console.log("Output Transaction values:");
        console.log("");
        console.log("GasEstimate: " + gasEstimate);
        console.log("iGasPrice: " + GasPrice);
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



//-------------------------------------------------------------------------------------------------------------------//

//Path has to be adapted to every PC
var configInput = require('C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/appjs_config.json');
var filePathWorkHoursJson = configInput.variables.filePathM202_To_appjs + 'working_hours.json';

//Declaration of single variables for Raw Transaction Data
var GasPrice = configInput.variables.SC_GasPrice;
var GasLimit = configInput.variables.SC_GasLimit;


var iToAddress;
var iFromAddress;
var value;
var iPrivateKey;
var iData;
var errorInputJson = new Boolean(false);
var jsonInputData;
var privateKey;
var tx;
var serializedTx;
var rawTx;


//-------------------------------------------------------------------------------------------------------------------//
//Booking of Machine Working Hours to specific Smart Contract

//- While einbauen für Tx1,Tx2,Tx3,... einlesen von WorkingHours

try {

  //Tx Data
  jsonInputData = require(filePathWorkHoursJson);

  iPrivateKey = jsonInputData.Tx1.PrivateKey_Machine_W;
  iFromAddress = jsonInputData.Tx1.Machine_Wallet;
  iToAddress = jsonInputData.Tx1.SC_Address;
  iValue = jsonInputData.Tx1.Value;

  //General Framework to trigger SmartContract 'IncreaseWorking Hours Function'
  iDataType = jsonInputData.Tx1.Data.Type;
  iDataFunction = jsonInputData.Tx1.Data.FunctionSelector;
  iDataInputType = jsonInputData.Tx1.Data.Inputs.Type;
  iDataInputName = jsonInputData.Tx1.Data.Inputs.Name;
  iDataInputArgument = jsonInputData.Tx1.Data.Inputs.FunctionArgument; //WorkingHours

  //build Data Field for Transaction
  iData = web3.eth.abi.encodeFunctionCall({
    name: iDataFunction,
    type: iDataType, inputs:
      [{
        type: jsonInputData.Tx1.Data.Inputs.Type,
        name: jsonInputData.Tx1.Data.Inputs.Name
      }]
  },
    [jsonInputData.Tx1.Data.Inputs.FunctionArgument.toString()]);

}
catch (e) {
  console.log("");
  console.log("");
  console.log("!!Error in Input JSON!! No Transactions send to Blockchain!!");
  console.log("");
  console.log("");
  errorInputJson = true;
}

console.log("error: " + errorInputJson);

if (errorInputJson == true) {
  //Input JSON with errors, no Transaction can be send to Blockchain
} else {
  //proceed sending Transaction to Blockchain

  //Send Transaction with functionality from Function Library
  sendSignedTxToBlockchain(GasPrice, GasLimit, iPrivateKey, iFromAddress, iToAddress,
    iValue, iData);


  //Delete Input JSON File
  deleteJSONfile(filePathWorkHoursJson);
  jsonInputData = "";
}
