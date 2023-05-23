import Head from "next/head"
import Header from "../components/Header"
import Welcome from "../components/Welcome"
export default function Home() {
    return (
        <div>
            <Head>
                <title>Goerli NFT Collection</title>
                <meta name="description" content="Goerli testnet minting site" />
                <link rel="icon" href="/N128.ico" />
            </Head>
            <Header />
            <Welcome />
        </div>
    )
}
