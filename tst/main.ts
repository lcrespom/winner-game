import { type GameParams, startGame, stepGame } from '../src/game-engine/engine.ts'

const params: GameParams = {
  numPlayers: 100,
  initialCoins: 100,
  turnsPerSecond: 100_000,
  helpTurns: 90,
}

function runSimulation() {
  const NumFmt = Intl.NumberFormat()
  let state = startGame(params)
  let players = 0
  do {
    state = stepGame(state)
    if (players != state.players.length || state.turn % 1_000_000 == 0) {
      players = state.players.length
      console.log(`Step: ${NumFmt.format(state.turn)} - players: ${state.players.length}`)
    }
  } while (state.players.length > 1)
}

runSimulation()
