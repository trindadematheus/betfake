'use client'

import { useState } from "react";
import { ChevronUp } from "lucide-react";

import Icon2 from "@/components/2icon";
import EditableInput from "@/components/EditableInput";
import { formatOdd, normalizeCurrency, parseNumber } from "@/utils/masks";
import WonIcon from "@/components/WonIcon";

function HomePage() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isBetWon, setIsBetWon] = useState(false)
  const [showAnticipatedResultIcon, setShowAnticipatedResultIcon] = useState(true)

  const [formData, setFormData] = useState({
    odd: '2.37',
    betValue: '10,00',
    betTeam: 'Vitória',
    match: 'Vitória - Vasco da Gama'
  })

  return (
    <>
      <div className="bg-[#eceff1] h-screen p-4">
        <div className="mx-auto container max-w-2xl pt-8">
          <div className="bg-white p-4 rounded-md mb-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <input checked={showAnticipatedResultIcon} onChange={() => setShowAnticipatedResultIcon(!showAnticipatedResultIcon)} type="checkbox" id="result" />
              <label htmlFor="result">Mostrar resultado antecipado</label>
            </div>

            <div className="flex items-center gap-2">
              <input checked={isBetWon} onChange={() => setIsBetWon(!isBetWon)} type="checkbox" id="won" />
              <label htmlFor="won">Aposta vencida</label>
            </div>

            <div className="flex items-center gap-2">
              <input checked={isEditMode} onChange={() => setIsEditMode(!isEditMode)} type="checkbox" id="edit" />
              <label htmlFor="edit">Modo de edição</label>
            </div>
          </div>

          <div className="border bg-white rounded-md">
            <div className="border-b p-4 flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-sm font-bold text-slate-800">
                  <span>Simples</span>

                  <EditableInput
                    isOnEdit={isEditMode}
                    style="ml-2 text-sm font-normal text-[#333]"
                    value={formData.betValue}
                    prefix="R$"
                    label="Valor da aposta"
                    onChange={txt =>
                      setFormData(state => ({ ...state, betValue: normalizeCurrency(txt) }))
                    }
                  />
                </p>

                <EditableInput
                  isOnEdit={isEditMode}
                  style="text-xs text-slate-400"
                  value={formData.betTeam}
                  label="Time Apostado"
                  onChange={txt => setFormData(state => ({ ...state, betTeam: txt }))}
                />
              </div>

              <div className="flex items-center">
                {isBetWon ?
                  (
                    <p className="bg-[rgb(237,251,243)] rounded-2xl border border-[rgb(28,104,72)] text-xs font-bold py-[2px] px-2 text-[rgb(28,104,72)]">Ganhou</p>
                  )
                  : (
                    <EditableInput
                      isOnEdit={isEditMode}
                      style="text-sm text-[#333]"
                      value={formData.odd}
                      label="Odd"
                      onChange={txt => setFormData(state => ({ ...state, odd: formatOdd(txt) }))}
                    />
                  )}
                <p className="ml-4">
                  <ChevronUp size={20} />
                </p>
              </div>
            </div>

            <div className="border-b p-2 pb-5 flex justify-between items-start">
              <div className="flex items-start">
                <img src="https://static.gmlinteractive.com/myaccount/web/img/FOOT.69ab50c7.svg" alt="sport-icon" width="16" height="16" />
                <div className="ml-1 flex flex-col gap-1">
                  <p className="font-bold text-xs flex items-center">
                    <span className="mr-1">{formData.betTeam}</span>
                    {showAnticipatedResultIcon && <Icon2 />}
                    {isBetWon && <WonIcon />}
                  </p>

                  <p className="text-slate-400 text-xs">Resultado final</p>

                  <EditableInput
                    isOnEdit={isEditMode}
                    style="text-xs"
                    value={formData.match}
                    label="Partida (Time Casa - Time Fora)"
                    onChange={txt => setFormData(state => ({ ...state, match: txt }))}
                  />
                </div>
              </div>
              <div className="">
                <p className="font-bold text-xs">
                  {formData.odd}
                </p>
              </div>
            </div>

            <div className="p-4 flex justify-between items-center">
              <p className="text-sm font-bold text-slate-800">Ganhos {!isBetWon && 'potenciais'}</p>
              <p className="text-sm font-bold text-slate-800">
                R${normalizeCurrency((parseFloat(formData.odd) * parseNumber(formData.betValue)).toFixed(2))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
