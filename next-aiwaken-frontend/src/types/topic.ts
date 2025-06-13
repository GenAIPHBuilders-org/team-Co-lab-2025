export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface DifficultyConfig {
  label: string;
  color: string;
  textColor: string;
  level: number;
  stats: {
    strength: number;
    intelligence: number;
    endurance: number;
  };
}

export interface Topic {
  id: number;
  name: string;
  icon: React.ComponentType;
  color: string;
  locked: boolean;
  difficulty: Difficulty;
  description: string;
  rewards: string[];
}

export interface TopicCardProps {
  topic: Topic;
  isSelected: boolean;
  onClick: (topic: Topic) => void;
}

export interface TopicModalProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (subject: string, difficulty: string) => Promise<void>;
  isPending: boolean;
}

export type TVideoState = {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  isFullscreen: boolean;
  isBookmarked: boolean;
  showNotes: boolean;
};

export type TVideoAction =
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "SET_MUTED"; payload: boolean }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "SET_FULLSCREEN"; payload: boolean }
  | { type: "SET_BOOKMARKED"; payload: boolean }
  | { type: "SET_SHOWNOTES"; payload: boolean };
