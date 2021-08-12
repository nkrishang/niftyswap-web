import Image from 'next/image'

import Page from "../components/Page"
import Container from '../components/Container'
import AppNav from '../components/AppNav'
import SwapGraphic from '../components/SwapGraphic'

import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { createClient } from "urql"

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

type NFT = {
  name: string;
  image: string;
  tokenId: number
}

type NFTOptionProps = {
  src: string;
  progress: Progress;
  isChecked: boolean;
  setChecked: (src: string) => void;
}

enum Progress { SelectNftToTrade, SelectNftWanted, Trade }

function NFTOption({src, progress, isChecked, setChecked}: NFTOptionProps): JSX.Element {

  const borderStyle = isChecked 
    ? progress == Progress.SelectNftToTrade
      ? "border-pink-500"
      : "border-blue-500" 
    : "border-gray-300";

  return (
    <button onClick={() => setChecked(src)}>
      <div className={`h-48 w-48 border-2 bg-white rounded-lg flex flex-col justify-center m-2 ${borderStyle}`}>
        <div className="m-auto">
          <Image
            priority={true}
            src={src}
            height={160}
            width={160}
          />
        </div>
      </div>
    </button>
  )
}

export default function MainApp(): JSX.Element {

  // Web3 react: provider and signer.
  const { library, account } = useWeb3React()

  // Progress: 3 stages.
  const [progress, setProgress] = useState<Progress>(Progress.SelectNftToTrade)

  // Get on load.
  const [nftsOwned, setNftsOwned] = useState<NFT[]>([]);
  const [nftsNotOwned, setNftsNotOwned] = useState<NFT[]>([]);

  // Select state.
  const [nftToTrade, setNftToTrade] = useState<NFT>();
  const [nftWanted, setNftWanted] = useState<NFT>();
  const [selected, setSelected] = useState<string>("");

  const nftsToDisplay: NFT[] = progress == Progress.SelectNftToTrade ? nftsOwned : nftsNotOwned;

  const setChecked = (key: string) => setSelected(key)
  const isChecked = (key: string) => selected == key

  useEffect(() => {
    if(account ) {
      getNFTs(account)
    }

  }, [account])

  const nextStep = () => {
    switch(progress) {
      case (Progress.SelectNftToTrade): {
        
        const targetNFT: NFT = nftsToDisplay.filter(nft => nft.image == selected)[0];
        setNftToTrade(targetNFT);
        setSelected("");
        
        setProgress(Progress.SelectNftWanted)
        break;
      }
      case (Progress.SelectNftWanted): {
        const targetNFT: NFT = nftsToDisplay.filter(nft => nft.image == selected)[0];
        setNftWanted(targetNFT);
        setSelected("");
        
        setProgress(Progress.Trade)
        break;
      }
    }
  }

  const prevStep = () => {
    switch(progress) {
      case (Progress.SelectNftWanted): {
        setProgress(Progress.SelectNftToTrade)
        setSelected("");
        break;
      }
      case (Progress.Trade): {
        setProgress(Progress.SelectNftWanted)
        setSelected("");
        break;
      }
    }
  }

  const headerText = (): string => {
    let text = ""
    
    switch(progress) {
      case (Progress.SelectNftToTrade): {
        text = "Select an NFT to trade"
        break;
      }
      case (Progress.SelectNftWanted): {
        text = "Select an NFT you want in exchange"
        break;
      }
      case (Progress.Trade): {
        text = "Review trade"
        break;
      }
    }

    return text
  }

  const queryForNFTsOwned = (addr: string): string => {
    console.log(addr)
    return `
      query {
        accounts(where: { address: "${addr}"}) {
          nftsOwned {
            tokenId
            metadataURI
          }
        }
      }
    `
  }

  const queryForAllNFTs = (): string => {
    return `
      query {
        nfts {
          metadataURI
          tokenId
          owner {
            address
          }
        }
      }
    `
  }

  const getMetadata = async (targetURI: string) => {
    const res = await fetch(targetURI, { method: "GET" });
    const metadata = await res.json()

    return {image: metadata.image, name: metadata.name}
  }

  const getNFTsNotOwned = async (addr: string): Promise<void> => {
    const targetEndpoint: string = "https://api.thegraph.com/subgraphs/name/nkrishang/erc721";
    const client = createClient({
      url: targetEndpoint
    })

    const { data: { nfts } } = await client.query(queryForAllNFTs()).toPromise()

    const nftsNotOwnedByAccount = nfts.filter((nft: any) => {
      return (nft.owner.address).toLowerCase() != addr.toLowerCase()
    })
    
    const formattedNFTs: NFT[] = await Promise.all(nftsNotOwnedByAccount.map(async ({tokenId, metadataURI}: {tokenId: number, metadataURI: string}) => {
      const { image, name } = await getMetadata(metadataURI)

      return {image, name, tokenId}
    }))

    setNftsNotOwned([...formattedNFTs]);
  }

  const getNFTsOwned = async (addr: string): Promise<void> => {

    const targetEndpoint: string = "https://api.thegraph.com/subgraphs/name/nkrishang/erc721";
    const client = createClient({
      url: targetEndpoint
    })

    const { data: { accounts: [{ nftsOwned }]  } } = await client.query(queryForNFTsOwned(addr)).toPromise()

    const formattedNFTs: NFT[] = await Promise.all(nftsOwned.map(async ({tokenId, metadataURI}: {tokenId: number, metadataURI: string}) => {
      const { image, name } = await getMetadata(metadataURI)

      return {image, name, tokenId}
    }))

    setNftsOwned([...formattedNFTs])
  }

  const getNFTs = async (addr: string): Promise<void> => {
    await getNFTsOwned(addr)
    await getNFTsNotOwned(addr)
  }

  return (
    <Page>
      <Container>
        <AppNav />

        <div className="flex justify-between">

          <SwapGraphic 
            srcOwned={
              progress == Progress.SelectNftToTrade ? selected : (nftToTrade?.image as string)
            } 
            srcWanted={
              progress == Progress.SelectNftToTrade ? "" : progress == Progress.SelectNftWanted ? selected : (nftWanted?.image as string)
            }
          />
          
          <div className="flex flex-col w-2/3" style={{maxHeight: "560px" }}>

            <div className="flex justify-between">
              <p className="text-gray-800 text-3xl font-bold pb-8">
                {headerText()}
              </p>

              <div className="flex justify-center">

                <button 
                  className="rounded-lg w-10 h-10 text-center bg-gray-300 mx-2"
                  hidden={progress == Progress.SelectNftToTrade}
                  onClick={() => prevStep()}
                >
                  <div className="m-auto">                    
                    <ArrowBackIcon color="black" fontSize="lg" />
                  </div>
                </button>

                <button 
                  className={`${(!selected || progress == Progress.Trade) ? "bg-gray-400" : "bg-purple-500"} rounded-lg w-28 h-10 text-center`}
                  disabled={!selected || progress == Progress.Trade}
                  onClick={() => nextStep()}                
                >
                  <div className="flex justify-center items-center w-28 h-10">
                    <p className="text-white text-lg font-medium px-2">
                      Next
                    </p>
                    <ArrowForwardIcon color="white" fontSize="lg" />
                  </div>
                </button>
              </div>

              
            </div>
            
            <div className="flex justify-start flex-wrap items-start overflow-y-scroll">
            
              {!!nftsToDisplay.length
                ? (nftsToDisplay.map(nft => nft.image))
                  .map(src => <NFTOption key={src} progress={progress} src={src} isChecked={isChecked(src)} setChecked={setChecked}/> )
                
                : <p>No NFTs to show!</p> 
              }
              
            </div>
          </div>          
        </div>
      </Container>
    </Page>
  )
}