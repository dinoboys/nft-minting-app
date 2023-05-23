import styles from "../styles/Home.module.css"
import Image from "next/image"
import { useState, useEffect } from "react"
import abiJson from "../constants/erc721abi.json"
import {
    usePrepareContractWrite,
    useAccount,
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { ethers } from "ethers"
import { useToasts } from "react-toast-notifications"
export default function ERC721MintButton(props) {
    const [price, setprice] = useState(0)
    const [value, setvalue] = useState(0)
    const [mintNum, setmintNum] = useState(0)
    const [mintCountdata, setmintCountdata] = useState(0)
    const { addToast } = useToasts()
    const { address } = useAccount()
    const [mintLimit, setMintLimit] = useState("0")
    const [mintCostAmount, setMintCostAmount] = useState("0")
    const { data: mintLimitData } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainid,
        functionName: "maxMintAmountPerTx",
        watch: true,
    })
    useEffect(() => {
        if (mintLimitData) {
            setMintLimit(mintLimitData.toString())
        }
    }, [mintLimitData])

    // mint Cost
    const { data: mintCostData } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainid,
        functionName: "mintCost",
        watch: true,
    })
    useEffect(() => {
        if (mintCostData) {
            setMintCostAmount(mintCostData.toString())
        }
    }, [mintCostData])

    // mint Count
    const { data: mintCount } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainID,
        functionName: "mintCount",
        watch: true,
        args: props.address,
    })
    useEffect(() => {
        if (mintCount) {
            setmintCountdata(mintCount.toNumber())
        }
    }, [mintCount])

    const { config } = usePrepareContractWrite({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainID,
        functionName: "mint",
        overrides: {
            from: props.address,
            value: price,
        },
        args: mintNum,
    })
    const { data: mintresults, write: mint } = useContractWrite(config)
    const {
        isLoading: mintisLoading,
        isError: minterror,
        isSuccess: mintisSuccess,
    } = useWaitForTransaction({
        hash: mintresults?.hash,
    })
    useEffect(() => {
        if (minterror) {
            addToast("Transaction error...", { appearance: "error" })
        }
    }, [minterror])
    useEffect(() => {
        if (mintisLoading) {
            addToast("minting...", { appearance: "success" })
        }
    }, [mintisLoading])
    useEffect(() => {
        if (mintisSuccess) {
            addToast("minted successful!", { appearance: "success" })
        }
    }, [mintisSuccess])
    function connectwalletnotice() {
        addToast("Please connect wallet", { appearance: "error" })
    }
    function zeromintnum() {
        addToast("Mint number could not be 0", { appearance: "error" })
    }
    function increase() {
        if (mintNum + 1 < 11) {
            if (mintNum >= mintLimit - mintCountdata) {
                addToast("Exceed Mint Limit", { appearance: "error" })
            } else {
                setmintNum(mintNum + 1)
                if (mintNum == 1) setprice(ethers.utils.parseEther("0.1"))
            }
        } else {
            addToast("Exceed Mint Limit", { appearance: "error" })
        }
    }
    function decrease() {
        if (mintNum > 0) {
            setmintNum(mintNum - 1)
            setprice(ethers.utils.parseEther("0.1"))
        }
    }
    useEffect(() => {
        if (mintNum) {
            setprice((mintCostAmount * mintNum).toString())
            setvalue((ethers.utils.formatEther(mintCostAmount) * mintNum).toString())

            // if (mintNum == 1) {
            //     // mintCostAmount
            //     setprice(ethers.utils.parseEther("0.1"))
            //     setvalue("0.1")
            // }
            // if (mintNum == 2) {
            //     setprice(ethers.utils.parseEther("0.2"))
            //     setvalue("0.2")
            // }
            // if (mintNum == 3) {
            //     setprice(ethers.utils.parseEther("0.3"))
            //     setvalue("0.3")
            // }
            // if (mintNum == 4) {
            //     setprice(ethers.utils.parseEther("0.4"))
            //     setvalue("0.4")
            // }
            // if (mintNum == 5) {
            //     setprice(ethers.utils.parseEther("0.5"))
            //     setvalue("0.5")
            // }
            // if (mintNum == 6) {
            //     setprice(ethers.utils.parseEther("0.6"))
            //     setvalue("0.6")
            // }
            // if (mintNum == 7) {
            //     setprice(ethers.utils.parseEther("0.7"))
            //     setvalue("0.7")
            // }
            // if (mintNum == 8) {
            //     setprice(ethers.utils.parseEther("0.8"))
            //     setvalue("0.8")
            // }
            // if (mintNum == 9) {
            //     setprice(ethers.utils.parseEther("0.9"))
            //     setvalue("0.9")
            // }
            // if (mintNum == 10) {
            //     setprice(ethers.utils.parseEther("1"))
            //     setvalue("1")
            // }
        }
    }, [mintNum])
    return (
        <div>
            {address && (
                <div>
                    <div className="flex justify-center ...">
                        <table className="border-separate border-spacing-2 ...">
                            <tbody>
                                <tr>
                                    <td className="font-light text-sm">You Minted</td>
                                    <td className="font-bold text-sm">{mintCountdata}</td>
                                    <td className="font-bold text-sm">/</td>
                                    <td className="font-light text-sm">Max Mint</td>
                                    <td className="font-bold text-sm">{mintLimit}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-5 items-center justify-center text-center">
                        <button className={styles.mintButton} onClick={decrease}>
                            -
                        </button>
                        <div className="">{mintNum}</div>
                        <button className={styles.mintButton} onClick={increase}>
                            +
                        </button>
                    </div>
                    <div className="mt-2" />
                    {mintNum == 0 ? (
                        <button className={styles.mintButton} onClick={zeromintnum}>
                            mint
                        </button>
                    ) : (
                        <button className={styles.mintButton} onClick={mint}>
                            Amount {value} {props.symbol} to mint
                        </button>
                    )}
                    <div className="mt-4 grid grid-cols-2 gap-30">
                        <a target="_blank" href={`${props.scan}${props.contractaddress}`}>
                            <button className="">
                                <Image
                                    src="/etherscan.png"
                                    width="30"
                                    height="30"
                                    title="view on etherscan"
                                ></Image>
                            </button>
                        </a>
                        <a
                            target="_blank"
                            href={`https://testnets.opensea.io/collection/${props.opensea}`}
                        >
                            <button className="">
                                <Image
                                    src="/opensea.png"
                                    width="30"
                                    height="30"
                                    title="view on opensea"
                                ></Image>
                            </button>
                        </a>
                    </div>
                </div>
            )}
            {!address && (
                <div>
                    <div className="">You Minted ? / Mint Limit {mintLimit}</div>

                    <div className="mt-8  grid grid-cols-3 gap-5 items-center justify-center text-center">
                        <button className={styles.mintButton} onClick={connectwalletnotice}>
                            -
                        </button>
                        <div className="">{mintNum}</div>
                        <button className={styles.mintButton} onClick={connectwalletnotice}>
                            +
                        </button>
                    </div>
                    <div className="mt-2" />
                    <button className={styles.mintButton} onClick={connectwalletnotice}>
                        mint
                    </button>
                    <div className="mt-4 grid grid-cols-2 gap-30">
                        <a target="_blank" href={`${props.scan}${props.contractaddress}`}>
                            <button className="">
                                <Image
                                    src="/etherscan.png"
                                    width="30"
                                    height="30"
                                    title="view on etherscan"
                                ></Image>
                            </button>
                        </a>
                        <a
                            target="_blank"
                            href={`https://testnets.opensea.io/collection/${props.opensea}`}
                        >
                            <button className="">
                                <Image
                                    src="/opensea.png"
                                    width="30"
                                    height="30"
                                    title="view on opensea"
                                ></Image>
                            </button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
