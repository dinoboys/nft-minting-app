import { ConnectButton } from "@rainbow-me/rainbowkit"
import styles from "../styles/Home.module.css"
export default function Header() {
    return (
        <div>
            <nav className={styles.navBar}>
                <div className="flex items-center ">
                    <div className="text-white font-bold font-Rubik lg:text-2xl sm:text-lg ">
                        Goerli NFT Collection
                    </div>
                </div>
                <ConnectButton
                    accountStatus={{
                        smallScreen: "none",
                        largeScreen: "address",
                    }}
                />
            </nav>
        </div>
    )
}
