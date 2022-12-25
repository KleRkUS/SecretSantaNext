import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ThemesKeys } from '#app/constants';

import { RootState } from '../store';

interface ThemeState {
    current: ThemesKeys;
}

const initialState: ThemeState = {
    current: 'light'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state: ThemeState, action: PayloadAction<ThemesKeys>) => {
            state.current = action.payload;
        }
    }
});

export const { changeTheme } = themeSlice.actions;

export const getCurrentTheme = (state: RootState) => state.theme.current;
export const theme = themeSlice.reducer;
