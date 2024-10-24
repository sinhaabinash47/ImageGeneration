import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/users/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistCongi = {
    key: 'root',
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistCongi, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);