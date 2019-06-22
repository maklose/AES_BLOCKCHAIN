pragma solidity >=0.4.25 <0.6.0;



contract NewCounter {
    uint private count = 0;
    function riseCounter(uint input) public{ 
        count + input;
    }
    function getNewCount() public view returns (uint) {
        return count;
    }
}