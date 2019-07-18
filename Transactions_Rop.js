// Anwender: Daniel 
//--------------------------------------------------------------------------------//
const web3Abi = require('web3-eth-abi')
const Tx = require('ethereumjs-tx');
//Ropsten: 
//1 Accounts:
//1.1 Maschine:
var accounts0 = "0x8D56BD123664a754A53ced403c8aF763e15f603C"
var privateKey0 = "966CDF47C00324FA20F966407F1D15398BF222C6E0056AC8C342BDAACEC6E0C2"
//1.2 Dienstleister: 
var accounts1 = "0x6976D2536659d8e922AC7c462a2A5D425baD9c94"
//1.3 Betrüger: 
var accounts2 = "0xE4a19Ec71e3a83065254B61b6b079dc7A2d9c9C8"
//2 Smart Contracts: 
var CaD = "0x588faa45a03de10ac104c2fa06a9e8f89099ccc7"
//2.1 CountAndDeposit:
//--------------------------------------------------------------------------------//
//3 Transactions:
//3.0 Deploy Smart Contract
//3.1 Define Contract Partner 
web3.eth.sendTransaction({from: accounts0,to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setContractPartner', type: 'function', inputs: [{type: 'address', name: 'input'}]},[accounts1])})
//3.2 Define CounterLimit 
web3.eth.sendTransaction({from: accounts0,to: CaD,data:web3.eth.abi.encodeFunctionCall({name: 'setCounterLimit', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['300'])})
//3.3 Define BalanceLimit 
web3.eth.sendTransaction({from: accounts0,to: CaD,data:web3.eth.abi.encodeFunctionCall({name: 'setBalanceLimit', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['2'])})
//2000000000000000000
//3.4 Increase Balance of Smart Contract and Working Hours
web3.eth.sendTransaction({from: accounts0, to: CaD, value: web3.utils.toWei('1', 'ether'), data:web3.eth.abi.encodeFunctionCall({name: 'increase', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['200'])})
//3.5 Confirmatation of the Owner
web3.eth.sendTransaction({from: accounts0, to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setConfirmationOwner', type: 'function', inputs: [{type: 'uint256', name: 'input'}]}, ['1']) })
//3.6 Confirmatation of the Partner
web3.eth.sendTransaction({from: accounts1,to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setConfirmationPartner', type: 'function', inputs: [{type: 'uint256', name: 'input'}]}, ['1'])})
//3.7 Check Confirmation and Send 
web3.eth.sendTransaction({from: accounts1,to: CaD,data:web3Abi.encodeFunctionSignature('checkConfirmationAndSendPayment()')})
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