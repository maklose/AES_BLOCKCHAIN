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
   fs.unlink(filePath, function (err) {});
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
var filePathSCaddressesToCheck = configInput.variables.filePathM202_To_appjs
   + 'request_sc.json';


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
   iToAddress = jsonInputData.SmartContract1.SC_Address;
   iFromAddress = jsonInputData.SmartContract1.Machine_Wallet;
   iPrivateKey = jsonInputData.SmartContract1.PrivateKey_Machine_W;

   console.log("iToAddress: " + iToAddress);
   console.log("iFromAddress: " + iFromAddress);

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
   web3.eth.call({ from: iFromAddress, to: iToAddress, data: web3Abi.encodeFunctionSignature('checkBalanceLimit()') },
      (err, result) => {
         console.log("result Maint: " + result);

         if (result == '0x0000000000000000000000000000000000000000000000000000000000000000') {
            console.log("No Maintenance neccessary!");
         } else {

            //get Counter Limit for Logging
            web3.eth.call({
               from: iFromAddress,
               to: iToAddress,
               data: web3Abi.encodeFunctionSignature('getCounterLimit()')
            },
               (err, counterLimit) => {
                  decimalCounterLimit = web3.utils.toDecimal(counterLimit);
                  console.log("CounterLimit von mir set: " + decimalCounterLimit);


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
                           "Machine_Wallet": iFromAddress,
                           "SC_Address": iToAddress,
                           "Maintenance": "Yes",
                           "WorkingHours_all": countedWorkingHours
                        });

                        var json = JSON.stringify(obj, null, 2);
                        fs.writeFile(filePathMaintenanceTransactionJson,
                           json, 'utf8', function (err) { if (err) throw err; console.log('complete'); });
                        console.log("Maintenance needed, Service Provider already informed!");
                     });
               });
         }
      });



   //check Maintenance Confirmation at SCs at trigger payment (if SC check is ok)


   iData = web3Abi.encodeFunctionSignature('checkConfirmationAndSendPayment()');

      //1st Calculate Nonce:
web3.eth.getTransactionCount(iFromAddress, 'pending', (err, txCount) => {
   //Estimate Gas Price
   web3.eth.estimateGas({ to: iToAddress, data: iData },
     (err, gasEstimate) => {
 
       //Create Transaction Object with raw data
       var rawTx = {
         nonce: web3.utils.toHex(txCount),
         gasPrice: web3.utils.toHex(GasPrice.toString()),
         gasLimit: web3.utils.toHex(GasLimit.toString()),
         data: iData
       };
 
       //digital signature
       var privateKey = new Buffer(iPrivateKey, 'hex');
       var tx = new Tx(rawTx);
       tx.sign(privateKey);
 
       //send signed Transaction to Blockchain
       var serializedTx = tx.serialize();
       web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, result) => {
         if (err) {
           console.log(err); return;
         }
 
         // Log the tx, you can explore status manually with eth.getTransaction()
         console.log('Certificate return: ' + result);
         
   
 //TODO: Wait besser ausprogrammieren mit einer 'While receipt == null Funktionalität'
 
 
          
         // Wait 120sec for the transaction to be mined    
         wait(30000);
         
         //wait onto TX_Receipt via while function did not work --> document
         web3.eth.getTransactionReceipt(result, (err, receipt) => {
           console.log("receipt Ending: " + receipt);
                     
            });
               
           }); 
          });  
      
     });
   
};

//--------------------------------------------------------------------------------------//
// Check Smart Contract for a new Certificate

web3.eth.call({ from: iFromAddress, to: iToAddress, data: web3Abi.encodeFunctionSignature('createCertificate()') },
(err, certificate) => {
   console.log("New Certificate: " + certificate);

   if(certificate == '0x')
   {
      //certificate not available
   }else{
      //certificate available


      /**
       * Create JSON File here with certificate data
       * 
       * 
       *  var obj = { Maintenance1: [] };
                        obj.Maintenance1.push({
                           "Machine_Wallet": iFromAddress,
                           "SC_Address": iToAddress,
                           "Maintenance": "Yes",
                           "WorkingHours_all": countedWorkingHours
                        });

                        var json = JSON.stringify(obj, null, 2);
                        fs.writeFile(filePathMaintenanceTransactionJson,
                           json, 'utf8', function (err) { if (err) throw err; console.log('complete'); });
                        console.log("Maintenance needed, Service Provider already informed!");
       */
   }

});



//--------------------------------------------------------------------------------------//
   //delete input JSON file with input SC addresses
   deleteJSONfile(filePathSCaddressesToCheck);
   console.log("SC deployment & initialization finished. JSON input deleted!");
