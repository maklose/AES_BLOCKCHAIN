pragma solidity >=0.4.25 <0.7.0;

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

// HIER DEFINIEREN WIR UNSERE INPUT VARIABLEN     
     // hier wird der contractPartner definiert
     // kann nur vom contractOwner definiert werden
     function setContractPartner(address payable input) public {
         require (msg.sender == contractOwner);
         contractPartner = input;
     }
     
     // legt das Limit für Maschinenstunden fest
     // kann nur vom contractOwner definiert werden
     function setCounterLimit(uint input) public {
         require (msg.sender == contractOwner);
         counterLimit = input;
     }
     
     // legt das Limit für Maschinenstunden fest
     // kann nur vom contractOwner definiert werden
     function setBalanceLimit(uint input) public {
         require (msg.sender == contractOwner);
         balanceLimit = input;
     } 
     
// HIER SIND FUNKTIONEN, UM DEN CONTRACT ZU NUTZEN
// INPUT
    // erhöht Counter für Maschinenstunden des owners
    // (also der Maschine, die den Contract angelegt hat)
    function increase(uint256 input) public payable {
        require (msg.sender == contractOwner);
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
    
     function getStampOwner() public view returns (uint)  {
         require (msg.sender == contractOwner);
         return stampOwner;
     }
     
     function getStampPartner() public view returns (uint) {
         require (msg.sender == contractOwner);
         return stampPartner;
     }

// HIER KANN MAN DEN STATUS DES CONTRACT PRÜFEN
// ALLE GET FUNKTIONEN
// OUTPUT
     // gibt counterLimit zurück
     // kann von allen genutzt werden
     function getCounterLimit() public view returns (uint) {
             require (msg.sender == contractOwner || msg.sender == contractPartner);
             return counterLimit;
     }
    
     // gibt balanceLimit zurück
     // kann von allen genutzt werden
     function getBalanceLimit() public view returns (uint) {
             require (msg.sender == contractOwner || msg.sender == contractPartner);
             return balanceLimit;
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
            require (msg.sender == contractOwner || msg.sender == contractPartner);
            return contractOwner;
        }
    
        // gibt Adresse des Contracts zurück
        // kann nur vom contractOwner genutzt werden
        function getContractAddress() public view returns (address) {
            require (msg.sender == contractOwner || msg.sender == contractPartner);
            return address(this);
        }
    
    // überprüft und gibt die Balance des owners 
    // (also die Einzahlungen der Maschine) zurück
    function getBalance() public view returns (uint) {
            require (msg.sender == contractOwner || msg.sender == contractPartner);
            return (address(this).balance / 10**18);
    }
    
    // überprüft und gibt den Counter des owners
    // (also die Maschinenstunden der Maschine) zurück
    function getCount() public view returns (uint) {
           require (msg.sender == contractOwner || msg.sender == contractPartner);
           return machineCounter[contractOwner];
    }

    // gibt Signal zurück, ob Maschinenbestätigung eingegangen ist, oder nicht
    function getConfirmationOwner() public view returns (uint) {
           require (msg.sender == contractOwner || msg.sender == contractPartner);
           return ConfirmationOwner;
    }
    
    // gibt Signal zurück, ob Bestätigung des Dienstleisters eingegangen ist, oder nicht
    function getConfirmationPartner() public view returns (uint) {
           require (msg.sender == contractOwner || msg.sender == contractPartner);
           return ConfirmationPartner;
    }

    // überprüft, ob von beiden Parteien (Maschine und Dienstleister) die Bestätigungen eingegangen
    // sind
    // gibt Ja/Nein Wert aus
    function checkConfirmationAndSendPayment() public returns (address, address, address, uint256, uint256, uint, uint, uint) {
         require (msg.sender == contractOwner || msg.sender == contractPartner);
         if (ConfirmationOwner == 1 && ConfirmationPartner == 1 && ((address(this).balance / 10**18) >= balanceLimit) && (balanceLimit != 0)) {
         contractPartner.transfer(address(this).balance);
         return (contractOwner, contractPartner, address(this), ConfirmationOwner, ConfirmationPartner, counterLimit, stampOwner, stampPartner);
        }
    }
    
// zusätzliche Funktionen einschließlich der selfdestruct funktion als Abschluss der funktion
// Certificate muss noch genau dargestellt und in Funkltion eingebaut werden
    
    
    // Checkt das BalanceLimit(balance) und sendet automatisch eine Zahlung an den ContractPartner 
    // in Höhe des Smart Contrat Limits
    function checkBalanceLimit() public view returns (uint) {
        require (msg.sender == contractOwner || msg.sender == contractPartner);
        if (((address(this).balance / 10**18) >= balanceLimit) && (balanceLimit != 0)) return (1);
        else return (0);
    }
    
    
// AB HIER BEGINNT DER CODE FÜR DAS ZERTIFIKAT 
    // Erst werden die Adressen auf Typ uint gemappt
    // Dann werden alle zertifikatsbezogenen Werte in einer Funktion ausgegeben
    function getCertificate() public view 
        returns (address, address, address, uint256, uint256, uint, uint, uint) {
        return (contractOwner, contractPartner, address(this), ConfirmationOwner, ConfirmationPartner, counterLimit, stampOwner, stampPartner);
    }

    // Ein Event wird erstellt mit den relevanten Informationen
    event Zertifikat(
            address _contractOwner,
            address _contractPartner,
            uint _ConfirmationOwner,
            uint _ConfirmationPartner,
            uint _counterLimit,
            uint _stampOwner,
            uint _stampPartner
        );
    // Die Funktion schmeißt das Zertifikat aus
    // Hier wird der Input des Zertifikats nochmal definiert
    function zertifikat() public {
        emit Zertifikat(
            contractOwner, 
            contractPartner,
            ConfirmationOwner,
            ConfirmationPartner,
            counterLimit,
            stampOwner,
            stampPartner
            );
    }

}