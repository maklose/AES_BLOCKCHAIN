pragma solidity >=0.4.25 <0.6.0;


contract CounterPay1 {
    
    
    mapping(address => uint256) MachineDeposits;
    mapping(address => uint256) MachineHours;
    mapping(address => bool) ConfirmationMaschine;
    mapping(address => bool) ConfirmationDienstleister;
    
    
    function increaseCounter_Balance(uint input)  public payable{
        MachineHours[msg.sender] += input;
        MachineDeposits[msg.sender] += msg.value;
    }
    function getBalance() public view returns (uint) {
        return MachineDeposits[msg.sender];
     
    }
    function getCount() public view returns (uint) {
           return MachineHours[msg.sender];
    }

    function checkLimitCount() public view returns (bool) {
        if (MachineHours[msg.sender] < 400) return false;
        else return true;
    }
    
    // Wenn Bestätigungen in Form von Data von beiden Teilnehmern eingegangen sind
    // schmeißt der Smart Contract boolean Werte aus
    // Versuch 1, einfach das gleiche Prinzip wie mit Maschinenstunden, funktioniert aber nur so halb

    function ConfirmationMaschine1(bool input) public {
        ConfirmationMaschine[msg.sender] = true;
}

    function ConfirmationDienstleister1(bool input) public {
        ConfirmationDienstleister[msg.sender] = true;
}

    function checkConfirmation(bool) public payable returns (bool) {
        if (ConfirmationMaschine[msg.sender] = true) return true;
        else return false;
    }

    // Versuch 2, die Maschine und der Dienstleister schreiben beide im data Teil die Bestätigung (bool)
    // Bedingung ließt beide Tabellen im SC aus und gibt bool-Ergebnis wieder, funktioniert aber noch nicht
    
    // Um den obigen Code zu compilen und zu deployen muss der untere Teil
    // von Zeile 50-64 rausgelöscht werden!

     function ConfirmationMaschine1(bool input) public view {
       ConfirmationMaschine[msg.sender] = true;    //eventuell smarter dazu noch den Timestamp zu überprüfen
    }
    
    function ConfirmationDienstleister1(bool input) public view {
        ConfirmationDienstleister[msg.sender] = true;
    }
        
    function ConfirmMain() internal view returns (bool){
        if ((ConfirmationMaschine[msg.sender], true) and (ConfirmationDienstleister[msg.sender], true)) return true;
    } else 
    { return false;
    }

}