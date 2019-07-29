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
   fs.unlink(filePath, function (err) { });
   console.log('JSON File deleted');
}

function wait(ms) {
   var d = new Date();
   var d2 = null;
   do { d2 = new Date(); }
   while (d2 - d < ms);
}

//-------------------------------------------------------------------------------------------------------------------//

//Path has to be adapted to every PC
var configInput = require('C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/appjs_config.json');
var filePathMaintenanceTransactionJson = configInput.variables.filePathM203_To_SAP
   + 'new_maintenance_notification.json';
var filePathSCaddressesToCheck = configInput.variables.filePathM203_To_appjs
   + 'request_sc.json';


//Declaration of single variables for Raw Transaction Data
var GasPrice = configInput.variables.SC_GasPrice;
var GasLimit = configInput.variables.SC_GasLimit;
var iValue_0 = configInput.variables.iValue_0;


var iToAddress;
var iFromAddress;
var iMachineAddress;
var value;
var errorInputJson = new Boolean(false);
var jsonInputData;
var privateKey;
var tx;
var serializedTx;
var rawTx;
var decimalCounterLimit;
var countedWorkingHours;
var iData;


//-------------------------------------------------------------------------------------------------------------------//
//initialize new Smart Contracts --> set MaintenanceCosts as BalanceLimit

// read JSON with all SC addresses

try {
   //txInputData
   jsonInputData = require(filePathSCaddressesToCheck);

   iToAddress = jsonInputData.SmartContract1.SC_Address;
   iFromAddress = jsonInputData.SmartContract1.Vendor_Wallet;
   iPrivateKey = jsonInputData.SmartContract1.PrivateKey_Vendor_W;
   iMachineAddress = jsonInputData.SmartContract1.Machine_Wallet;

   console.log("iToAddress: " + iToAddress);
   console.log("iFromAddress: " + iFromAddress);

}
catch (e) {
   console.log("");
   console.log("");
   console.log("Could not read input JSON.");
   console.log("");
   console.log("");
   errorInputJson = true;
}

if (errorInputJson == true) {
   //Input JSON with errors, no Transaction can be send to Blockchain
} else {
   //proceed sending initializing Transactions to SC

   //Define ContractPartner
   web3.eth.call({ from: iFromAddress, to: iToAddress, data: web3Abi.encodeFunctionSignature('checkBalanceLimit()') },
      (err, result) => {
         console.log("result Maint: " + result);

         if (result == '0x0000000000000000000000000000000000000000000000000000000000000000') {
            console.log("");
            console.log("No Maintenance neccessary!");
            console.log("");
         } else {

            //get Counter Limit for Logging
            web3.eth.call({
               from: iFromAddress,
               to: iToAddress,
               data: web3Abi.encodeFunctionSignature('getCounterLimit()')
            },
               (err, counterLimit) => {
                  decimalCounterLimit = web3.utils.toDecimal(counterLimit);
                  console.log("CounterLimit: " + decimalCounterLimit);


                  //Get current count of Working Hours
                  web3.eth.call({
                     from: iFromAddress,
                     to: iToAddress,
                     data: web3Abi.encodeFunctionSignature('getCount()')
                  },
                     (err, machineCounter) => {
                        countedWorkingHours = web3.utils.toDecimal(machineCounter);
                        console.log(countedWorkingHours);


                        // create Output JSON File to contact Service Provider to 
                        // do the Machine Maintenance for Machine in contractOwnerWallet

                        var obj = { Maintenance1: [] };
                        obj.Maintenance1.push({
                           "Machine_Wallet": iMachineAddress,
                           "Vendor_Wallet": iFromAddress,
                           "SC_Address": iToAddress,
                           "Maintenance": "Yes",
                           "WorkingHours_all": countedWorkingHours
                        });

                        var json = JSON.stringify(obj, null, 2);
                        fs.writeFile(filePathMaintenanceTransactionJson,
                           json, 'utf8', function (err) { if (err) throw err; console.log('complete'); });
                        console.log("");
                        console.log("Maintenance needed, Service Provider informed!");
                        console.log("");
                     });
               });
         }
      });

}


//--------------------------------------------------------------------------------------//
//delete input JSON file with input SC addresses
deleteJSONfile(filePathSCaddressesToCheck);

