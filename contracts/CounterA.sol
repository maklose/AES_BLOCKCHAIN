pragma solidity >=0.4.25 <0.6.0;



contract CounterA {
    uint private count = 0;
    function riseCounterA(uint input) public{ 
        count += input;
    }
    function getCountA() public view returns (uint) {
        return count;
    }
}