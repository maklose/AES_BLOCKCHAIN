// using the callback
const Tx = require('ethereumjs-tx');
var s = 1;
var iPrivateKey = '2b7db7222955fb9cb465ae6ff7cb4dc0f9472eb5e4302e93cfbdf8a41275b177';

var handleReceipt = (error, receipt) => {
  if (error) console.error(error);
  else {
    console.log(receipt);
    //res.json(receipt);
  }
}

var rawTx = {
  nonce:      '0x04',
  gasPrice:   web3.utils.toHex('65000000000'),
  gasLimit:   web3.utils.toHex('4698712'),
  from:       '0x20af583E820cC68235D03e00d42b548721bF2Db8',
  to:         '0xF6b7Aef42305A4A24fbD28db9B7376C2267FcD3A',
  value:    web3.utils.toWei(s.toString(), "ether")
};

var privateKey = new Buffer(iPrivateKey, 'hex');

const tx = new Tx(rawTx);
tx.sign(privateKey);
const serializedTx = tx.serialize();

console.log('0x' + serializedTx.toString('hex'));

web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), handleReceipt);

