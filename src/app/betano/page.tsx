'use client'

import { useState } from "react";
import { Ubuntu } from "next/font/google";

import { formatOdd, normalizeCurrency } from "@/utils/masks";
import TextInput from "@/components/TextInput";
import BetanoTemplate from "@/components/BetanoTemplate";

const ubuntu = Ubuntu({
    weight: ['400', '700'],
    subsets: ["latin"]
});

type BetStatus = 'won' | 'lose' | 'made'

export type Bet = {
    odd: string
    betValue: string
    betTeam: string
    match: string
    betStatus: BetStatus
}

function BetanoPage() {
    const [showAnticipatedResultIcon, setShowAnticipatedResultIcon] = useState(true)
    const [bet, setBet] = useState<Bet>({
        odd: '2.37',
        betValue: '10,00',
        betTeam: 'Vitória',
        match: 'Vitória - Vasco da Gama',
        betStatus: 'made'
    })

    return (
        <>
            <div className={`bg-[#eceff1] h-screen p-4 ${ubuntu.className}`}>
                <div className="mx-auto container max-w-2xl">
                    <BetanoTemplate bet={bet} />

                    <div className="border bg-white p-4 rounded-md flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <input className="cursor-pointer" checked={bet.betStatus === 'made'} onChange={() => setBet(state => ({ ...state, betStatus: 'made' }))} type="checkbox" id="bet" />
                            <label className="cursor-pointer text-sm w-full" htmlFor="bet">Aposta Feita</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="cursor-pointer" checked={bet.betStatus === 'won'} onChange={() => setBet(state => ({ ...state, betStatus: 'won' }))} type="checkbox" id="won" />
                            <label className="cursor-pointer text-sm w-full" htmlFor="won">Aposta Vencida</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="cursor-pointer" checked={bet.betStatus === 'lose'} onChange={() => setBet(state => ({ ...state, betStatus: 'lose' }))} type="checkbox" id="lose" />
                            <label className="cursor-pointer text-sm w-full" htmlFor="lose">Aposta Perdida</label>
                        </div>
                    </div>

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
                        <TextInput
                            label="Time Vencedor"
                            value={bet.betTeam}
                            onChange={evt => setBet(state => ({ ...state, betTeam: evt.target.value }))}
                        />
                        <TextInput
                            label="Partida"
                            value={bet.match}
                            onChange={evt => setBet(state => ({ ...state, match: evt.target.value }))}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BetanoPage;
