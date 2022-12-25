import { createSlice } from '@reduxjs/toolkit'

import {allThemes, ThemesKeys} from '#constants/themes'

import { RootState } from '../store'

interface ThemeState {
    current: ThemesKeys
}

const initialState: ThemeState = {
    current: 'light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state: ThemeState) => {
            const currentIndex = allThemes.findIndex((theme) => theme === state.current);

            if (currentIndex === allThemes.length - 1) {
                state.current = allThemes[0]
            } else {
                state.current = allThemes[currentIndex + 1];
            }
        }
    }
})

export const { switchTheme } = themeSlice.actions

export const getCurrentTheme = (state: RootState) => state.theme.current
export const theme = themeSlice.reducer
