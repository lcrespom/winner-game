export type Player = {
  id: number
  coins: number
}

export type GameState = {
  players: Player[]
  turn: number
  initialPlayers: number
}

export type GameParams = {
  numPlayers: number
  initialCoins: number
  turnsPerSecond: number
  helpTurns: number
}

//region Exported function

/**
 * Initializes the game with a given number of players, each starting with initialCoins.
 * @param params game parameters
 * @returns GameState object
 */
export function startGame(params: GameParams): GameState {
  const players: Player[] = []
  for (let i = 1; i <= params.numPlayers; i++) {
    players.push({ id: i, coins: params.initialCoins })
  }
  return { players, turn: 0, initialPlayers: params.numPlayers }
}

/**
 * Runs one turn of the game: processes a round and increments turn count.
 * @param state Current GameState
 * @returns New GameState after one turn
 */
export function stepGame(state: GameState): GameState {
  if (state.players.length <= 1) {
    return state
  }
  const nextPlayers = round(state.players)
  const nextTurn = state.turn + 1
  return { players: nextPlayers, turn: nextTurn, initialPlayers: state.initialPlayers }
}

/**
 * Rearranges GameState, with each player in its expected position and players with 0 coins,
 *  to make it easier to display the game state in the UI.
 * @param state Current GameState
 * @returns Normalized GameState
 */
export function normalizeGame(state: GameState): GameState {
  const players: Player[] = []
  for (let i = 0; i < state.initialPlayers; i++) players.push({ id: i + 1, coins: 0 })
  for (const player of state.players) players[player.id - 1] = player
  return { ...state, players }
}

//region Private functions

/**
 * Shuffles an array in place using Fisher–Yates algorithm.
 */
function shufflePlayers(players: Player[]): Player[] {
  const arr = [...players]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Handles the betting and coin flip for a pair of players.
 * Returns an array of surviving players (1 or 2) after the match.
 */
function playMatch(a: Player, b: Player): Player[] {
  if (a.coins <= 0 || b.coins <= 0) {
    return [a.coins > 0 ? a : b].filter(p => p.coins > 0)
  }
  a.coins--
  b.coins--
  const flipAWin = Math.random() < 0.5
  if (flipAWin) {
    a.coins += 2
  } else {
    b.coins += 2
  }
  return [a, b].filter(p => p.coins > 0)
}

/**
 * Executes one full round: shuffles players, handles odd player, processes matches.
 */
function round(players: Player[]): Player[] {
  const shuffled = shufflePlayers(players)
  const survivors: Player[] = []

  let startIdx = 0
  // If odd, first player sits out
  if (shuffled.length % 2 === 1) {
    survivors.push({ ...shuffled[0] })
    startIdx = 1
  }

  // Process all pairs
  for (let i = startIdx; i < shuffled.length; i += 2) {
    const [a, b] = [{ ...shuffled[i] }, { ...shuffled[i + 1] }]
    const matchSurvivors = playMatch(a, b)
    survivors.push(...matchSurvivors)
  }

  return survivors
}
