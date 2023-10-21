import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { usersReducer } from '../features/users/userSlice';
import { photosReducer } from '../features/photos/photosSlice';

const usersPersistConfig = {
  key: 'musicApp:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  usersReducer: persistReducer(usersPersistConfig, usersReducer),
  photosReducer: photosReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persist = persistStore(store);
