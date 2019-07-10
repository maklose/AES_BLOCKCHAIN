const Tx = require('ethereumjs-tx');
var fs = require('fs'); //reading/writing JSON files


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
var errorInputJson = new Boolean(false);

var jsonWorkingHours = 
  require('C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/WorkHours_SAP2BC.json');
var jsonConfirmMaintenance;
console.log("Start read JSON Working Hours");

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
  web3.eth.estimateGas({ to: iToAdress, data: web3.eth.abi.encodeFunctionCall({name: iDataFunction, 
                                                type: iDataType, inputs: 
                                                [{type: jsonWorkingHours.Tx1.Data.Inputs.Type,
                                                  name: jsonWorkingHours.Tx1.Data.Inputs.Name}]}, 
                                                  [jsonWorkingHours.Tx1.Data.Inputs.FunctionArgument.toString()])}, 
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
  console.log("Data: " + web3.eth.abi.encodeFunctionCall({name: iDataFunction, 
    type: iDataType, inputs: 
        [{type: jsonWorkingHours.Tx1.Data.Inputs.Type,
          name: jsonWorkingHours.Tx1.Data.Inputs.Name}]}, 
          [jsonWorkingHours.Tx1.Data.Inputs.FunctionArgument.toString()]))
  console.log("");

  //Create Transaction Object with raw data
  const rawTx = {
  nonce:      web3.utils.toHex(txCount),
  gasPrice:   web3.utils.toHex(iGasPrice.toString()),
  gasLimit:   web3.utils.toHex(iGasLimit.toString()),
  to:         iToAdress,
  value:      value,
  data:       web3.eth.abi.encodeFunctionCall({name: iDataFunction, 
                  type: iDataType, inputs: 
                      [{type: jsonWorkingHours.Tx1.Data.Inputs.Type,
                        name: jsonWorkingHours.Tx1.Data.Inputs.Name}]}, 
                        [jsonWorkingHours.Tx1.Data.Inputs.FunctionArgument.toString()])
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

//mehrere Transactions hintereinander erstellen --> hier einbauen




//Get Maintenance Transactions from Blockchain
//Call SmartContract to get Working Hours


//Prepare Maintenance Transactions to send JSON to SAP

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
 fs.writeFile('C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_203/To_SAP/MaintenanceNotification.json', 
       json, 'utf8', function(err) { if (err) throw err; console.log('complete');});

