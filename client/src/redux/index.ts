import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer, persistStore } from 'redux-persist';

const createNoopStorage = () => {
	return {
	  getItem(_key: any) {
		return Promise.resolve(null);
	  },
	  setItem(_key: any, value: any) {
		return Promise.resolve(value);
	  },
	  removeItem(_key: any) {
		return Promise.resolve();
	  },
	};
  };

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
	key: 'root',
	storage: storage,
}
const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;