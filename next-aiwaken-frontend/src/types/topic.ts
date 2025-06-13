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
