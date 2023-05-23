import Mintingcomponent from "./Mintingcomponent"
import Partnerscomponent from "./Partnerscomponent"
import { useState, useEffect } from "react"
import { useNetwork } from "wagmi"

export default function Welcome() {
    const { chain } = useNetwork()

    const [chainnow, setchainnow] = useState("Goerli")
    useEffect(() => {
        if (chain) {
            if (chain["id"] == 5) {
                setchainnow(chain["name"])
            }
            if (chain["id"] == 80001) {
                setchainnow(chain["name"])
            }
        }
    }, [chain])

    return (
        <div className="scroll-smooth">
            <div>
                <div className="grid items-center justify-items-center bg-cover bg-gradient-to-br from-orange-200 via-orange-300 to-orange-200 relative">
                    {/* <div className="grid items-center justify-items-center bg-cover bg-gradient-to-br from-orange-100 via-slate-700 to-orange-100 relative"> */}
                    {/* <div className="grid items-center justify-items-center bg-cover bg-gradient-to-br from-slate-900 via-cyan-900 to-cyan-400 relative"> */}
                    <div className="mt-8 grid items-center justify-items-center text-center opacity-100 ">
                        <h1 className="mt-2 font-Rubik lg:text-6xl md:text-5xl sm:text-4xl font-bold text-white">
                            DISCLAIMER
                        </h1>
                        <h1 className="mt-5 ml-11 mr-11 font-Rubik lg:text-2xl md:text-md sm:text-sm font-light text-white">
                            If this involves your company's copyright issues, please contact me and
                            I will remove it immediately.
                        </h1>
                    </div>
                    <hr />
                    <Mintingcomponent />
                    <p className="mb-10"></p>
                    <Partnerscomponent />
                </div>
            </div>
        </div>
    )
}
