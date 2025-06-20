import React from 'react'
import { type GameState } from '../game-engine/engine'

interface CoinBarChartProps {
  state: GameState
}

export const CoinBarChart: React.FC<CoinBarChartProps> = ({ state }) => {
  const { players } = state
  const maxCoins = players.reduce((coins, player) => coins + player.coins, 0)
  // const maxCoins = Math.max(...players.map(p => p.coins), 1)

  //TODO: add values in Y axis
  return (
    <div className="round-border my-4 box-border flex h-[430px] w-full items-end p-2">
      {players.map(player => {
        const barHeight = (player.coins / maxCoins) * 400
        return (
          <div className="flex flex-1 flex-col items-center justify-end" key={player.id}>
            <div
              className="w-1/2 rounded bg-blue-600"
              style={{ height: `${barHeight}px` }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CoinBarChart
