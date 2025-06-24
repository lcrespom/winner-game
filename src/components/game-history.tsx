import React, { useEffect, useRef } from 'react'
import { type GameState } from '../game-engine/engine'

interface GameHistoryProps {
  state: GameState
}

// const numFmt = Intl.NumberFormat()

// const YAxisValues: React.FC<{ maxValue: number }> = ({ maxValue }) => {
//   return (
//     <div className="text-ring absolute top-1 left-1 h-[calc(100%-1rem)] text-sm text-gray-500">
//       <span className="absolute">{numFmt.format(maxValue)}</span>
//       <span className="absolute top-1/4">{numFmt.format((maxValue * 3) / 4)}</span>
//       <span className="absolute top-1/2">{numFmt.format((maxValue * 1) / 2)}</span>
//       <span className="absolute top-3/4">{numFmt.format((maxValue * 1) / 4)}</span>
//     </div>
//   )
// }

function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()
  // set the internal bitmap size to (css size × DPR)
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  // Set (0,0) at bottom left
  ctx.setTransform(1, 0, 0, -1, 0, canvas.height)
  // optional: clear / redraw here
  ctx.clearRect(0, 0, width, height)
}

function updateCanvas(canvas: HTMLCanvasElement, state: GameState) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  resizeCanvas(canvas, ctx)
  ctx.fillStyle = '#155dfc' // bg-blue-600
  const { width, height } = ctx.canvas
  console.log({ width, height })
  //   let historyPos = 0
  //   const turnInc = state.turn / width
  for (let x = 0; x < width; x++) {
    // Choose a random bar height
    const barHeight = Math.random() * height // TODO compute real height
    // Draw the bar so it sits on the bottom of the canvas
    ctx.fillRect(x, 0, 1, barHeight)
  }
}

export const GameHistory: React.FC<GameHistoryProps> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) updateCanvas(canvasRef.current, state)
  }, [state])

  return (
    <div className="round-border relative box-border flex h-[208px] w-full p-1">
      <canvas className="h-full w-full" ref={canvasRef}></canvas>
    </div>
  )
}

export default GameHistory
