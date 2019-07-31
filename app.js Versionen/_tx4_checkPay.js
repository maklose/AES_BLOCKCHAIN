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

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

//-------------------------------------------------------------------------------------------------------------------//

//Path has to be adapted to every PC

var configInput = require('C:/Users/demoerc/dropbox_uni/Dropbox/AES_File_Exchange/Mandant_202/To_appjs/appjs_config.json');
var filePathCPMaintConfJson = configInput.variables.filePathM203_To_appjs + 'confirm_h.json';
var filePathMachineMaintConfJson = configInput.variables.filePathM202_To_appjs + 'confirm_m.json';
var filePathCertificate = configInput.variables.filePathM202_To_SAP + 'certificate.json';

//Declaration of single variables for Raw Transaction Data
var GasPrice = configInput.variables.SC_GasPrice;
var GasLimit = configInput.variables.SC_GasLimit;
var iValue_0 = configInput.variables.iValue_0;

//for CP confirm
var iToAddress;
var iFromAddress;
var value;
var iPrivateKey;
var iData;
var iPartnerConfirm;
var errorInputJson = new Boolean(false);
var jsonInputData;
var privateKey;
var tx;
var serializedTx;
var rawTx;
var certMachineAddr;
var certCPAddr;
var certSCAddr;
var certMoneyLimit;
var certCouterLimit;
var certDate = new Date();

try {
    //txInputData
    jsonInputData = require(filePathCPMaintConfJson);
    iToAddress = jsonInputData.confirmation1.SC_Address;
    iFromAddress = jsonInputData.confirmation1.Wallet1;
    iPrivateKey = jsonInputData.confirmation1.PrivateKeyW1;
    iPartnerConfirm = jsonInputData.confirmation1.Data.FunctionSelector;

    console.log("iToAddress: " + iToAddress);
    console.log("iFromAddress: " + iFromAddress);
    console.log("iPrivateKey: " + iPrivateKey);

}
catch (e) {
    console.log("");
    console.log("");
    console.log("No confirmation by Contract Partner!");
    console.log("");
    console.log("");
    errorInputJson = true;
}

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
                from: iFromAddress,
                to: iToAddress,
                gasPrice: web3.utils.toHex(GasPrice.toString()),
                gasLimit: web3.utils.toHex(GasLimit.toString()),
                value: iValue_0,
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


            });
        });

});
//delete input JSON file
deleteJSONfile(filePathCPMaintConfJson);
console.log('CP confirmation json deleted');

//--------------------------------------------------------------------------------------//
// Check Smart Contract for a new Certificate

web3.eth.call({ from: iFromAddress, to: iToAddress, data: web3Abi.encodeFunctionSignature('getCertificate()') },
    (err, certificate) => {

        if (certificate == '0x') {
            //certificate not available
        } else {
            //certificate available

            finalString = certificate.toString();
            var dd = String(certDate.getDate()).padStart(2, '0');
            var mm = String(certDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = certDate.getFullYear();

            certDate = yyyy + mm + dd;

            certMachineAddr = '0x' + finalString.substring(26, 66);
            certCPAddr = '0x' + finalString.substring(90, 130);

            certSCAddr = '0x' + finalString.substring(154, 194);

            var hex_CounterLimit = finalString.substring(362, 386);
            certCouterLimit = web3.utils.hexToNumber('0x' + hex_CounterLimit);


            //Kommastellen abfangen
            var help_MoneyLimit = finalString.substring(438, 450);

            certMoneyLimit = web3.utils.toDecimal(help_MoneyLimit);
            console.log('Money Limit: ' + certMoneyLimit);

            //Get current count of Working Hours
            web3.eth.call({
                from: certMachineAddr,
                to: certSCAddr,
                data: web3Abi.encodeFunctionSignature('getCount()')
            },
                (err, machineCounter) => {
                    countedWorkingHours = web3.utils.toDecimal(machineCounter);




                    //Create JSON File here with certificate data


                    var obj = { Certificate: [] };
                    obj.Certificate.push({
                        "Date": certDate,
                        "Machine_Wallet": certMachineAddr,
                        "Vendor_Wallet": certCPAddr,
                        "SmartContract": certSCAddr,
                        "Counter_Limit": certCouterLimit,
                        "MaintenanceCost": certMoneyLimit,
                        "WorkingHours": countedWorkingHours

                    });

                    var json = JSON.stringify(obj, null, 2);
                    fs.writeFile(filePathCertificate,
                        json, 'utf8', function (err) { if (err) throw err; });
                    console.log("New Certificate created!");
                });

        }

    });



//delete input JSON file
deleteJSONfile(filePathMachineMaintConfJson);
console.log('Machine confirmation json deleted');


