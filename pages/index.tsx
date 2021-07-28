import Head from 'next/head'
import Image from 'next/image'

import { Button } from '@chakra-ui/button'
import { ArrowForwardIcon } from '@chakra-ui/icons' 

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-200">
      <Head>
        <title>NiftySwap</title>
        <meta name="description" content="Trade NFTs with your internet friends." />
        <link rel="icon" href="/niftyswap-logo.ico" />
      </Head>
      
      <div className="border border-red-600 max-w-6xl m-auto">
        <div className="flex flex-col border border-black">

          <div className="flex flex-row justify-between py-8">
            <Image
              src="/niftyswap-logo-full.png"
              height={80}
              width={239}
            />

            <div className="flex flex-row justify-center border border-black items-center">
              <a className="mr-4">
                source code
              </a>

              <a className="ml-4">
                github
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-row m-auto">
          <div className="flex flex-col justify-center w-2/3">
            <p className="text-gray-800 text-6xl font-black leading-relaxed py-4">
              Trade NFTs with your (<span className="text-purple-400 font-black text-6xl">internet</span>) friends.
            </p>

            <p className="text-gray-600 text-xl pt-4 pb-8 font-semibold">
              Share a ‘swap link’ to your NFT and find people who’ll trade their NFTs for yours!
            </p>

            <Button rightIcon={<ArrowForwardIcon />} variant="solid" colorScheme="purple" maxW="250">
              Enter App
            </Button>
          </div>

          <Image
            height={400}
            width={160}
            src="/niftyswap-landing-graphic.png"
          />
        </div>
      </div>
    </div>
  )
}
