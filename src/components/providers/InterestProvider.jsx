"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const InterestContext = createContext(null);

/**
 * Shared, page-independent state about services:
 *
 * - `interest`: the service a visitor asked about (quiz result, "Talk to us about
 *   this"). The contact form pre-selects it.
 * - `serviceRequest`: a request to open a service in the explorer on /services
 *   (footer links, homepage cards). It is an object, not just an id, so asking for
 *   the same service twice still counts as a new request.
 */
export function InterestProvider({ children }) {
  const [interest, setInterest] = useState("");
  const [serviceRequest, setServiceRequest] = useState(null);
  const showService = useCallback((id) => setServiceRequest({ id }), []);

  const value = useMemo(
    () => ({ interest, setInterest, serviceRequest, showService }),
    [interest, serviceRequest, showService],
  );
  return <InterestContext.Provider value={value}>{children}</InterestContext.Provider>;
}

export function useInterest() {
  const ctx = useContext(InterestContext);
  if (!ctx) throw new Error("useInterest must be used inside <InterestProvider>");
  return ctx;
}
