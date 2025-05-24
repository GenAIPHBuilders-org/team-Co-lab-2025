"use client";

import { useState, useEffect } from "react";

type Companion = {
  title: string;
  personality: string;
  motivation_style: string;
};

type CompanionsData = {
  companions: {
    [key: string]: Companion;
  };
};

export function useCompanion() {
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(
    null
  );
  const [companionDetails, setCompanionDetails] = useState<Companion | null>(
    null
  );

  useEffect(() => {
    const savedCompanion = localStorage.getItem("selectedCompanion");
    if (savedCompanion) {
      setSelectedCompanion(savedCompanion);

      const companionsDataString = localStorage.getItem("companionsData");
      if (companionsDataString) {
        try {
          const companionsData = JSON.parse(
            companionsDataString
          ) as CompanionsData;
          if (companionsData.companions[savedCompanion]) {
            setCompanionDetails(companionsData.companions[savedCompanion]);
          }
        } catch (error) {
          console.error("Error parsing companions data:", error);
        }
      }
    }
  }, []);

  const selectCompanion = (companionName: string) => {
    setSelectedCompanion(companionName);
    localStorage.setItem("selectedCompanion", companionName);

    const companionsDataString = localStorage.getItem("companionsData");
    if (companionsDataString) {
      try {
        const companionsData = JSON.parse(
          companionsDataString
        ) as CompanionsData;
        if (companionsData.companions[companionName]) {
          setCompanionDetails(companionsData.companions[companionName]);
        }
      } catch (error) {
        console.error("Error parsing companions data:", error);
      }
    }
  };

  return {
    selectedCompanion,
    companionDetails,
    selectCompanion,
  };
}
