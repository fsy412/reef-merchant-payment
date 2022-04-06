import React, { useState, createContext, useEffect } from 'react';
import { ethers, Contract, utils } from 'ethers';
import Web3Modal from 'web3modal';
// import {
//     swapBSCAddress,
//     swapETHAddress,
// } from '../config/contractAddresses';
const Web3Context = createContext(null);

export const Web3Provider = (props:any) => {
    const [account, setAccount] = useState('');
    const [signer, setSigner] = useState(null);
    const [blockchainId, setBlockchainId] = useState(0);

    const functionsToExport = {
        connectWallet: () => {},
    }

    useEffect(() => {
        const checkConnection = async () => {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
    
            const { chainId } = await provider.getNetwork();
            setBlockchainId(chainId);
            const addresses = await provider.listAccounts();
            if (addresses.length) {
              setAccount(addresses[0]);
            } else {
              return;
            }
          }
        };
        checkConnection();
    }, [blockchainId]);

    functionsToExport.connectWallet = async () => {
        try {
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
    
          const signer = provider.getSigner();
          const userAddress = await signer.getAddress();
          setAccount(userAddress);
          setSigner(signer);
        } catch (error) {
          console.log(error);
        }
    };
    
    return (<Web3Context.Provider value={{ account, ...functionsToExport }}>
      {props.children}
  </Web3Context.Provider>)
}
export default Web3Context;
    