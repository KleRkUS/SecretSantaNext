import { createSlice } from '@reduxjs/toolkit';

import { ALL_THEMES, ThemesKeys } from '#constants/themes';

import { RootState } from '../store';

interface ThemeState {
    current: ThemesKeys;
}

const initialState: ThemeState = {
    current: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state: ThemeState) => {
            const currentIndex = ALL_THEMES.findIndex((theme) => theme === state.current);

            if (currentIndex === ALL_THEMES.length - 1) {
                state.current = ALL_THEMES[0];
            } else {
                state.current = ALL_THEMES[currentIndex + 1];
            }
        },
    },
});

export const { switchTheme } = themeSlice.actions;

export const getCurrentTheme = (state: RootState) => state.theme.current;
export const theme = themeSlice.reducer;
