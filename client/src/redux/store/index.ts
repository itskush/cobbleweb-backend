import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage: storageSession,
}
const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
	reducer: {
		auth: persistedReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk]
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;