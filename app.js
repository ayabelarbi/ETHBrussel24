document.addEventListener('DOMContentLoaded', () => {
    let provider;
    let signer;
    let contract;
    const contractAddress = '0x4Fa89b1757Ac894740Dc94e0a695D3963fA7834e';
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "borrow",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "repay",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_storageContract",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getUserScore",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "loans",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalDeposits",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalLoans",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    async function init() {
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    async function deposit() {
        const amount = document.getElementById('depositAmount').value;
        const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        console.log('Deposit successful');
    }

    async function withdraw() {
        const amount = document.getElementById('withdrawAmount').value;
        const tx = await contract.withdraw(ethers.utils.parseEther(amount));
        await tx.wait();
        console.log('Withdraw successful');
    }

    async function borrow() {
        const amount = document.getElementById('borrowAmount').value;
        const accounts = await provider.listAccounts();
        const userAddress = accounts[0];
        const score = await contract.getUserScore(userAddress);

        if (score > 0) {
            alert("Congratulations, your " + score + " buzz points have given you a discounted collateral ");
        } else {
            alert("Sorry, you have " + score + " buzz points :(. Your collateral remains the same");
        }

        const tx = await contract.borrow(ethers.utils.parseEther(amount));
        await tx.wait();
        console.log('Borrow successful');
    }

    async function repay() {
        const amount = document.getElementById('repayAmount').value;
        const tx = await contract.repay({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        console.log('Repay successful');
    }

    window.deposit = deposit;
    window.withdraw = withdraw;
    window.borrow = borrow;
    window.repay = repay;

    init();
});
