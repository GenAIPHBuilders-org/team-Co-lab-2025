import { useUserPreferencesStore } from "@/store/user-preferences-store";

export const useUserPreferences = () => {
  const ageRange = useUserPreferencesStore((state) => state.ageRange);
  const motivationLevel = useUserPreferencesStore(
    (state) => state.motivationLevel
  );
  const learningGoal = useUserPreferencesStore((state) => state.learningGoal);
  const explanationDepth = useUserPreferencesStore(
    (state) => state.explanationDepth
  );
  const companion = useUserPreferencesStore((state) => state.companion);
  const user_id = useUserPreferencesStore((state) => state.user_id);
  const learningStyle = useUserPreferencesStore((state) => state.learningStyle);

  return {
    ageRange,
    motivationLevel,
    learningGoal,
    explanationDepth,
    companion,
    user_id,
    learningStyle,
    setUserPreferences: useUserPreferencesStore(
      (state) => state.setUserPreferences
    ),
  };
};
