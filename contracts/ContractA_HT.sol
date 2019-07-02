pragma solidity >=0.4.25 <0.6.0;


contract CounterPay1 {
    


    
    mapping(address => uint256) MachineDeposits;
    mapping(address => uint256) MachineHours;
    mapping(constant => uint256) ConfirmationMaschine;
    mapping(constant => uint256) ConfirmationDienstleister;
    
    
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
    
    function ConfirmationMachine1(uint input) public view {
       ConfirmationMaschine + 1;    //eventuell smarter dazu noch den Timestamp zu überprüfen
    }
    
    function ConfirmationDienstleister1 (uint input) public view {
        ConfirmationDienstleister + 1;
    }
        
    function ConfirmMain () public view returns (bool){
        if (ConfirmationMaschine = 1 & ConfirmationDienstleister = 1) return true;
        else return false;
    }
    
}