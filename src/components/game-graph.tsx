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
  height = '200px',
}) => {
  const { players } = state
  const maxCoins = Math.max(...players.map(p => p.coins), 1)

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
      }}
    >
      {players.map(player => {
        const barHeight = (player.coins / maxCoins) * 100
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
                // transition: 'height 0.3s ease',
              }}
            />
            {/* <div style={{ marginTop: '4px', fontSize: '9px' }}>{player.coins}</div> */}
          </div>
        )
      })}
    </div>
  )
}

export default CoinBarChart
