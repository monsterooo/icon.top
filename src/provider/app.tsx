"use client";

import { createContext, useContext } from "react";
import { App } from "../stores/app";

let store: App;
export const StoreContext = createContext<App>(new App());

export function useAppStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useAppStore Store must be used within AppProvider");
  }

  return context;
}

function initializeStore() {
  const _store = store ?? new App();

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
}

export function AppProvider({ children }: { children: JSX.Element }) {
  const store = initializeStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
