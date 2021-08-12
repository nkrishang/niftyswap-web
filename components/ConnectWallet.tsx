import  { useState, useEffect } from 'react'
import { ethers } from 'ethers';

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
import { injected } from "../utils/web3/connectors";

import useEagerConnect from '../utils/web3/useEagerConnect';
import useInactiveListener from '../utils/web3/useInactiveListener';
import { chainIds } from '../utils/web3/chainIds';
import { errorToast } from '../utils/toast';

import { Spinner, useToast } from "@chakra-ui/react"

type NotConnectedButtonProps = {
  handleConnectRequest: () => void;
  activating: boolean;
  active: boolean;
}

function NotConnectedButton({handleConnectRequest, activating, active}: NotConnectedButtonProps): JSX.Element {
  return (
    <button 
      className="bg-purple-200 rounded-lg w-32 h-12 text-center"
      onClick={!activating ? handleConnectRequest : () => {}}
    >
      {activating && (
        <div className="flex justify-center">
          <Spinner size="sm"/>
        </div>
      )}

      {!activating && !active && (
        <p className="text-purple-700 font-semibold px-2">
          Connect wallet
        </p>
      )}    
    </button>
  )
}

function ConnectedButton({chainId, balance, address}: {chainId: keyof typeof chainIds, balance: string, address: string}): JSX.Element {
  return (
    <div className="flex flex-row justify-between">

      <div className="h-10 w-auto px-4 bg-purple-200 rounded-xl flex flex-col justify-center items-center mx-2">
        <p className="text-purple-700">
          {chainIds[chainId]}
        </p>
      </div>

      <div className="h-10 w-56 flex justify-between items-center bg-gray-50 rounded-xl mx-2 pl-2 pr-1">
        <p className="font-bold text-center">
          {`${balance} ETH`}
        </p>

        <button className="font-semibold z-10 h-8 w-32 bg-white rounded-xl">
          {address.slice(0,6) + "..." + address.slice(-4)}
        </button>
      </div>

    </div>
  )
}

export default function ConnectWallet(): JSX.Element {

  const toast = useToast();

  function getErrorMessage(error: any) {
    if (error instanceof NoEthereumProviderError) {
      return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (error instanceof UserRejectedRequestError) {
      return "Please authorize this website to access your Ethereum account.";
    } else {
      console.log(error);
      return "An unknown error occurred. Check the console for more details.";
    }
  }

  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<InjectedConnector | undefined>(undefined);

  // User balance
  const [ethBal, setEthBal] = useState<string>("");

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }

  }, [activatingConnector, connector]);

  useEffect(() => {
    if(!!error) {

      if(error instanceof UserRejectedRequestError) {
        deactivate()
      }

      errorToast(toast, getErrorMessage(error));
    }
  }, [error])

  useEffect(() => {
    async function getBalance(): Promise<void> {
      const bal = await library.getBalance(account)
      const formattedBal = parseFloat(
        ethers.utils.formatEther(bal)
      ).toFixed(2)

      setEthBal(formattedBal);
    }

    if(account) {
      getBalance()
    }
  }, [account])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const activating = injected === activatingConnector;
  const disabled = !triedEager || !!activatingConnector;

  function handleConnectRequest() {
    setActivatingConnector(injected);
    activate(injected);
  }

  function handleDisconnectRequest() {
    deactivate();
  }

  return (
    <>
      {
        (activating || !active)
        
        ? (
          <NotConnectedButton handleConnectRequest={handleConnectRequest} activating={activating} active={active}/>
        )

        : (
          <ConnectedButton chainId={chainId as keyof typeof chainIds} balance={ethBal} address={account as string}/>
        )
      }
    </>
  )
}