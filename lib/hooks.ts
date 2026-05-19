"use client";

import React, { useState, useEffect } from "react";
import { useSiteStore } from "@/store/useSiteStore";

/**
 * Hook personnalisé pour éviter les erreurs d'hydratation avec Zustand Persist
 * Il s'assure que le store est chargé avant de rendre le composant.
 */
export const useIsHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
