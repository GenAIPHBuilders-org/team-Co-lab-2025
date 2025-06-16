import {
  Sparkles,
  Rocket,
  Castle,
  Search,
  Dna,
  Gift,
  Baby,
  GraduationCap,
  User,
  UserCog,
  BookOpen,
  Lightbulb,
  Target,
  Brain,
  Heart,
  Trophy,
  Book,
  Bookmark,
  BookOpenCheck,
  BookOpenText,
  BookText,
  BookType,
} from "lucide-react";

export type TAdventureStyle = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
};

export type TAgeRange = {
  range: string;
  label: string;
  icon: React.ComponentType;
};

export type TMotivationLevel = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
};

export type TLearningGoal = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
};

export type TExplanationDepth = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
};

export type TCompanion = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType;
  color: string;
};

export const adventureStyles: TAdventureStyle[] = [
  {
    id: "fantasy",
    title: "Fantasy",
    description: "Magical & mysterious",
    icon: Sparkles,
    color: "bg-purple-700/10 border-purple-700/30",
  },
  {
    id: "space",
    title: "Space",
    description: "Futuristic & cosmic",
    icon: Rocket,
    color: "bg-blue-700/10 border-blue-700/30",
  },
  {
    id: "medieval",
    title: "Medieval",
    description: "Classic adventure",
    icon: Castle,
    color: "bg-amber-700/10 border-amber-700/30",
  },
  {
    id: "mystery",
    title: "Mystery",
    description: "Dark & puzzling",
    icon: Search,
    color: "bg-slate-700/10 border-slate-700/30",
  },
  {
    id: "scifi",
    title: "Sci-fi",
    description: "The Edge of Thought",
    icon: Dna,
    color: "bg-cyan-700/10 border-cyan-700/30",
  },
  {
    id: "surprise",
    title: "Surprise me!",
    description: "I'll let fate decide!",
    icon: Gift,
    color: "bg-pink-700/10 border-pink-700/30",
  },
];

export const ageRanges: TAgeRange[] = [
  { range: "13-17", label: "Teen", icon: Baby },
  { range: "18-24", label: "Young Adult", icon: GraduationCap },
  { range: "25-34", label: "Adult", icon: User },
  { range: "35+", label: "Mature", icon: UserCog },
];

export const motivationLevels: TMotivationLevel[] = [
  {
    id: "beginner",
    title: "Just Starting",
    description: "I'm new to this and want to learn the basics",
    icon: BookOpen,
    color: "bg-green-700/10 border-green-700/30",
  },
  {
    id: "intermediate",
    title: "Getting Serious",
    description: "I know some basics and want to improve",
    icon: Lightbulb,
    color: "bg-blue-700/10 border-blue-700/30",
  },
  {
    id: "advanced",
    title: "Mastery Seeker",
    description: "I want to become an expert in this field",
    icon: Target,
    color: "bg-purple-700/10 border-purple-700/30",
  },
];

export const learningGoals: TLearningGoal[] = [
  {
    id: "understanding",
    title: "Deep Understanding",
    description: "I want to truly understand the concepts",
    icon: Brain,
    color: "bg-indigo-700/10 border-indigo-700/30",
  },
  {
    id: "practical",
    title: "Practical Skills",
    description: "I want to apply this knowledge in real life",
    icon: Heart,
    color: "bg-pink-700/10 border-pink-700/30",
  },
  {
    id: "certification",
    title: "Certification",
    description: "I'm preparing for a certification or exam",
    icon: Trophy,
    color: "bg-amber-700/10 border-amber-700/30",
  },
];

export const explanationDepths: TExplanationDepth[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Simple explanations with key points",
    icon: Book,
    color: "bg-green-700/10 border-green-700/30",
  },
  {
    id: "detailed",
    title: "Detailed",
    description: "In-depth explanations with examples",
    icon: BookOpen,
    color: "bg-blue-700/10 border-blue-700/30",
  },
  {
    id: "comprehensive",
    title: "Comprehensive",
    description: "Complete coverage with advanced concepts",
    icon: BookOpenCheck,
    color: "bg-purple-700/10 border-purple-700/30",
  },
];

export const companions: TCompanion[] = [
  {
    id: "sage",
    name: "The Sage",
    description: "A wise mentor who guides you through complex concepts",
    icon: BookOpenText,
    color: "bg-amber-700/10 border-amber-700/30",
  },
  {
    id: "explorer",
    name: "The Explorer",
    description: "An adventurous guide who makes learning exciting",
    icon: BookText,
    color: "bg-blue-700/10 border-blue-700/30",
  },
  {
    id: "analyst",
    name: "The Analyst",
    description: "A logical thinker who breaks down complex topics",
    icon: BookType,
    color: "bg-purple-700/10 border-purple-700/30",
  },
  {
    id: "innovator",
    name: "The Innovator",
    description: "A creative mind who thinks outside the box",
    icon: Bookmark,
    color: "bg-pink-700/10 border-pink-700/30",
  },
];
