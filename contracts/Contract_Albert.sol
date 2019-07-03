pragma solidity >=0.4.25 <0.6.0;

contract CountAndDeposit {
    
    address contractOwner;
    address contractPartner;
    mapping(address => uint256) machineBalance;
    mapping(address => uint256) machineCounter;
    uint counterLimit;
    
     constructor() public {
         contractOwner = msg.sender;
     }

     function setCounterLimit(uint input) public{
         require (msg.sender == contractOwner);
         counterLimit += input;
     }
     
     function getCounterLimit() public view returns (uint) {
         return counterLimit;
     }
     
    // erhöht Counter für Maschinenstunden des owners
    // (also der Maschine, die den Contract angelegt hat)
    function increaseCounter(uint input) public{
        require (msg.sender == contractOwner);
        machineCounter[contractOwner] += input;
    }
    // erhöht Balance des owners 
    // (also die Summe der anteiligen Ether-Zahlungen)
    function increaseBalance(uint input) public payable{
        require (msg.sender == contractOwner);
        machineBalance[contractOwner] += msg.value;
    }
    // überprüft und gibt die Balance des owners 
    // (also die Einzahlungen der Maschine) zurück
    function getBalance() public view returns (uint) {
        return machineBalance[contractOwner];
    }
    
    // überprüft und gibt den Counter des owners
    // (also die Maschinenstunden der Maschine) zurück
    function getCount() public view returns (uint) {
           return machineCounter[contractOwner];
    }
    // überprüft, ob das vertraglich festgelegte Limit 
    // der Maschinenstunden (MachineCounter) 
    // erreicht oder überschritten wurde und gibt 
    // true für MachineCounter > Limit
    // false für MachineCounter < Limit
    function checkCounterLimit() public view returns (bool) {
        if (machineCounter[contractOwner] < counterLimit) return false;
        else return true;
    }
}