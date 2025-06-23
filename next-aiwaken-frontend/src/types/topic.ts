import { TTopics } from "@/services/topic-service";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface DifficultyConfig {
  label: string;
  color: string;
  textColor: string;
  level: number;
}

export interface Topic {
  id: number;
  name: string;
  icon: string | React.ComponentType;
  color: string;
  locked: boolean;
  difficulty: Difficulty;
  description: string;
  rewards: string[];
  completion_percentage?: number;
  is_completed?: boolean;
  min_level_required?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TopicCardProps {
  topic: TTopics;
  isSelected: boolean;
  onClick: (topic: TTopics) => void;
}

export interface TopicModalProps {
  topic: TTopics | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    subject: string,
    difficulty: string,
    topicId: string
  ) => Promise<void>;
  isPending: boolean;
}

export type TModalContextProps = Omit<
  TopicModalProps,
  "topic" | "isPending" | "onConfirm"
>;

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

export interface AllTopicsResponse {
  topics: Topic[];
  total: number;
}
