import Head from 'next/head'
import Image from 'next/image'

import { Button } from '@chakra-ui/button'
import { ArrowForwardIcon, ArrowDownIcon } from '@chakra-ui/icons' 

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-200">
      <Head>
        <title>NiftySwap</title>
        <meta name="description" content="Trade NFTs with your internet friends." />
        <link rel="icon" href="/niftyswap-logo.ico" />
      </Head>
      
      <div className="max-w-6xl m-auto px-8 py-8">
        <div className="flex flex-col">

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
        </div>

        <div className="flex flex-row m-auto justify-between">
          <div className="flex flex-col justify-start w-2/3">
						<p className="text-gray-800 text-7xl font-black leading-normal py-4">
							Trade NFTs with your (<span className="text-purple-400 font-black text-6xl">internet</span>) friends.
						</p>

						<p className="text-gray-600 text-xl pt-4 pb-8">
							Share a ‘swap link’ to your NFT and find people who’ll trade their NFTs for yours!
						</p>

						<Button rightIcon={<ArrowForwardIcon />} variant="solid" colorScheme="purple" maxW="250" size="lg">
							Enter App
						</Button>
          </div>

					<div className="flex flex-col justify-center items-center" style={{maxHeight: "560px" }}>
						<div className="h-60 w-60 border-2 border-pink-500 bg-white shadow-neonpink rounded-lg flex flex-col justify-center z-10">
							<div className="m-auto">
								<Image
									priority={true}
									src="/niftyswap-landing-cool-cats.png"
									height={200}
									width={200}
								/>
							</div>
						</div>

						<div className="h-16 w-4 bg-black z-0 m-auto">
							<div className="bg-white border-2 border-purple-700 h-10 w-10 rounded-xl z-10 m-auto relative right-3 top-3 flex flex-col justify-center">
								<div className="m-auto">
									<ArrowDownIcon w={6} h={6} color="purple.500"/>
								</div>
							</div>
						</div>						

						<div className="h-60 w-60 border-2 border-blue-500 bg-white shadow-neonblue rounded-lg flex flex-col justify-center z-10">
							<div className="m-auto">
								<Image
									priority={true}
									src="/niftyswap-landing-bored-ape.png"
									height={200}
									width={200}
								/>
							</div>
						</div>
					</div>
        </div>
      </div>
    </div>
  )
}
