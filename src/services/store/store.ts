import { configureStore } from '@reduxjs/toolkit';

import { players, theme } from './slices';

export const store = configureStore({
    reducer: {
        players,
        theme
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
