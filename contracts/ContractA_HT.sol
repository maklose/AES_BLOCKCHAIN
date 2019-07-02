pragma solidity >=0.4.25 <0.6.0;


contract CounterPay1 {
    
    mapping(address => uint256) MachineDeposits;
    mapping(address => uint256) MachineHours;
    mapping(address => uint256) ConfirmationMachine;
    mapping(address => uint256) ConfirmationDienstleister;
    
    function riseCounterA(uint input)  public payable{
        MachineHours[msg.sender] += input;
        MachineDeposits[msg.sender] += msg.value;
    }
    function getBalance() public view returns (uint) {
        return MachineDeposits[msg.sender];
     
    }
    function getCountA() public view returns (uint) {
           return MachineHours[msg.sender];
    }

    function CheckLimitCountA() public view returns (bool) {
        if (MachineHours[msg.sender] < 400) return false;
        else return true;
    }
    // Wenn Bestätigungen in Form von Data von beiden Teilnehmern eingegangen sind
    // schmeißt der Smart Contract boolean Werte aus
    
    function ConfirmationMachine1(uint input) public view {
        address Maschine = msg.sender;
        ConfirmationMachine + 1;    //eventuell smarter dazu noch den Timestamp zu überprüfen
    }
    
    function ConfirmationDienstleister1 (uint input) public view {
        address Dienstleister = msg.sender;
        ConfirmationDienstleister + 1;
    }
        
    function ConfirmMain () public view returns (bool){
        if (ConfirmationMachine[CounterPay1] = 1) & (ConfirmationDienstleister[CounterPay1] = 1);
        return true;
        else return false
    }
}