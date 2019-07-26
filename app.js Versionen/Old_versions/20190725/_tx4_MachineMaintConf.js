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
var filePathMachineMaintConfJson = configInput.variables.filePathM202_To_appjs + 'confirm_m.json';

//Declaration of single variables for Raw Transaction Data
var GasPrice = configInput.variables.SC_GasPrice;
var GasLimit = configInput.variables.SC_GasLimit;
var iValue_0 = configInput.variables.iValue_0;


var iToAddress;
var iFromAddress;
var value;
var iPrivateKey;
var iData;
var iMachineConfirm;
var errorInputJson = new Boolean(false);
var jsonInputData;
var privateKey;
var tx;
var serializedTx;
var rawTx;


//-------------------------------------------------------------------------------------------------------------------//
// Maintenance Confirmation of Machine / Manufacturer

jsonInputData = require(filePathMachineMaintConfJson);


try {
    //txInputData
    iToAddress      = jsonInputData.confirmation1.SC_Address;
    iFromAddress    = jsonInputData.confirmation1.Wallet1;
    iPrivateKey     = jsonInputData.confirmation1.PrivateKeyW1;
    iMachineConfirm = jsonInputData.confirmation1.Data.FunctionSelector;

    console.log("iToAddress: " + iToAddress);
    console.log("iFromAddress: " + iFromAddress);
    console.log("iPrivateKey: " + iPrivateKey);

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

    //check if confirmation has been send via JSON
    if (iMachineConfirm == 'machineConfirm')
    {
            
    //Define ContractPartner
    iData = web3.eth.abi.encodeFunctionCall({name: 'setConfirmationOwner', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},
    ['1']);
    
    sendSignedTxToBlockchain(GasPrice, GasLimit, iPrivateKey, iFromAddress, iToAddress,
        iValue_0, iData);
    
        console.log("Machine has confirmed Maintenance "
            + "via JSON file. Confirmation Transaction send to Smart Contract!");

    //delete input JSON file
    deleteJSONfile(filePathMachineMaintConfJson);
    
    }else{
        console.log("JSON Maintenance Confirmation found, but Maintenance " + 
         "has not been confirmed within this file. No Transaction send to Smart Contract");
    }
}
