import { useEffect, useState } from "react";
import { getSdk } from "../lib/circlesLib";

import { switchChain } from '@wagmi/core';
import { gnosisChiado } from 'viem/chains';
import { config } from '../lib/wagmi';

export const useAvatar = () => {

  const [avatar, setAvatar] = useState<any>();
  const [avatarType, setAvatarType] = useState<string>("");

  const registerAvatar = async () => {
    await switchChain(config, { chainId: gnosisChiado.id });
    const sdk = await getSdk();
    const avatar = await sdk.registerHuman();
    setAvatarType(avatar.avatarInfo?.type || "");
    setAvatar(avatar);
  }

  async function fetchAvatar() {
    try {
      const sdk = await getSdk();
      const avatar = await sdk.getAvatar(sdk?.contractRunner.address);
      setAvatarType(avatar.avatarInfo?.type || "");
      setAvatar(avatar);
    } catch (error) {
      console.error("Error fetching avatar", error);
    }
  }

  useEffect(() => {
    fetchAvatar();
  }, []);

  return { avatar, avatarType, registerAvatar };
}