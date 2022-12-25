import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface SinglePlayerState {
    name: string
    player: string
}

interface PlayersSliceState {
    players: SinglePlayerState[]
}

const initialState: PlayersSliceState = {
    players: []
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        createPlayers: (
            state: PlayersSliceState,
            action: PayloadAction<SinglePlayerState[]>
        ) => {
            state.players = action.payload
        }
    }
})

export const { createPlayers } = playersSlice.actions

export const getPlayers = (state: RootState) => state.players.players
export const players = playersSlice.reducer
