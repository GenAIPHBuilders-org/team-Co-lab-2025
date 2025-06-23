import {
  Sparkles,
  Rocket,
  Castle,
  Search,
  Dna,
  Baby,
  GraduationCap,
  User,
  UserCog,
  BookOpen,
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
  Star,
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
  level: string;
  description: string;
  icon: React.ComponentType;
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
    description:
      "Embark on a magical journey through enchanted realms, where spells and mythical creatures bring learning to life in an immersive fantasy world.",
    icon: Sparkles,
    color: "bg-purple-700/10 border-purple-700/30",
  },
  {
    id: "space",
    title: "Space",
    description:
      "Explore the cosmos of knowledge, where futuristic concepts and cosmic discoveries await your exploration across the vast universe.",
    icon: Rocket,
    color: "bg-blue-700/10 border-blue-700/30",
  },
  {
    id: "medieval",
    title: "Medieval",
    description:
      "Journey through time to an era of knights and castles, where learning becomes an epic adventure in a medieval setting.",
    icon: Castle,
    color: "bg-amber-700/10 border-amber-700/30",
  },
  {
    id: "mystery",
    title: "Mystery",
    description:
      "Unravel the secrets of knowledge through intriguing puzzles and enigmatic challenges in a mysterious atmosphere.",
    icon: Search,
    color: "bg-slate-700/10 border-slate-700/30",
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
    level: "Curious Explorer",
    description:
      "Taking your first steps into the world of learning, eager to discover and understand new concepts with enthusiasm.",
    icon: Sparkles,
  },
  {
    id: "intermediate",
    level: "Focused Learner",
    description:
      "Building a strong foundation of knowledge with consistent dedication and regular practice in your studies.",
    icon: Target,
  },
  {
    id: "advanced",
    level: "Ambitious Achiever",
    description:
      "Pushing boundaries and striving for excellence in your learning journey with determination. You're ready to take on new challenges.",
    icon: Rocket,
  },
  {
    id: "master",
    level: "Master Seeker",
    description:
      "Pursuing mastery with deep expertise and comprehensive understanding of complex topics in your field.",
    icon: Star,
  },
];

export const learningGoals: TLearningGoal[] = [
  {
    id: "mastery",
    title: "Master the Subject",
    description:
      "Develop a deep, comprehensive understanding of the subject matter through focused study and thorough exploration of concepts.",
    icon: Brain,
    color: "bg-indigo-700/10 border-indigo-700/30",
  },
  {
    id: "exam-success",
    title: "Ace the Exam",
    description:
      "Prepare effectively for upcoming tests and exams with targeted practice, mock tests, and strategic study techniques.",
    icon: Trophy,
    color: "bg-pink-700/10 border-pink-700/30",
  },
  {
    id: "hands-on",
    title: "Hands-on Practice",
    description:
      "Gain practical experience through real-world applications, projects, and exercises to build confidence in your skills.",
    icon: Heart,
    color: "bg-amber-700/10 border-amber-700/30",
  },
  {
    id: "career-growth",
    title: "Career Growth",
    description:
      "Enhance your professional development with industry-relevant skills and knowledge to advance your career path.",
    icon: Dna,
    color: "bg-cyan-700/10 border-cyan-700/30",
  },
];

export const explanationDepths: TExplanationDepth[] = [
  {
    id: "basic",
    title: "Basic",
    description:
      "Clear and concise explanations focusing on essential concepts and fundamental principles for beginners.",
    icon: Book,
    color: "bg-green-700/10 border-green-700/30",
  },
  {
    id: "detailed",
    title: "Detailed",
    description:
      "Comprehensive explanations with practical examples and step-by-step guidance for intermediate learners.",
    icon: BookOpen,
    color: "bg-blue-700/10 border-blue-700/30",
  },
  {
    id: "comprehensive",
    title: "Comprehensive",
    description:
      "In-depth coverage including advanced concepts, real-world applications, and expert insights for serious learners.",
    icon: BookOpenCheck,
    color: "bg-purple-700/10 border-purple-700/30",
  },
  {
    id: "expert",
    title: "Expert Level",
    description:
      "Advanced theoretical concepts with cutting-edge research and industry best practices for expert learners.",
    icon: BookType,
    color: "bg-red-700/10 border-red-700/30",
  },
];

export const companions: TCompanion[] = [
  {
    id: "sage",
    name: "The Sage",
    description:
      "A wise mentor who provides deep insights and helps you navigate complex concepts with clarity and wisdom.",
    icon: BookOpenText,
    color: "bg-amber-700/10 border-amber-700/30",
  },
  {
    id: "explorer",
    name: "The Explorer",
    description:
      "An enthusiastic guide who makes learning an exciting adventure through interactive experiences and discovery.",
    icon: BookText,
    color: "bg-blue-700/10 border-blue-700/30",
  },
  {
    id: "analyst",
    name: "The Analyst",
    description:
      "A methodical thinker who breaks down complex topics into clear, logical components for better understanding.",
    icon: BookType,
    color: "bg-purple-700/10 border-purple-700/30",
  },
  {
    id: "innovator",
    name: "The Innovator",
    description:
      "A creative mentor who encourages innovative thinking and unique problem-solving approaches in learning.",
    icon: Bookmark,
    color: "bg-pink-700/10 border-pink-700/30",
  },
];
