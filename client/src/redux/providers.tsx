"use client";

import { persistor, store } from '.';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>;
}