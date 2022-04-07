import React, { useState, createContext, useEffect } from 'react';
import { ethers, Contract, utils } from 'ethers';
import Web3Modal from 'web3modal';
import erc20Abi from "../contract/abi/erc20.json"
import swapAbi from "../contract/abi/swap.json"
import { getContract } from "../contract/index"
import { CONFIG } from '../config/chain'

const Web3Context = createContext(null);

export const Web3Provider = (props: any) => {
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState(null);
  const [blockchainId, setBlockchainId] = useState(0);

  const getChainSwapAddress = (chainId) => {
    if (chainId == CONFIG.BSC.ChanId) {
      return CONFIG.BSC.SwapAddress
    } else if (chainId == CONFIG.ETH.ChanId) {
      return CONFIG.ETH.SwapAddress
    }
  }

  const functionsToExport = {
    connectWallet: () => { },
    approveSwap: async (erc20, swap, amount) => { },
    getOrderList: (swapAddress) => { },
    createOrder: async (chainFrom, asset_from, amountFrom, chainTo, assetTo, amountTo) => { },
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
      const { chainId } = await provider.getNetwork()

      setBlockchainId(chainId)
      setAccount(userAddress);
      setSigner(signer);
    } catch (error) {
      console.log(error);
    }
  };

  functionsToExport.approveSwap = async (tokenAddress, swapAddress, amount) => {
    const contract = new ethers.Contract(tokenAddress, erc20Abi, signer)
    const transaction = await contract.approve(swapAddress, amount);
    await transaction.wait()
  };

  functionsToExport.getOrderList = async () => {
    let provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-2-s2.binance.org:8545");
    const contract = new ethers.Contract(CONFIG.BSC.SwapAddress, swapAbi, provider)
    let bscOrders = await contract.query_all_orders()
    console.log('getOrderList bsc orders', bscOrders)

    {
      let provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/f6673495815e4dcbbd271ef93de098ec");
      const contract = new ethers.Contract(CONFIG.ETH.SwapAddress, swapAbi, provider)
      let ethOrders = await contract.query_all_orders()
      console.log('getOrderList eth orders', ethOrders)
      var orderList = bscOrders.concat(ethOrders);
      return orderList
    }
  };

  // function create_order(uint256 chain_from, address asset_from, uint256 amount_from, uint256 chain_to, address asset_to, uint amount_to) public returns (bool) {
  functionsToExport.createOrder = async (chainFrom, assetFrom, amountFrom, chainTo, assetTo, amountTo) => {
    let swapContract = getContract(getChainSwapAddress(chainFrom), swapAbi)
    const transaction = await swapContract.create_order(chainFrom, assetFrom, amountFrom, chainTo, assetTo, amountTo)
    await transaction.wait()
  };

  return (<Web3Context.Provider value={{ account, ...functionsToExport }}>
    {props.children}
  </Web3Context.Provider>)
}

export default Web3Context;
