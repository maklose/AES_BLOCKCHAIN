{
    "accounts": {
      "account{0}": "0xca35b7d915458ef540ade6068dfe2f44e8fa733c"
    },
    "linkReferences": {},
    "transactions": [
      {
        "timestamp": 1562159829345,
        "record": {
          "value": "0",
          "parameters": [],
          "abi": "0xad315e209dd62516ab8c7d1c2d8c3c206525501ebef91d12c34431f9ea255371",
          "contractName": "CountAndDeposit",
          "bytecode": "608060405234801561001057600080fd5b5060008054600160a060020a031916331790556102f7806100326000396000f3fe608060405260043610610087577c0100000000000000000000000000000000000000000000000000000000600035046312065fe0811461008c5780633e4ccb40146100b35780637cdacb98146100d2578063992ebc52146101055780639e80c0741461012f578063a87d942c14610159578063a9e0f3ed1461016e578063bdba925514610197575b600080fd5b34801561009857600080fd5b506100a16101ac565b60408051918252519081900360200190f35b6100d0600480360360208110156100c957600080fd5b50356101c9565b005b3480156100de57600080fd5b506100d0600480360360208110156100f557600080fd5b5035600160a060020a0316610201565b34801561011157600080fd5b506100d06004803603602081101561012857600080fd5b503561021b565b34801561013b57600080fd5b506100d06004803603602081101561015257600080fd5b503561023d565b34801561016557600080fd5b506100a1610275565b34801561017a57600080fd5b50610183610291565b604080519115158252519081900360200190f35b3480156101a357600080fd5b506100a16102c5565b60008054600160a060020a03168152600260205260409020545b90565b600054600160a060020a031633146101e057600080fd5b5060008054600160a060020a03168152600260205260409020805434019055565b600054600160a060020a0316331461021857600080fd5b50565b600054600160a060020a0316331461023257600080fd5b600480549091019055565b600054600160a060020a0316331461025457600080fd5b60008054600160a060020a0316815260036020526040902080549091019055565b60008054600160a060020a031681526003602052604090205490565b60045460008054600160a060020a0316815260036020526040812054909111156102bd575060006101c6565b5060016101c6565b6004549056fea165627a7a723058201a121bdbeae9a57ef0a5db7fa36306d68d2ebef9d66b060e41d2989bc12a854a0029",
          "linkReferences": {},
          "name": "",
          "inputs": "()",
          "type": "constructor",
          "from": "account{0}"
        }
      },
      {
        "timestamp": 1562159839969,
        "record": {
          "value": "0",
          "parameters": [
            "100"
          ],
          "to": "created{1562159829345}",
          "abi": "0xad315e209dd62516ab8c7d1c2d8c3c206525501ebef91d12c34431f9ea255371",
          "name": "setCounterLimit",
          "inputs": "(uint256)",
          "type": "function",
          "from": "account{0}"
        }
      }
    ],
    "abis": {
      "0xad315e209dd62516ab8c7d1c2d8c3c206525501ebef91d12c34431f9ea255371": [
        {
          "constant": false,
          "inputs": [
            {
              "name": "input",
              "type": "uint256"
            }
          ],
          "name": "increaseBalance",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "input",
              "type": "uint256"
            }
          ],
          "name": "increaseCounter",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "input",
              "type": "address"
            }
          ],
          "name": "setContractPartner",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "input",
              "type": "uint256"
            }
          ],
          "name": "setCounterLimit",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "checkCounterLimit",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getCounterLimit",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ]
    }
  }