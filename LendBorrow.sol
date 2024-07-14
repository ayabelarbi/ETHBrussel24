// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDeFi {
    mapping(address => uint) public balances;
    mapping(address => uint) public loans;
    uint public totalDeposits;
    uint public totalLoans;

    Storage storageContract;

    constructor(address _storageContract) {
        storageContract = Storage(_storageContract);
    }
    
    // Deposit Ether into the contract
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        totalDeposits += msg.value;
    }
    
    // Withdraw Ether from the contract
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        totalDeposits -= amount;
        payable(msg.sender).transfer(amount);
    }
    
    // Borrow Ether from the contract
    function borrow(uint amount) public {
        //Use the points logic to give discount on collateral
        uint256 score = getUserScore(msg.sender);
        if(score > 10) {
            require(balances[msg.sender] >= amount / 3, "Insufficient collateral");
        }
        else {
            require(balances[msg.sender] >= amount / 3, "Insufficient collateral");
        }
        loans[msg.sender] += amount;
        totalLoans += amount;
        payable(msg.sender).transfer(amount);
    }
    
    // Repay the loan
    function repay() public payable {
        require(loans[msg.sender] > 0, "No outstanding loan");
        require(msg.value >= loans[msg.sender], "Insufficient repayment amount");
        
        loans[msg.sender] -= msg.value;
        totalLoans -= msg.value;
    }

    //Get the score
    function getUserScore(address _user) public view returns(uint256){
        return storageContract.retrieve(_user);
    }
}

contract Storage {

    mapping(address => uint256) userScoreMap;

    /**
     * @dev Store score in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        userScoreMap[msg.sender] = num;
    }

    /**
     * @dev Return score 
     * @return value of 'number'
     */
    function retrieve(address user) public view returns (uint256){
        return userScoreMap[user];
    }
}
