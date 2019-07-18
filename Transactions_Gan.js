// Anwender: Daniel 
//--------------------------------------------------------------------------------//
const web3Abi = require('web3-eth-abi')
//Ganache:
//Accounts: 
//Maschine: 
var accounts0 = "0x8d2cee235ff0E433B26FFD822f8CF5ccd382c7BF"
var privatekey0 = "b57bc551317ce0b369b673adcd16abeb1d7d8d3cc7c02365427d4fab0d030ac1"
//Dienstleister: 
var accounts1 = "0x3610dcDCBB5e5C174bf38dc8d4e55A2FCE248bA6"
var privatekey1 = "d153d22106c351e7a89a6116bc56b7fce8334a973cfb201fdff28ad90df5904c"
//Betrüger:
var accounts2 = "0x4A75ACF0C3aDAcd4FB5385A1a2B88A05bCa7eF6C"
var privatekey2 = "32c3eae44c60974df9bb6fb146eefb5a6d4bf3444ff58024e53dd5a844201787"
//Smart Contracts:
//CountAndDeposit:
var CaD = "0x09ceEdBB54be0CcfdeD28eE79096250654e07C62"
//--------------------------------------------------------------------------------//
//3 Transactions:
//3.0 Deploy Smart Contract
//3.1 Define Contract Partner 
web3.eth.sendTransaction({from: accounts0,to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setContractPartner', type: 'function', inputs: [{type: 'address', name: 'input'}]},[accounts1])})
//3.2 Define CounterLimit 
web3.eth.sendTransaction({from: accounts0,to: CaD,data:web3.eth.abi.encodeFunctionCall({name: 'setCounterLimit', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['300'])})
//3.3 Define BalanceLimit 
web3.eth.sendTransaction({from: accounts0,to: CaD,data:web3.eth.abi.encodeFunctionCall({name: 'setBalanceLimit', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['2'])})
//3.4 Increase Balance of Smart Contract and Working Hours
web3.eth.sendTransaction({from: accounts0, to: CaD, value: web3.utils.toWei('1', 'ether'), data:web3.eth.abi.encodeFunctionCall({name: 'increase', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['200'])})
//3.5 Confirmatation of the Owner
web3.eth.sendTransaction({from: accounts0, to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setConfirmationOwner', type: 'function', inputs: [{type: 'uint256', name: 'input'}]}, ['1']) })
//3.6 Confirmatation of the Partner
web3.eth.sendTransaction({from: accounts1,to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setConfirmationOwner', type: 'function', inputs: [{type: 'uint256', name: 'input'}]}, ['1'])})
//3.7 Check Confirmation and Send 
//--------------------------------------------------------------------------------//
//4 Calls: 
//4.1 Get value of the Counterlimit
web3.eth.call({to: CaD, data:web3Abi.encodeFunctionSignature('getCounterLimit()')}, (err, counterLimit) => {var CL = web3.utils.toDecimal(counterLimit); console.log(CL) });
//4.2 Get value of the BalanceLimit 
web3.eth.call({to: CaD, data:web3Abi.encodeFunctionSignature('getBalanceLimit()')}, (err, balanceLimit) => {var BL = web3.utils.toDecimal(balanceLimit); console.log(BL) });
//4.3 Get the current Balance of the Smart Contract
web3.eth.getBalance(CaD).then(function(getBalance){console.log(getBalance);}).catch(function(e){console.log(e);});
//4.4 Get the current WorkingHours of the Smart Contract
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('getCount()')}, (err, machineCounter) => {var MC = web3.utils.toDecimal(machineCounter); console.log(MC) });
//4.5 Show if CounterLimit is already reached
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('checkCounterLimit()')})
//4.6 Show if Owner confirmed
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('getConfirmationOwner()')}, (err, ConfirmationOwner) => {var CO = web3.utils.toDecimal(ConfirmationOwner); console.log(CO)});
//4.7 Show if Partner confirmed
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('getConfirmationPartner()')}, (err, ConfirmationPartner) => {var CP = web3.utils.toDecimal(ConfirmationPartner); console.log(CP) });
//4.8 get Stamp of Contract Owner 
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('getStampOwner()')}, (err, stampOwner) => {var SO = web3.utils.toDecimal(stampOwner); console.log(SO) });
//4.9 get Stamp of Contract Partner 
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('getStampPartner()')},(err, stampPartner) => {var SP = web3.utils.toDecimal(stampPartner); console.log(SP)});