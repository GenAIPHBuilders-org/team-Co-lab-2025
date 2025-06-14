import {
  Rocket,
  UserCircle,
  Volume2,
  Palette,
  Database,
  Smile,
} from "lucide-react";

type TProductResponseType = {
  id: number;
  icon: React.ComponentType;
  name: string;
  description: string;
  price: number;
  stock: number;
  type: "upgrade" | "item";
  badge: string;
};

export const produceMockData: TProductResponseType[] = [
  {
    id: 1,
    icon: Rocket,
    name: "AI Booster",
    description:
      "Boost your AI companion's performance with this exclusive upgrade. Enjoy faster responses and enhanced capabilities.",
    price: 120,
    type: "upgrade",
    badge: "Popular",
    stock: 15,
  },
  {
    id: 2,
    icon: UserCircle,
    name: "Custom Avatar",
    description:
      "Personalize your AI with a unique avatar. Choose from hundreds of styles or upload your own design.",
    price: 80,
    type: "item",
    badge: "",
    stock: 23,
  },
  {
    id: 3,
    icon: Volume2,
    name: "Voice Pack",
    description:
      "Unlock new voices for your AI companion. Includes 12 premium voice options with various accents and tones.",
    price: 60,
    type: "upgrade",
    badge: "New",
    stock: 8,
  },
  {
    id: 4,
    icon: Palette,
    name: "Theme Pack",
    description:
      "Change the look and feel of your AI interface. Includes 5 premium themes with customizable elements.",
    price: 50,
    type: "item",
    badge: "",
    stock: 31,
  },
  {
    id: 5,
    icon: Database,
    name: "Memory Expansion",
    description:
      "Increase your AI's memory capacity. Allows for longer conversations and better context retention.",
    price: 95,
    type: "upgrade",
    badge: "Limited",
    stock: 5,
  },
  {
    id: 6,
    icon: Smile,
    name: "Personality Module",
    description:
      "Add new personality traits to your AI companion. Choose from 8 different personality types.",
    price: 70,
    type: "item",
    badge: "",
    stock: 19,
  },
];
