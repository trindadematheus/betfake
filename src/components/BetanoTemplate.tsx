import { ChevronUp } from "lucide-react"
import { useMemo } from "react"

import WonIcon from "./WonIcon"
import { Bet, BetStatus } from "@/app/betano/page"
import { normalizeCurrency, parseNumber } from "@/utils/masks"
import LoseIcon from "./LoseIcon"

type BetanoTemplateProps = {
    bets: Bet[]
    status: BetStatus
}

function BetanoTemplate({ bets, status }: BetanoTemplateProps) {
    const betFullValue = useMemo(() => {
        return bets.reduce((prev, curr) => {
            prev = parseNumber(curr.betValue) + prev
            return prev
        }, 0)
    }, [bets])

    const betFullOdd = useMemo(() => {
        return bets.reduce((prev, curr) => {
            prev = parseFloat(curr.odd) + prev
            return prev
        }, 0)
    }, [bets])

    return (
        <>
            <div className="border bg-white rounded-md">
                <div className="border-b p-4 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-slate-800">
                            <span>
                                <>
                                    {(() => {
                                        switch (bets.length) {
                                            case 1:
                                                return 'Simples'
                                            case 2:
                                                return 'Dupla'
                                            case 1:
                                                return 'Tripla'
                                            default:
                                                return 'Múltiplas'
                                        }
                                    })()}
                                </>
                            </span>

                            <span className="ml-2 text-sm font-normal text-[#333]">
                                R$ {normalizeCurrency(betFullValue.toFixed(2))}
                            </span>
                        </p>

                        <p className="text-xs text-slate-400">
                            {bets.map(bet => bet.betTeam).join(', ')}
                        </p>
                    </div>

                    <div className="flex items-center">
                        {status === 'won' && <p className="bg-[rgb(237,251,243)] rounded-2xl border border-[rgb(28,104,72)] text-xs font-bold py-[2px] px-2 text-[rgb(28,104,72)]">Ganhou</p>}
                        {status === 'lose' && <p className="bg-[rgb(254,241,244)] rounded-2xl border border-[#ba1030] text-xs font-bold py-[2px] px-2 text-[#ba1030]">Perdida</p>}
                        {status === 'made' && (
                            <p className="text-sm text-[#333]">
                                {betFullOdd.toFixed(2)}
                            </p>
                        )}

                        <p className="ml-2">
                            <ChevronUp size={20} />
                        </p>
                    </div>
                </div>

                {bets.map((bet, key) => (
                    <div key={key} className="border-b p-2 pb-5 flex justify-between items-start">
                        <div className="flex items-start">
                            <img src="https://static.gmlinteractive.com/myaccount/web/img/FOOT.69ab50c7.svg" alt="sport-icon" width="16" height="16" />
                            <div className="ml-1 flex flex-col gap-1">
                                <p className="font-bold text-xs flex items-center">
                                    <span className="mr-1">{bet.betTeam}</span>
                                    {/* {showAnticipatedResultIcon && <Icon2 />} */}
                                    {status === 'won' && <WonIcon />}
                                    {status === 'lose' && <LoseIcon />}
                                </p>

                                <p className="text-slate-400 text-xs">Resultado final</p>

                                <p className="text-xs">{bet.match}</p>
                            </div>
                        </div>
                        <div className="">
                            <p className="font-bold text-xs">
                                {bet.odd}
                            </p>
                        </div>
                    </div>
                ))}

                <div className="p-4 flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-800">
                        {status === 'made' ? 'Ganhos potenciais' : 'Ganhos'}
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                        {status === 'lose' ? 'R$ 0,00' : `R$ ${normalizeCurrency((betFullOdd * betFullValue).toFixed(2))}`}
                    </p>
                </div>
            </div>
        </>
    );
}

export default BetanoTemplate;
