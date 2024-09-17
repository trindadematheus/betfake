'use client'

import { useState } from "react";
import { Ubuntu } from "next/font/google";
import uuid from 'react-uuid';

import TextInput from "@/components/TextInput";
import BetanoTemplate from "@/components/BetanoTemplate";
import { formatOdd, normalizeCurrency } from "@/utils/masks";

const ubuntu = Ubuntu({
    weight: ['400', '700'],
    subsets: ["latin"]
});

export type BetStatus = 'won' | 'lose' | 'made'

export type Bet = {
    id: string
    odd: string
    betValue: string
    betTeam: string
    match: string
}

function BetanoPage() {
    const [showAnticipatedResultIcon, setShowAnticipatedResultIcon] = useState(true)
    const [betStatus, setBetStatus] = useState<BetStatus>('made')
    const [bets, setBets] = useState<Bet[]>([{
        id: uuid(),
        odd: '2.00',
        betValue: '10,00',
        betTeam: 'Time Vencedor ou Empate',
        match: 'Time Casa - Time Fora',
    }])

    function handleAddBet() {
        setBets(state => ([
            ...state,
            {
                id: uuid(),
                odd: '2.00',
                betValue: '10,00',
                betTeam: 'Time Vencedor ou Empate',
                match: 'Time Casa - Time Fora',
            }
        ]))
    }

    return (
        <>
            <div className={`bg-[#eceff1] min-h-screen p-4 ${ubuntu.className}`}>
                <div className="mx-auto container max-w-2xl">
                    <BetanoTemplate status={betStatus} bets={bets} />

                    <div className="border bg-white p-4 rounded-md flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <input className="cursor-pointer" checked={betStatus === 'made'} onChange={() => setBetStatus('made')} type="checkbox" id="bet" />
                            <label className="cursor-pointer text-sm w-full" htmlFor="bet">Aposta Feita</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="cursor-pointer" checked={betStatus === 'won'} onChange={() => setBetStatus('won')} type="checkbox" id="won" />
                            <label className="cursor-pointer text-sm w-full" htmlFor="won">Aposta Vencida</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="cursor-pointer" checked={betStatus === 'lose'} onChange={() => setBetStatus('lose')} type="checkbox" id="lose" />
                            <label className="cursor-pointer text-sm w-full" htmlFor="lose">Aposta Perdida</label>
                        </div>
                    </div>

                    {bets.map((bet, key) => (
                        <div className="border bg-white p-4 rounded-md flex flex-col gap-3 mt-4">
                            <div className="flex items-center justify-between">
                                <h2 className="">Aposta #{key + 1}</h2>

                                <button
                                    onClick={() => setBets(state => state.filter(b => b.id !== bet.id))}
                                    className="text-xs bg-red-400 p-1 rounded-full"
                                >
                                    REMOVER
                                </button>
                            </div>
                            <TextInput
                                label="Valor Apostado"
                                value={bet.betValue}
                                onChange={evt => setBets(state => {
                                    const updated = state.map(item =>
                                        item.id === bet.id ? { ...item, betValue: normalizeCurrency(evt.target.value) } : item
                                    )

                                    return updated
                                })}
                            />
                            <TextInput
                                label="ODD"
                                value={bet.odd}
                                onChange={evt => setBets(state => {
                                    const updated = state.map(item =>
                                        item.id === bet.id ? { ...item, odd: formatOdd(evt.target.value) } : item
                                    )

                                    return updated
                                })}
                            />
                            <TextInput
                                label="Time Vencedor"
                                value={bet.betTeam}
                                onChange={evt => setBets(state => {
                                    const updated = state.map(item =>
                                        item.id === bet.id ? { ...item, betTeam: evt.target.value } : item
                                    )

                                    return updated
                                })}
                            />
                            <TextInput
                                label="Partida"
                                value={bet.match}
                                onChange={evt => setBets(state => {
                                    const updated = state.map(item =>
                                        item.id === bet.id ? { ...item, match: evt.target.value } : item
                                    )

                                    return updated
                                })}
                            />
                        </div>
                    ))}

                    <button onClick={handleAddBet} className="bg-orange-400 w-full p-2 rounded-md mt-4 text-xs uppercase font-bold" >
                        + Adicionar Aposta
                    </button>
                </div>
            </div>
        </>
    );
}

export default BetanoPage;
