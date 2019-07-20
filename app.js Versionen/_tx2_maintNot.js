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
   //fs.unlink(filePath, function (err) {});
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
            console.log("iGasPrice: " + GasPrice)
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
var filePathMaintenanceTransactionJson = configInput.variables.filePathM203_To_SAP
   + 'MaintenanceNotification.json';
var filePathSCaddressesToCheck = configInput.variables.filePathM202_To_appjs
   + 'Maint_request.json';


//Declaration of single variables for Raw Transaction Data
var GasPrice = configInput.variables.SC_GasPrice;
var GasLimit = configInput.variables.SC_GasLimit;
var iValue_0 = configInput.variables.iValue_0;


var iToAddress;
var iFromAddress;
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

jsonInputData = require(filePathSCaddressesToCheck);



// read JSON with all SC addresses

try {
   //txInputData
   iToAddress = jsonInputData.SmartContracts.SC_Address1;

   console.log("iToAddress: " + iToAddress);

}
catch (e) {
   console.log("");
   console.log("");
   console.log("!!Error in Input JSON for SC Initialization!! No Transactions send to Blockchain!!");
   console.log("");
   console.log("");
   errorInputJson = true;
}

if (errorInputJson == true) {
   //Input JSON with errors, no Transaction can be send to Blockchain
} else {
   //proceed sending initializing Transactions to SC

   //Define ContractPartner
   web3.eth.call({ to: iToAddress, data: web3Abi.encodeFunctionSignature('checkCounterLimit()') },
      (err, result) => {
         console.log("result Maint: " + result);

         result = '0x1';

         if (result == '0x') {
            console.log("No Maintenance neccessary!");
         } else {

            //Get Contract Owner / Machine Wallet
            web3.eth.call({ to: iToAddress, data: web3Abi.encodeFunctionSignature('getContractOwner()') },
               (err, contractOwnerWallet) => {
                  console.log("contractOwnerWallet: " + contractOwnerWallet);

                  //get Counter Limit for Logging
                  web3.eth.call({
                     to: iToAddress,
                     data: web3Abi.encodeFunctionSignature('getCounterLimit()')
                  },
                     (err, counterLimit) => {
                        decimalCounterLimit = web3.utils.toDecimal(counterLimit);
                        console.log("CounterLimit von mir set: " + decimalCounterLimit);


                        //Get current count of Working Hours
                        web3.eth.call({
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
                                 "Machine_Wallet": contractOwnerWallet,
                                 "SC_Address": "0x5ac12B90f9a6653eE7EdE68c78133B79B67a057C",
                                 "Maintenance": "Yes",
                                 "WorkingHours_all": countedWorkingHours
                              });

                              var json = JSON.stringify(obj, null, 2);
                              fs.writeFile(filePathMaintenanceTransactionJson,
                                 json, 'utf8', function (err) { if (err) throw err; console.log('complete'); });
                              console.log("Maintenance needed, Service Provider already informed!");
                           });
                     });
               });
         }
      });



   //check Maintenance Confirmation at SCs at trigger payment (if SC check is ok)

   //Get Contract Owner / Machine Wallet
   web3.eth.call({ to: iToAddress, data: web3Abi.encodeFunctionSignature('getContractOwner()') },
      (err, contractOwnerWallet) => {





         //TestData:
         iPrivateKey = '8e9b1bc69ddf2feb5fb710bd863b84fbd218e17bbc39459b7ebcc064041e6fbd';
         iFromAddress = '0xE479b7a82eb2EB5D5586d7696b8D6b29ABbC4db7';






         iData = web3Abi.encodeFunctionSignature('checkConfirmationAndSendPayment()');
         sendSignedTxToBlockchain(GasPrice, GasLimit, iPrivateKey, iFromAddress, iToAddress,
            iValue_0, iData);

      });

   //delete input JSON file with input SC addresses
   deleteJSONfile(filePathSCaddressesToCheck);
   console.log("SC deployment & initialization finished. JSON input deleted!");
}
