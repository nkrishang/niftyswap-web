import Head from 'next/head'

export default function Page({children}: any): JSX.Element {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-100">
      <Head>
        <title>NiftySwap</title>
        <meta name="description" content="Trade NFTs with your internet friends." />
        <link rel="icon" href="/niftyswap-logo.ico" />
      </Head>

      {children}
    </div>
  )
}