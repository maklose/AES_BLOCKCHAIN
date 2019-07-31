pragma solidity >=0.4.25 <0.7.0;

library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }
    
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}

contract PayPerUse {
    
    using SafeMath for uint256;
 
    address payable contractOwner;
    address payable contractPartner;
    address payable contractAddress;
    uint256 machineCounter;
    uint counterLimit;
    uint256 transferAmount;
    uint price;
    uint balanceLimit;
    uint restAmount;
    
    constructor() public {
        contractOwner = msg.sender;
    }
    
    function setContractPartner(address payable input) public {
        require (msg.sender == contractOwner);
        contractPartner = input;
    }
    
    
    function setPrice(uint input) public {
        require (msg.sender == contractOwner);
        price = input;
    }
    
    function getPrice() public view returns(uint) {
        return price;
    }
    
    function increase(uint256 input) public payable {
        require ((msg.sender == contractOwner));
        machineCounter += input;
        transferAmount = (input * price);
        contractPartner.transfer(transferAmount * 10**18);
        this.refund;
    }
    
    function payService() public payable{
        contractPartner.transfer(transferAmount * 10**18);
    }
    
    function refund() public payable {
        restAmount = (address(this).balance);
        contractOwner.transfer(restAmount);
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
        return machineCounter;
    }
    
}