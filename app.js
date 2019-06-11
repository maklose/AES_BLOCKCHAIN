var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')

const account1 = '0xF6b7Aef42305A4A24fbD28db9B7376C2267FcD3A'
const account2 = '0x20af583E820cC68235D03e00d42b548721bF2Db8'

//Private Keys are a security Risk
const privateKey1 = '15ef5eb48d8d1a514c7c392483209adbf737e45adb962633240437bfb9352231'
const privateKey2 = '2b7db7222955fb9cb465ae6ff7cb4dc0f9472eb5e4302e93cfbdf8a41275b177'

const privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')


web3.eth.getBalance(account1, (err, bal) => { console.log('account 1 balance: ', web3.utils.fromWei(bal, 'ether')) })
web3.eth.getBalance(account2, (err, bal) => { console.log('account 2 balance: ', web3.utils.fromWei(bal, 'ether')) })


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
