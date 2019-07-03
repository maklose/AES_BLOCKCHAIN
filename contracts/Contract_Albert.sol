pragma solidity >=0.4.25 <0.6.0;

contract CountAndDeposit {
    
    address contractOwner;
    address contractPartner;
    mapping(address => uint256) machineBalance;
    mapping(address => uint256) machineCounter;
    uint counterLimit;
    
    
// HIER DEFINIEREN WIR DEN CONTRACT
     // hier wird der contractOwner definiert
     // geschieht bei der Erstellung der Contract-Instanz
     constructor() public {
         contractOwner = msg.sender;
     }
     
     //hier wird der contractPartner definiert
     //kann nur vom contractPartner definiert werden
     function setContractPartner(address input) public{
         require (msg.sender == contractOwner);
         contractPartner == input;
     }
     
     // legt das Limit für Maschinenstunden fest
     // kann nur vom contractOwner definiert werden
     function setCounterLimit(uint input) public{
         require (msg.sender == contractOwner);
         counterLimit += input;
     }
     
// HIER SIND FUNKTIONEN, UM DEN CONTRACT ZU NUTZEN
// ALLE INCREASE FUNKTIONEN     
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
    
// HIER KANN MAN DEN STATUS DES CONTRACT PRÜFEN
// ALLE GET FUNKTIONEN
     // gibt counterLimit zurück
     // kann von allen genutzt werden
     function getCounterLimit() public view returns (uint) {
         return counterLimit;
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