import Image from 'next/image'
import ConnectWallet from './ConnectWallet'

export default function AppNav(): JSX.Element {
  return (
    <div className="flex flex-row justify-between pb-8 items-center">
      <Image
        src="/niftyswap-logo-full.svg"
        height={80}
        width={239}
      />

      <ConnectWallet />
    </div>
  )
}