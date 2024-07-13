import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

const signerPrivateKey = import.meta.env.VITE_SIGNER_PRIVATE_KEY;
if (!signerPrivateKey) {
  throw new Error('VITE_SIGNER_PRIVATE_KEY not set in .env');
}
const signer = new ethers.Wallet(signerPrivateKey);

// create a function to decide number of points needed to mint for a given level

const MIN_SCORE_FOR_LEVEL: { [key: number]: number } = {
  1: 20,
  2: 50,
  3: 100,
};

export const useMintParams = () => {

  const address = '0x7D01abEdFD20BFdFDef2EBF2Ba1a42Ea2179160b'; // TODO: get user address from context
  const [canMint, setCanMint] = useState(false);
  const [messageHash, setMessageHash] = useState('');
  const [signature, setSignature] = useState('');
  const [level, setLevel] = useState(0);

  async function getScore() {
    // get score from backend
    return 1000;
  }

  async function getLevel() {
    const score = await getScore();
    let level = 0;
    for (let i = 1; i <= 3; i++) {
      if (score >= MIN_SCORE_FOR_LEVEL[i]) {
        level = i;
      } else {
        break;
      }
    }
    return level;
  }

  function canMintForLevel(level: number) {
    //TODO: check if user already has a token for this level
    return level > 0;
  }

  async function signClaim(level: number) {
    const message = `${address} claims token for level ${level}`;
    const messageHash = ethers.utils.id(message);
    const messageBytes = ethers.utils.arrayify(messageHash);
    const signature = await signer.signMessage(messageBytes);
    return { messageHash, signature };
  }

  async function getMintParams() {
    const _level = await getLevel();
    setLevel(_level);
    const _canMint = canMintForLevel(_level);
    setCanMint(_canMint);
    if (_canMint) {
      const { messageHash, signature } = await signClaim(level);
      setMessageHash(messageHash);
      setSignature(signature);
    }
  }

  useEffect(() => {
    getMintParams();
  }, []);

  return { canMint, messageHash, signature, level };

};
