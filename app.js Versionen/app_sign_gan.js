const Tx = require('ethereumjs-tx');
var fs = require('fs'); //reading/writing JSON files
const web3Abi = require('web3-eth-abi');


//Callback handling of sent transaction
var handleReceipt = (error, receipt) => {
  if (error) console.error(error);
  else {
    console.log(receipt);
    //res.json(receipt);
  }
}


//Declaration of single variables for Raw Transaction Data
var iGasPrice = 50000;
var iGasLimit = 50000;
var iToAdress;
var iValue;
var iPrivateKey;
var iData;
var errorInputJson = new Boolean(false);


//Definition of File Paths
var filePathSCCreationJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/CreateMaintContract.json';
var filePathWorkHoursJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/WorkHours_SAP2BC.json';
var filePathMaintenanceTransactionJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_203/To_SAP/MaintenanceNotification.json';
var filePathCPMaintConfJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/confirmMaintenance.json';
var filePathMachineMaintConfJson = 'C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_203/To_appjs/confirmMaintenance.json';



//-------------------------------------------------------------------------------------------------------------------//
//Create new Smart Contracts

var jsonSCCreationJSON = require(filePathSCCreationJson);

/*
erst json einlesen

1. Create Contract via Transaction (warten auf input von Daniel)

2. ContractPartner 

web3.eth.sendTransaction({from: accounts0,
  to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setContractPartner', type: 'function', 
  inputs: [{type: 'address', name: 'input'}]},[accounts1])}) 


3. CounterLimit 

web3.eth.sendTransaction({from: accounts0,
  to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setCounterLimit', type: 'function', 
  inputs: [{type: 'uint256', name: 'input'}]},['300'])}) 


4. MoneyLimit (warten auf Smart Contract) - Geld, das eine Wartung kostet

5. Return Contract Address to JSON (SAP)

*/


//Activate following!!
//Delete Input JSON File
//fs.unlink(filePathSCCreationJson, function (err) {});
//console.log('SC created & initialized, JSON File deleted');



//-------------------------------------------------------------------------------------------------------------------//
//Booking of Machine Working Hours to specific Smart Contract



//while einbauen, der alle WorkingHours einliest und mehrere Tx erstellt



var jsonWorkingHours = 
  require(filePathWorkHoursJson);
console.log("Start read JSON Working Hours");

/*
1. mehrere Maschinen, mehrere Transaktionen starten von einem SAP

2. FunctionSelector 'increase' testen (mit neuem SmartContract in Ganache deployen)

*/


//Check, if JSON files are empty --> If Yes, raise error
try{

//Tx Data
iPrivateKey         = jsonWorkingHours.Tx1.PrivateKey_Machine_W;
iFromAdress         = jsonWorkingHours.Tx1.Machine_Wallet; //for function: getTransactionCount
iToAdress           = jsonWorkingHours.Tx1.SC_Address;
iValue              = jsonWorkingHours.Tx1.Value;

//General Framework to trigger SmartContract 'IncreaseWorking Hours Function'
iDataType           = jsonWorkingHours.Tx1.Data.Type;
iDataFunction       = jsonWorkingHours.Tx1.Data.FunctionSelector;
iDataInputType      = jsonWorkingHours.Tx1.Data.Inputs.Type;
iDataInputName      = jsonWorkingHours.Tx1.Data.Inputs.Name;
iDataInputArgument  = jsonWorkingHours.Tx1.Data.Inputs.FunctionArgument; //WorkingHours

//build Data Field for Transaction
iData = web3.eth.abi.encodeFunctionCall({name: iDataFunction, 
  type: iDataType, inputs: 
  [{type: jsonWorkingHours.Tx1.Data.Inputs.Type,
    name: jsonWorkingHours.Tx1.Data.Inputs.Name}]}, 
    [jsonWorkingHours.Tx1.Data.Inputs.FunctionArgument.toString()]);

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

//prepare values to Hex Code
const hexGasLimit = web3.utils.toHex(iGasLimit.toString());
const value = web3.utils.toHex(web3.utils.toWei(iValue.toString(), "ether"));

//all functions in single callback method:

//1st Calculate Nonce:
web3.eth.getTransactionCount(iFromAdress, 'pending',(err, txCount) =>
{
  //Estimate Gas Price
  web3.eth.estimateGas({ to: iToAdress, data: iData}, 
  (err, gasEstimate) => 
  {
  //testing: Show Output in Console
  console.log("Output Transaction values:");
  console.log("");
  console.log("GasEstimate: " + gasEstimate);
  console.log("iGasPrice: " + iGasPrice)
  console.log("hexGasLimit: " + hexGasLimit);
  console.log("Value: " + value);
  console.log("Nonce value: " + txCount);
  console.log("Data: " + iData);
  console.log("");

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
}



//Delete Input JSON File
fs.unlink(filePathWorkHoursJson, function (err) {});
console.log('Working Hours Transaction send to Blockchain, JSON File deleted');

//eingelesene JSON Files von Ordner löschen, damit diese nicht nochmal eingelesen werden

//-------------------------------------------------------------------------------------------------------------------//
//Create Maintenance Notification to SAP (Contract Partner)

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


var jsonConfirmMaintenanceCP = require(filePathCPMaintConfJson);
/*
warten auf Daniel

*/


//Activate following!!
//Delete Input JSON File
//fs.unlink(filePathCPMaintConfJson, function (err) {});
//console.log('SC created & initialized, JSON File deleted');

//-------------------------------------------------------------------------------------------------------------------//
// Send Maintenenace Conformation to Blockchain
// Scenario 2: ContractPartner (CP) to Smart Contract

var jsonConfirmMaintenanceMachine = require(filePathMachineMaintConfJson);

/*
warten auf Daniel

*/



//Activate following!!
//Delete Input JSON File
//fs.unlink(filePathMachineMaintConfJson, function (err) {});
//console.log('SC created & initialized, JSON File deleted');

//-------------------------------------------------------------------------------------------------------------------//
