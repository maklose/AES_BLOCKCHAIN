pragma solidity >=0.4.25 <0.6.0;



contract CounterA {
    uint private count = 0;
    function riseCounterA(uint input) public{ 
        count += input;
    }
    function getCountA() public view returns (uint) {
        return count;
    }
    // Events dienen in erster Linie nur dazu bestimmte Events (Transaktionen, Funktionen) für andere
    // sichtbar zu machen
    // Events können auch von JSON RPC API gelesen werden!
    event checkConditions(
    );    
        
    function sendEther() public returns (bool) {
        if (count < 400) return false;
        if (count >= 400) return true;
    }
}