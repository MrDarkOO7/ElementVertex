"use client";

import { createContext, useContext, useMemo, useState } from "react";

const InterestContext = createContext(null);

/**
 * Remembers which service a visitor showed interest in (via the quiz or the
 * services explorer) so the contact form can pre-select it.
 */
export function InterestProvider({ children }) {
  const [interest, setInterest] = useState("");
  const value = useMemo(() => ({ interest, setInterest }), [interest]);
  return <InterestContext.Provider value={value}>{children}</InterestContext.Provider>;
}

export function useInterest() {
  const ctx = useContext(InterestContext);
  if (!ctx) throw new Error("useInterest must be used inside <InterestProvider>");
  return ctx;
}
