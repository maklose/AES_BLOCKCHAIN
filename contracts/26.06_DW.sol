pragma solidity >=0.4.25 <0.6.0;



contract CounterPay1 {
    mapping(address => uint256) Deposits;
    mapping(address => uint256) Hours;
    function riseCounterA(uint input)  public payable{
        Hours[msg.sender] += input;
        Deposits[msg.sender] += msg.value;
    }
    function getCountA() public view returns (uint) {
        return Deposits[msg.sender];
     
    }
    function getBalance() public view returns (uint) {
           return Hours[msg.sender];
    }
}