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
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        width,
        height,
        border: '1px solid #ccc',
        padding: '8px',
        boxSizing: 'border-box',
        margin: '1em 0',
      }}
    >
      {players.map(player => {
        const barHeight = (player.coins / maxCoins) * 400
        return (
          <div
            key={player.id}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '2px',
                height: `${barHeight}px`,
                backgroundColor: '#4CAF50',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CoinBarChart
