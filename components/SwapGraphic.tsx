import Image from 'next/image'
import { ArrowDownIcon } from '@chakra-ui/icons'

export default function SwapGraphic({srcOwned, srcWanted}: {srcOwned: string, srcWanted: string}): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center" style={{maxHeight: "560px" }}>
			<div className="h-60 w-60 border-2 border-pink-500 bg-white shadow-neonpink rounded-lg flex flex-col justify-center z-10">
				<div className="m-auto">
          {srcOwned
            ? (
              <Image
                priority={true}
                src={srcOwned}
                height={200}
                width={200}
              />
            )

            : (
              <p className="text-gray-500 text-center px-4">
                Select an NFT you want to trade.
              </p>
            )
          }
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
          {srcWanted
            ? (
              <Image
                priority={true}
                src={srcWanted}
                height={200}
                width={200}
              />
            )

            : (
              <p className="text-gray-500 text-center px-4">
                Select an NFT you want in exchange.
              </p>
            )
          }
					
				</div>
			</div>
		</div>
  )
}