# Short description
Buzz is an on-chain reputation system for DeFi Degens, rewarding legitimate transactions with cool NFTs and boosting trust while identifying and blocking bots and Sybil wallets. Earn your way from DeFi Explorer to DeFi Degen with each verified transaction!

# Long Description
    
**Buzz** is an on-chain reputation system designed specifically for DeFi enthusiasts, also known as DeFi degens. The platform analyzes users' wallets and assigns scores based on various DeFi activities, helping to build trust and reward legitimate behavior within the DeFi ecosystem. 
    
Key Features

1. **Wallet Analysis and Scoring**:
- **Activity-Based Scoring**: Wallets are evaluated based on the number and type of DeFi actions performed, such as:
    - **Wrapping Assets**: Converting tokens into different formats for use on other platforms.
    - **Transaction Count**: The number of transactions executed.
    - **Bridging**: Transferring assets across different blockchains.
    - **Providing Liquidity (LP)**: Supplying assets to liquidity pools.
    - **NFT Activities**: Involvement in buying, selling, or holding NFTs.
- **Chain-Specific Scores**: Recognizes that actions may differ across various blockchain networks and adjusts scores accordingly.
2. **Score Optimization**:
- **Action Analysis**: Users can see which actions contribute the most to their scores.
- **Repeat Actions**: Encourages users to repeat high-scoring actions to improve their overall reputation score.
- **Rewards**: Scores can be increased to unlock rewards, providing an incentive for continued legitimate activity.
3. **NFT Rewards System**:
- **Progressive Rewards**: As scores increase, users earn NFTs that represent different levels of achievement.
- **Community Building**: NFTs act as badges of honor, helping to foster a sense of community and belonging among users.
4. **Protocol Dashboard**:
- **Legitimate Wallet Identification**: Protocols can use Buzz to identify and verify legitimate wallets based on their scores.
- **Custom Scoring Systems**: Protocols can set up specific scoring criteria to identify top performers and reward them accordingly.
- **Enhanced Security**: Helps protocols differentiate between genuine users and potential Sybil or bot-controlled wallets.

# How its made

Buzz is an on-chain reputation system built with a combination of cutting-edge technologies to create a seamless, secure, and engaging user experience for DeFi enthusiasts. Here’s a detailed breakdown of how we built the project:

### Technologies Used

1. **Privy and Web3Auth for Seamless Login**:
    - **Privy**: Used to handle user data securely and provide seamless integration with various blockchain networks.
    - **Web3Auth**: Facilitates easy and secure login for users, allowing them to connect their wallets without friction.
2. **Blockchain Analysis**:
    - **Supported Chains**: Buzz currently supports Flare, Morph, and Scroll networks. These chains were chosen for their innovative features and active DeFi ecosystems.
    - **Transaction Analysis**: Once a user logs in, their connected wallet is analyzed for DeFi activities such as wrapping assets, transaction counts, bridging, providing liquidity, and NFT transactions. The analysis is specific to the chain they are connected with.
3. **Credit Scoring and NFT Rewards**:
    - **Credit Scoring Algorithm**: We developed an algorithm that assigns scores based on the user's DeFi activities. The more active and diverse their participation, the higher their score.
    - **NFT Minting**: Users receive NFTs based on their scores:
        - **Explorer NFT** for beginners.
        - **Adventurer NFT** for intermediate users.
        - **DeFi Degen NFT** for advanced users.
4. **Transaction Visibility**:
    - **Blockscout Integration**: All transactions, including NFT minting, can be tracked on Blockscout, providing transparency and trust in the system.
5. **Community Engagement and Rewards**:
    - **Circles Integration**: We use Circles to reward users who increase their DeFi activity. This helps build a community around Buzz and incentivizes continued participation.

  # Implementation

  This project is made of:
  1. frontend: The react application to see your Wallet Analytics and scoring and mint the rewards
  2. trustScoreNFT: A Hardhat project with our NFT smart contract to have an on-chain proof of your score for each chain
  3. protocol_data_backend_service: A set of backend scripts to retrieve and analyse on chain data

# Team
Our team is made of 5 people:
- Aya: Frontend developer
- Floriane: Fullstack developer
- Gyanlakshmi: Blockchain Eng
- Laisha: Blockchain Eng
- Srilakshmi: Project manager
