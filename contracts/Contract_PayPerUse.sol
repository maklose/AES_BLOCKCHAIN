pragma solidity >=0.4.25 <0.7.0;

contract PayPerUse {
 
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
        contractPartner.transfer(transferAmount);
        this.refund;
    }   
    
    function payService() public payable{
        contractPartner.transfer(transferAmount);
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