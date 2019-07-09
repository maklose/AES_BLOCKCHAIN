pragma solidity >=0.4.25 <0.6.0;

contract CountAndDeposit {
    
    address contractOwner;
    address contractPartner;
    address contractAddress;
    bool ConfirmationOwner;
    bool ConfirmationPartner;
    mapping(address => uint256) machineBalance;
    mapping(address => uint256) machineCounter;
    uint counterLimit;
    uint confOwner;
    uint confPartner;

    
    
// HIER DEFINIEREN WIR DEN CONTRACT
     // hier wird der contractOwner definiert
     // geschieht bei der Erstellung der Contract-Instanz
     constructor() public {
         contractOwner = msg.sender;
     }
     

     
     // hier wird der contractPartner definiert
     // kann nur vom contractOwner definiert werden
     function setContractPartner(address input) public{
         require (msg.sender == contractOwner);
         contractPartner = input;
     }
     
     // legt das Limit für Maschinenstunden fest
     // kann nur vom contractOwner definiert werden
     function setCounterLimit(uint input) public{
         require (msg.sender == contractOwner);
         counterLimit = input;
     }
     
// HIER SIND FUNKTIONEN, UM DEN CONTRACT ZU NUTZEN
// INPUT
    // erhöht Counter für Maschinenstunden des owners
    // (also der Maschine, die den Contract angelegt hat)
    function increase(uint input) public payable{
        require (msg.sender == contractOwner);
        machineCounter[contractOwner] += input;
        machineBalance[contractOwner] +=msg.value;
    }
    
    // Maschine schickt Bestätigung an Smart Contract (boolsches Signal)
    // kann nur von der Maschine ausgeführt werden
    function setConfirmationOwner(bool input) public {
        require (msg.sender == contractOwner);
        ConfirmationOwner = input;
    }
    
    // Dienstleister schickt Bestätigung an Smart Contract (boolsches Signal)
    // kann nur vom Dienstleister ausgeführt werden
    function setConfirmationPartner(bool input) public {
        require (msg.sender == contractPartner);
        ConfirmationPartner = input;
    }

// HIER KANN MAN DEN STATUS DES CONTRACT PRÜFEN
// ALLE GET FUNKTIONEN
// OUTPUT
     // gibt counterLimit zurück
     // kann von allen genutzt werden
     function getCounterLimit() public view returns (uint) {
         return counterLimit;
     }
    
    // LEDIGLICH FÜR TESTZWECKE [bei finalem Deployment nicht mehr im Code]
        // gibt Adresse des contractPartner zurück
        // kann nur vom contractOwner genutzt werden
        function getContractPartner() public view returns (address) {
            require (msg.sender == contractOwner);
            return contractPartner;
        }
    
        // gibt Adresse des contractPartner zurück
        // kann nur vom contractOwner genutzt werden
        function getContractOwner() public view returns (address) {
            require (msg.sender == contractOwner);
            return contractOwner;
        }
    
        // gibt Adresse des Contracts zurück
        // kann nur vom contractOwner genutzt werden
        function getContractAddress() public view returns (address) {
            require (msg.sender == contractOwner);
            return address(this);
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

    // gibt Signal zurück, ob Maschinenbestätigung eingegangen ist, oder nicht
    function getConfirmationOwner() public view returns (bool) {
           return ConfirmationOwner;
    }
    
    // gibt Signal zurück, ob Bestätigung des Dienstleisters eingegangen ist, oder nicht
    function getConfirmationPartner() public view returns (bool) {
           return ConfirmationPartner;
    }

    // überprüft, ob von beiden Parteien (Maschine und Dienstleister) die Bestätigungen eingegangen
    // sind
    // gibt Ja/Nein Wert aus
    function checkConfirmation() public view returns (bool) {
        if (ConfirmationOwner == true && ConfirmationPartner == true) return true;
        else return false;
    }

    // überprüft, ob das vertraglich festgelegte Limit 
    // der Maschinenstunden (MachineCounter) 
    // erreicht oder überschritten wurde und gibt 
    // true für MachineCounter > Limit
    // false für MachineCounter < Limit
    function checkCounterLimit() public view returns (bool) {
        if (machineCounter[contractOwner] >= counterLimit) return true;
        else return false;
    }
}