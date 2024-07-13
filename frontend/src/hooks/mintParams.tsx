import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

import { getLevel } from '../lib/scoreLib';

const signerPrivateKey = import.meta.env.VITE_SIGNER_PRIVATE_KEY;
if (!signerPrivateKey) {
  throw new Error('VITE_SIGNER_PRIVATE_KEY not set in .env');
}
const signer = new ethers.Wallet(signerPrivateKey);

interface MintParams {
  address: `0x${string}` | undefined
  totalScore: number
}

export const useMintParams = ({ address, totalScore }: MintParams) => {

  const [canMint, setCanMint] = useState(false);
  const [messageHash, setMessageHash] = useState('');
  const [signature, setSignature] = useState('');
  const [level, setLevel] = useState(0);

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
    const _level = await getLevel(totalScore);
    setLevel(_level);
    const _canMint = canMintForLevel(_level);
    setCanMint(_canMint);
    if (_canMint) {
      const { messageHash, signature } = await signClaim(_level);
      setMessageHash(messageHash);
      setSignature(signature);
    }
  }

  useEffect(() => {
    getMintParams();
  }, [address, totalScore]);

  return { canMint, messageHash, signature, level };

};
