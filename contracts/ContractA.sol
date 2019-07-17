pragma solidity >=0.4.25 <0.6.0;

contract CountAndDeposit {
    
    address payable contractOwner;
    address payable contractPartner;
    address payable contractAddress;
    uint256 ConfirmationOwner;
    uint256 ConfirmationPartner;
    mapping(address => uint256) machineBalance;
    mapping(address => uint256) machineCounter;
    uint counterLimit;
    uint balanceLimit;
    uint confOwner;
    uint confPartner;
    uint stampOwner;
    uint stampPartner;
    uint serviceType;

    
    
// HIER DEFINIEREN WIR DEN CONTRACT
     // hier wird der contractOwner definiert
     // geschieht bei der Erstellung der Contract-Instanz
     constructor() public {
         contractOwner = msg.sender;
     }
     
// HIER DEFINIEREN WIR UNSERE REQUIRE MODIFIER
     // Nur der contractOwner darf die Funktion ausführen
     modifier _Owner {
         require (msg.sender == contractOwner);
         _;
     }
     
     // Nur der contractPartner darf die Funktion ausführen
     modifier _Partner {
         require (msg.sender == contractPartner);
         _;
     }
     
     // Nur der contractOwner und der contractPartner dürfen die Funktion ausführen
     modifier _OwnerAndPartner {
         require (msg.sender == contractOwner || msg.sender == contractPartner);
         _;
     }

// HIER DEFINIEREN WIR UNSERE INPUT VARIABLEN     
     // hier wird der contractPartner definiert
     // kann nur vom contractOwner definiert werden
     function setContractPartner(address payable input) public _Owner{
         contractPartner = input;
     }
     
     // legt das Limit für Maschinenstunden fest
     // kann nur vom contractOwner definiert werden
     function setCounterLimit(uint input) public _Owner{
         counterLimit = input;
     }
     
     // legt das Limit für Maschinenstunden fest
     // kann nur vom contractOwner definiert werden
     function setBalanceLimit(uint input) public _Owner{
         balanceLimit = input;
     } 
     
// HIER SIND FUNKTIONEN, UM DEN CONTRACT ZU NUTZEN
// INPUT
    // erhöht Counter für Maschinenstunden des owners
    // (also der Maschine, die den Contract angelegt hat)
    function increase(uint256 input) public payable _Owner{
        machineCounter[contractOwner] += input;
        machineBalance[contractOwner] +=msg.value;
    }
    
    // Maschine schickt Bestätigung an Smart Contract (0 oder 1)
    // kann nur von der Maschine ausgeführt werden und es darf noch keine Bestätigung im SC sein
    function setConfirmationOwner(uint input) public {
        require (msg.sender == contractOwner && ConfirmationOwner < 1);
        ConfirmationOwner = input;
        stampOwner = now;
    }
    
    // Dienstleister schickt Bestätigung an Smart Contract (0 oder 1)
    // kann nur vom Dienstleister ausgeführt werden und es darf noch keine Bestätigung im SC sein
    function setConfirmationPartner(uint input) public {
        require (msg.sender == contractPartner && ConfirmationPartner < 1);
        ConfirmationPartner = input;
        stampPartner = now;
    }
    
     function getStampOwner() public view _Owner returns (uint)  {
         return stampOwner;
     }
     
     function getStampPartner() public view _Owner returns (uint) {
         return stampPartner;
     }

// HIER KANN MAN DEN STATUS DES CONTRACT PRÜFEN
// ALLE GET FUNKTIONEN
// OUTPUT
     // gibt counterLimit zurück
     // kann von allen genutzt werden
     function getCounterLimit() public view _OwnerAndPartner returns (uint) {
             return counterLimit;
     }
    
     // gibt balanceLimit zurück
     // kann von allen genutzt werden
     function getBalanceLimit() public view _OwnerAndPartner returns (uint) {
             return balanceLimit;
     }
     
    // LEDIGLICH FÜR TESTZWECKE [bei finalem Deployment nicht mehr im Code]
        // gibt Adresse des contractPartner zurück
        // kann nur vom contractOwner genutzt werden
        function getContractPartner() public view _Owner returns (address) {
            return contractPartner;
        }
    
        // gibt Adresse des contractPartner zurück
        // kann nur vom contractOwner genutzt werden
        function getContractOwner() public view _OwnerAndPartner returns (address) {
            return contractOwner;
        }
    
        // gibt Adresse des Contracts zurück
        // kann nur vom contractOwner genutzt werden
        function getContractAddress() public view _OwnerAndPartner returns (address) {
            return address(this);
        }
    
    // überprüft und gibt die Balance des owners 
    // (also die Einzahlungen der Maschine) zurück
    function getBalance() public view _OwnerAndPartner returns (uint) {
            return machineBalance[contractOwner];
    }
    
    // überprüft und gibt den Counter des owners
    // (also die Maschinenstunden der Maschine) zurück
    function getCount() public view _OwnerAndPartner returns (uint) {
           return machineCounter[contractOwner];
    }

    // gibt Signal zurück, ob Maschinenbestätigung eingegangen ist, oder nicht
    function getConfirmationOwner() public view _OwnerAndPartner returns (uint) {
           return ConfirmationOwner;
    }
    
    // gibt Signal zurück, ob Bestätigung des Dienstleisters eingegangen ist, oder nicht
    function getConfirmationPartner() public view _OwnerAndPartner returns (uint) {
           return ConfirmationPartner;
    }

    // überprüft, ob von beiden Parteien (Maschine und Dienstleister) die Bestätigungen eingegangen
    // sind
    // gibt Ja/Nein Wert aus
    function checkConfirmationAndSendPayment() public _OwnerAndPartner {
         if (ConfirmationOwner == 1 && ConfirmationPartner == 1) {
         contractPartner.transfer(address(this).balance);
        }
    }
    
// zusätzliche Funktionen einschließlich der selfdestruct funktion als Abschluss der funktion
// Certificate muss noch genau dargestellt und in Funkltion eingebaut werden
    
    
    // Checkt das CounterLimit(balance) und sendet automatisch eine Zahlung an den ContractPartner 
    // in Höhe des Smart Contrat Limits
    function checkCounterLimit() public view _OwnerAndPartner returns (uint) {
        if (address(this).balance >= balanceLimit) return (1);
        else return (0);
    }
}