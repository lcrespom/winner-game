import React from 'react'
import { type GameState } from '../game-engine/engine'

interface CoinBarChartProps {
  state: GameState
}

let lastMax = 0
let lastTurn = 0

const numFmt = Intl.NumberFormat()

function roundUp(num: number, step: number = 20) {
  return Math.ceil(num / step) * step
}

function getMaxCoins(state: GameState) {
  if (state.turn < lastTurn) lastMax = 0 // Game has restarted
  lastTurn = state.turn
  const totalCoins = state.players.reduce((coins, player) => coins + player.coins, 0)
  let max = Math.max(...state.players.map(p => p.coins), 1) * 2
  if (max > totalCoins) max = totalCoins
  max = roundUp(max)
  if (lastMax > max) max = lastMax
  else lastMax = max
  return max
}

const YAxisValues: React.FC<{ maxValue: number }> = ({ maxValue }) => {
  return (
    <div className="absolute top-1 left-1 h-[calc(100%-1rem)] text-sm text-gray-500">
      <span className="absolute">{numFmt.format(maxValue)}</span>
      <span className="absolute top-1/4">{numFmt.format((maxValue * 3) / 4)}</span>
      <span className="absolute top-1/2">{numFmt.format((maxValue * 1) / 2)}</span>
      <span className="absolute top-3/4">{numFmt.format((maxValue * 1) / 4)}</span>
    </div>
  )
}

export const CoinBarChart: React.FC<CoinBarChartProps> = ({ state }) => {
  const { players } = state
  const maxCoins = getMaxCoins(state)
  return (
    <div className="round-border relative my-4 box-border flex h-[430px] w-full items-end p-1">
      {players.map(player => {
        const barHeight = (player.coins / maxCoins) * 415
        return (
          <div className="flex flex-1 flex-col items-center justify-end" key={player.id}>
            <div
              className="w-1/2 rounded bg-blue-600"
              style={{ height: `${barHeight}px` }}
            />
          </div>
        )
      })}
      <YAxisValues maxValue={maxCoins} />
    </div>
  )
}

export default CoinBarChart
