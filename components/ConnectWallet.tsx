import  { useState, useEffect } from 'react'

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
import { injected } from "../utils/web3/connectors";

import useEagerConnect from '../utils/web3/useEagerConnect';
import useInactiveListener from '../utils/web3/useInactiveListener';

import { Spinner } from "@chakra-ui/react"

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
          <p className="text-purple-700 font-semibold px-2">
            Connect Wallet
          </p>

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

export default function ConnectWallet() {

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

      window.alert(getErrorMessage(error))
    }
  }, [error])

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
        !(!activating && active) && (
          <NotConnectedButton handleConnectRequest={handleConnectRequest} activating={activating} active={active}/>
        )
      }
    </>
  )
}