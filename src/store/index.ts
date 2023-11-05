import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
