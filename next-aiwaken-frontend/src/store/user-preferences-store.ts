import { create } from "zustand";

type TUserPreferenceValues = {
  ageRange: string;
  motivationLevel: string;
  learningGoal: string;
  explanationDepth: string;
  companion: string;
  user_id: string;
  learningStyle: string;
};

type TPartialUserPreferenceValues = Partial<TUserPreferenceValues> & {
  setUserPreferences: (values: Partial<TUserPreferenceValues>) => void;
};

export const useUserPreferencesStore = create<TPartialUserPreferenceValues>(
  (set) => ({
    setUserPreferences: (values) => set((state) => ({ ...state, ...values })),
  })
);
