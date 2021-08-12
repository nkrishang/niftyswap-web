import Image from 'next/image'

import Page from "../components/Page"
import Container from '../components/Container'
import AppNav from '../components/AppNav'
import SwapGraphic from '../components/SwapGraphic'

import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { createClient } from "urql"

type NFT = {
  name: string;
  image: string;
  tokenId: number
}

export default function MainApp(): JSX.Element {

  const { library, account } = useWeb3React()
  const [nftsToTrade, setNftsToTrade] = useState<NFT[]>([]);

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

  const getMetadata = async (targetURI: string) => {
    const res = await fetch(targetURI, { method: "GET" });
    const metadata = await res.json()

    return {image: metadata.image, name: metadata.name}
  }

  const getNFTsOwned = async (addr: string): Promise<void> => {

    const targetEndpoint: string = "https://api.thegraph.com/subgraphs/name/nkrishang/erc721";
    const client = createClient({
      url: targetEndpoint
    })

    const { data: { accounts: [nftsOwned]  } } = await client.query(queryForNFTsOwned(addr)).toPromise()
    
    const nfts = nftsOwned.nftsOwned;

    const formattedNFTs: NFT[] = await Promise.all(nfts.map(async ({tokenId, metadataURI}: {tokenId: number, metadataURI: string}) => {
      const { image, name } = await getMetadata(metadataURI)

      return {image, name, tokenId}
    }))

    setNftsToTrade([...formattedNFTs])    
  }

  useEffect(() => {
    if(account) {
      getNFTsOwned(account)
    }

  }, [account])

  return (
    <Page>
      <Container>
        <AppNav />

        <div className="flex justify-between">

          <SwapGraphic srcOwned={""} srcWanted={""}/>
          

          <div className="flex flex-col justify-center">
            <p className="text-2xl font-bold">
              Your Cool Cats
            </p>
          </div>
        </div>
      </Container>
    </Page>
  )
}