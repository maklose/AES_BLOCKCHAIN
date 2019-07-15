// Anwender: Daniel 
//--------------------------------------------------------------------------------//
const web3Abi = require('web3-eth-abi')
//Ropsten: 
//1 Accounts:
//1.1 Maschine:
var accounts0 = "0x8D56BD123664a754A53ced403c8aF763e15f603C"
//1.2 Dienstleister: 
var accounts1 = "0xcf20a18cCe3DAeABC4d016C5c1E1827E34465B23"
//1.3 Betrüger: 
var CaD = "0x8948852e53ac1Fa9Cea7077E133bcED1f471f1d1"
//2 Smart Contracts: 
//2.1 CountAndDeposit:
//--------------------------------------------------------------------------------//
//3 Transactions:
//3.0 Deploy Smart Contract
//3.1 Define Contract Partner 
web3.eth.sendTransaction({from: accounts0,to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setContractPartner', type: 'function', inputs: [{type: 'address', name: 'input'}]},[accounts1])})
//3.2 Define CounterLimit 
web3.eth.sendTransaction({from: accounts0,to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setCounterLimit', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['300'])})
//3.3 Increase Balance of Smart Contract and Working Hours
web3.eth.sendTransaction({from: accounts0,to: CaD, value: web3.utils.toWei('1', 'ether'),data:web3.eth.abi.encodeFunctionCall({name: 'increase', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['200'])})
//3.4 Confirmatation of the Owner
web3.eth.sendTransaction({from: accounts0,to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setConfirmationOwner', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['1'])})
//3.5 Confirmatation of the Partner
web3.eth.sendTransaction({from: accounts1,to: CaD, data:web3.eth.abi.encodeFunctionCall({name: 'setConfirmationOwner', type: 'function', inputs: [{type: 'uint256', name: 'input'}]},['1'])})
//--------------------------------------------------------------------------------//
//4 Calls: 
//4.1 Get value of the Counterlimit
web3.eth.call({to: CaD, data:web3Abi.encodeFunctionSignature('getCounterLimit()')},(err, counterLimit) => {var CL = web3.utils.toDecimal(counterLimit); console.log(CL)});
//4.2 Get the current Balance of the Smart Contract
web3.eth.getBalance(CaD).then(function(getBalance){console.log(getBalance);}).catch(function(e){console.log(e);});
//4.3 Get the current WorkingHours of the Smart Contract
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('getCount()')},(err, machineCounter) => {var MC = web3.utils.toDecimal(machineCounter); console.log(MC)});
//4.4 Show if CounterLimit is already reached
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('getConfirmationOwner()')},(err, ConfirmationOwner) => {var CO = web3.utils.toDecimal(ConfirmationOwner); console.log(CO)});
//4.5 Show if Owner confirmed
web3.eth.call({to:CaD, data:web3Abi.encodeFunctionSignature('getConfirmationPartner()')},(err, ConfirmationPartner) => {var CP = web3.utils.toDecimal(ConfirmationPartner); console.log(CP)});
//4.6 Show if Partner confirmed