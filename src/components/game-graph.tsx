import React from 'react'
import { type GameState } from '../game-engine/engine'

interface CoinBarChartProps {
  state: GameState
  width?: number | string
  height?: number | string
}

export const CoinBarChart: React.FC<CoinBarChartProps> = ({
  state,
  width = '100%',
  height = '430px',
}) => {
  const { players } = state
  const maxCoins = players.reduce((coins, player) => coins + player.coins, 0) // Math.max(...players.map(p => p.coins), 1)

  //TODO: add values in Y axis
  return (
    <div className="game-graph" style={{ width, height }}>
      {players.map(player => {
        const barHeight = (player.coins / maxCoins) * 400
        return (
          <div className="player-bar" key={player.id}>
            <div style={{ height: `${barHeight}px` }} />
          </div>
        )
      })}
    </div>
  )
}

export default CoinBarChart
