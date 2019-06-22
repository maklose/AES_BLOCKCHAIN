const Tx = require('ethereumjs-tx');

//Declaration of single variables for Raw Transaction Data
var iGasPrice;
var iGasLimit;
var iToAdress;
var iValue;
var iData;           //important for function argument & function selector
var iPrivateKey = '2b7db7222955fb9cb465ae6ff7cb4dc0f9472eb5e4302e93cfbdf8a41275b177';


//testing: Test Data initialization within coding
iGasPrice = 100000;
iGasLimit = 6721975;
iToAdress = '0xF6b7Aef42305A4A24fbD28db9B7376C2267FcD3A';
iValue =    1;
iData =     'Hallo hier ist eine Test Transaktion input'
            + 'es geht hier in der zweiten Zeile weiter';



//transform privateKey for digital Signature of a transaction
var privateKey = new Buffer(iPrivateKey, 'hex');

//Prepare Raw Data Transaction from input Data
var rawTx = {
  gasPrice:   web3.utils.toHex(iGasPrice),
  gasLimit:   web3.utils.toHex(iGasLimit),
  to:         iToAdress,
  value:      web3.utils.toHex(iValue),
  data:       web3.utils.toHex(iData)
}

//Process digital Signature
const tx = new Tx(rawTx);
tx.sign(privateKey);
const serializedTx = tx.serialize();

//send SignedTransaction to Blockchain
web3.eth.sendSignedTransaction('0x'
      + serializedTx.toString('hex')).on(
                  'receipt', console.log);



/* Old Codings:

//transaction without signing
web3.eth.sendTransaction({ 
	from: 	account1,
	to: 	account2,
	gas:	'0x76c0',
	gasPrice:	'0x9184e72a000',
	value:	web3.utils.toWei('2', 'ether'),
	data: 	web3.utils.toHex('pm_test_input_data')
	//data has to be a hex value
})


//send signed transaction

 const rawTx = {
  nonce: '0x00',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  from:	'0x20af583E820cC68235D03e00d42b548721bF2Db8',
  to: '0xF6b7Aef42305A4A24fbD28db9B7376C2267FcD3A',
  value: web3.utils.toWei('3', 'ether'),
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
}

const tx = new Tx(rawTx);
tx.sign(privateKey);

const serializedTx = tx.serialize();

web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('receipt', console.log);

*/