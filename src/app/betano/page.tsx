'use client'

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { Ubuntu } from "next/font/google";

import Icon2 from "@/components/2icon";
import { formatOdd, normalizeCurrency, parseNumber } from "@/utils/masks";
import WonIcon from "@/components/WonIcon";
import TextInput from "@/components/TextInput";
import BetanoTemplate from "@/components/BetanoTemplate";

const ubuntu = Ubuntu({
    weight: ['400', '700'],
    subsets: ["latin"]
});

function BetanoPage() {
    const [isEditMode, setIsEditMode] = useState(false)
    const [isBetWon, setIsBetWon] = useState(false)
    const [showAnticipatedResultIcon, setShowAnticipatedResultIcon] = useState(true)
    // const [bets, setBets] = useState([{
    //     odd: '2.37',
    //     betValue: '10,00',
    //     betTeam: 'Vitória',
    //     match: 'Vitória - Vasco da Gama',
    //     isBetWon: false
    // }])
    const [bet, setBet] = useState({
        odd: '2.37',
        betValue: '10,00',
        betTeam: 'Vitória',
        match: 'Vitória - Vasco da Gama',
        isBetWon: false
    })

    return (
        <>
            <div className={`bg-[#eceff1] h-screen p-4 ${ubuntu.className}`}>
                <div className="mx-auto container max-w-2xl">
                    <BetanoTemplate bet={bet} />

                    <div className="border bg-white p-4 rounded-md flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <input className="cursor-pointer" checked={bet.isBetWon} onChange={() => setBet(state => ({ ...state, isBetWon: true }))} type="checkbox" id="won" />
                            <label className="cursor-pointer text-sm w-full" htmlFor="won">Aposta vencida</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="cursor-pointer" checked={!bet.isBetWon} onChange={() => setBet(state => ({ ...state, isBetWon: false }))} type="checkbox" id="lose" />
                            <label className="cursor-pointer text-sm w-full" htmlFor="lose">Aposta perdida</label>
                        </div>
                    </div>

                    {/* <button className="mt-4 w-full bg-orange-600 p-1 rounded-lg text-white" >
                        + Adicionar Aposta
                    </button> */}

                    <div className="border bg-white p-4 rounded-md flex flex-col gap-3 mt-4">
                        <TextInput
                            label="Valor Apostado"
                            value={bet.betValue}
                            onChange={evt => setBet(state => ({ ...state, betValue: normalizeCurrency(evt.target.value) }))}
                        />
                        <TextInput
                            label="ODD"
                            value={bet.odd}
                            onChange={evt => setBet(state => ({ ...state, odd: formatOdd(evt.target.value) }))}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BetanoPage;
