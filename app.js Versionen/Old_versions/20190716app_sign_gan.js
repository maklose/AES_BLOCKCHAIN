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

function deleteJSONfile(filePath)
{
  //fs.unlink(filePath, function (err) {});
  console.log('JSON File deleted');
}


//3. Function: SendSignedTransaction

function sendSignedTxToBlockchain(GasPrice, GasLimit, PrivateKey, FromAddress, ToAddress, EthValue, Data)
{
  
//prepare values to Hex Code
value = web3.utils.toHex(web3.utils.toWei(EthValue.toString(), "ether"));

//1st Calculate Nonce:
web3.eth.getTransactionCount(FromAddress, 'pending',(err, txCount) =>
{
    //Estimate Gas Price
    web3.eth.estimateGas({ to: ToAddress, data: Data}, 
    (err, gasEstimate) => 
    {
    //testing: Show Output in Console
    console.log("Output Transaction values:");
    console.log("");
    console.log("GasEstimate: " + gasEstimate);
    console.log("iGasPrice: " + iGasPrice)
    console.log("hexGasLimit: " + GasLimit);
    console.log("Value: " + value);
    console.log("Nonce value: " + txCount);
    console.log("Data: " + Data);
    console.log("");

    //Create Transaction Object with raw data
rawTx = {
    nonce:      web3.utils.toHex(txCount),
    gasPrice:   web3.utils.toHex(GasPrice.toString()),
    gasLimit:   web3.utils.toHex(GasLimit.toString()),
    to:         ToAddress,
    value:      value,
    data:       Data
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

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}

//-------------------------------------------------------------------------------------------------------------------//


//Declaration of single variables for Raw Transaction Data
var iGasPrice     = 50000;
var iGasLimit     = 50000;
const hexGasLimit = web3.utils.toHex(iGasLimit.toString());
var iToAddress;
var iFromAddress;
var iValue;
var value;
var iPrivateKey;
var iData;
var errorInputJson = new Boolean(false);
var jsonInputData;
var privateKey;
var tx;
var serializedTx;
var rawTx;

//Definition of File Paths
var filePathSCCreationJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/CreateMaintContract.json';
var filePathWorkHoursJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/WorkHours_SAP2BC.json';
var filePathMaintenanceTransactionJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_203/To_SAP/MaintenanceNotification.json';
var filePathCPMaintConfJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/confirmMaintenance.json';
var filePathMachineMaintConfJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_203/To_appjs/confirmMaintenance.json';


//-------------------------------------------------------------------------------------------------------------------//
//Create new Smart Contracts

jsonInputData = require(filePathSCCreationJson);



//Delete Input JSON File
deleteJSONfile(filePathSCCreationJson);
jsonInputData = "";

//-------------------------------------------------------------------------------------------------------------------//
//Booking of Machine Working Hours to specific Smart Contract



jsonInputData = 
  require(filePathWorkHoursJson);
console.log("Start read JSON Working Hours");

try{

//Tx Data
iPrivateKey         = jsonInputData.Tx1.PrivateKey_Machine_W;
iFromAddress        = jsonInputData.Tx1.Machine_Wallet;
iToAddress          = jsonInputData.Tx1.SC_Address;
iValue              = jsonInputData.Tx1.Value;

//General Framework to trigger SmartContract 'IncreaseWorking Hours Function'
iDataType           = jsonInputData.Tx1.Data.Type;
iDataFunction       = jsonInputData.Tx1.Data.FunctionSelector;
iDataInputType      = jsonInputData.Tx1.Data.Inputs.Type;
iDataInputName      = jsonInputData.Tx1.Data.Inputs.Name;
iDataInputArgument  = jsonInputData.Tx1.Data.Inputs.FunctionArgument; //WorkingHours

//build Data Field for Transaction
iData = web3.eth.abi.encodeFunctionCall({name: iDataFunction, 
  type: iDataType, inputs: 
  [{type: jsonInputData.Tx1.Data.Inputs.Type,
    name: jsonInputData.Tx1.Data.Inputs.Name}]}, 
    [jsonInputData.Tx1.Data.Inputs.FunctionArgument.toString()]);

}
catch(e){
  console.log("");
  console.log("");
  console.log("!!Error in Input JSON!! No Transactions send to Blockchain!!");
  console.log("");
  console.log("");
  errorInputJson = true;
}

console.log("error: " + errorInputJson);

if (errorInputJson == true)
{
  //Input JSON with errors, no Transaction can be send to Blockchain
} else {
//proceed sending Transaction to Blockchain

//Send Transaction with functionality from Function Library
sendSignedTxToBlockchain(iGasPrice, iGasLimit, iPrivateKey, iFromAddress, iToAddress, 
  iValue, iData);


//Delete Input JSON File
deleteJSONfile(filePathWorkHoursJson);
jsonInputData = "";

//-------------------------------------------------------------------------------------------------------------------//
//Create Maintenance Notification to SAP (Contract Partner)

//Alle SCs anfrgen, inwieweit Wartung ansteht. Falls Wartung ansteht, folgend Wartungs-JSONs schreiben

/*
1. Warten auf Daniel

*/


//Löscht Marvin diese JSON Datei nachm Einlesen?


//Prepare Maintenance Transactions to send JSON to SAP
console.log('output json start');

var obj = {Maintenance1: [], Maintenance2: []};
obj.Maintenance1.push({
   "Machine_Wallet": "0xE479b7a82eb2EB5D5586d7696b8D6b29ABbC4db7",
   "SC_Address": "0x5ac12B90f9a6653eE7EdE68c78133B79B67a057C",
   "Maintenance": "Yes",
   "WorkingHours_all": 2000
 });
obj.Maintenance2.push({
  "Machine_Wallet": "0xE479b7a82eb2EB5D5586d7696b8D6b29ABbC4db7",
  "SC_Address": "0x5ac12B90f9a6653eE7EdE68c78133B79B67a057C",
  "Maintenance": "Yes",
  "WorkingHours_all": 2000});

var json = JSON.stringify(obj, null, 2);
fs.writeFile(filePathMaintenanceTransactionJson, 
      json, 'utf8', function(err) { if (err) throw err; console.log('complete');});


      
//-------------------------------------------------------------------------------------------------------------------//
// Send Maintenenace Conformation to Blockchain
// Scenario 1: Machine_Wallet to Smart Contract


jsonInputData = require(filePathCPMaintConfJson);
/*
warten auf Daniel

*/


//Delete Input JSON File
deleteJSONfile(filePathCPMaintConfJson);
jsonInputData = "";

//-------------------------------------------------------------------------------------------------------------------//
// Send Maintenenace Conformation to Blockchain
// Scenario 2: ContractPartner (CP) to Smart Contract

jsonInputData = require(filePathMachineMaintConfJson);

/*
warten auf Daniel

*/



//Delete Input JSON File
deleteJSONfile(filePathMachineMaintConfJson);
jsonInputData = "";

}

//-------------------------------------------------------------------------------------------------------------------//
/*  Open Task Section:
  - While einbauen für Tx1,Tx2,Tx3,... einlesen von WorkingHours

  - Create new Smart Contracts ausprogrammieren

  - FunctionSelector 'increase' testen (mit neuem SmartContract in Ganache deployen)

  - Alle Smart Contracts abfragen, inwieweit eine Wartung ansteht - woher die SC Adressen?

  - Activate fs.unlink(filePath, function (err) {}); in Function Library (damit JSON Files alle gelöscht werden...)


*/