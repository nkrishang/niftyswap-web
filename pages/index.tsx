import Image from 'next/image'

import Page from "../components/Page"
import Container from '../components/Container'
import SwapGraphic from '../components/SwapGraphic'

import { Button } from '@chakra-ui/button'
import { ArrowForwardIcon, ArrowDownIcon } from '@chakra-ui/icons' 

export default function Home(): JSX.Element {
  return (
    <Page>
      
      <Container>

        <div className="flex flex-row justify-between pb-8">
          <Image
            src="/niftyswap-logo-full.svg"
            height={80}
            width={239}
          />

          <div className="flex flex-row justify-center items-center">
            <a className="mr-4 hover:underline cursor-pointer">
              smart contract
            </a>

            <a className="ml-4 hover:underline cursor-pointer">
              github
            </a>
          </div>
        </div>

        <div className="flex flex-row m-auto justify-between">
          <div className="flex flex-col justify-start w-2/3">
						<p className="text-gray-800 text-7xl font-black leading-normal py-4">
							Trade Cool Cats with your (<span className="text-purple-400 font-black text-6xl">internet</span>) friends.
						</p>

						<p className="text-gray-600 text-xl pt-4 pb-8">
							{"Not vibing with your cool cat? Don't sell it! Trade it for a cat you vibe with."}
						</p>

						<Button rightIcon={<ArrowForwardIcon />} variant="solid" colorScheme="purple" maxW="250" size="lg">
							Enter App
						</Button>
          </div>

          <SwapGraphic srcOwned={"/niftyswap-landing-cool-cats-1.png"} srcWanted={"/niftyswap-landing-cool-cats-2.png"}/>
        </div>
      </Container>
    </Page>
  )
}
