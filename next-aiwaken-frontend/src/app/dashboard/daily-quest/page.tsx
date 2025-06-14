"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { Sparkles, Package } from 'lucide-react'

export const mockData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    name: "AI Booster",
    description: "Boost your AI companion's performance with this exclusive upgrade. Enjoy faster responses and enhanced capabilities.",
    price: 120,
    type: "upgrade",
    badge: "Popular",
    stock: 15,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    name: "Custom Avatar",
    description: "Personalize your AI with a unique avatar. Choose from hundreds of styles or upload your own design.",
    price: 80,
    type: "item",
    badge: "",
    stock: 23,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    name: "Voice Pack",
    description: "Unlock new voices for your AI companion. Includes 12 premium voice options with various accents and tones.",
    price: 60,
    type: "upgrade",
    badge: "New",
    stock: 8,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    name: "Theme Pack",
    description: "Change the look and feel of your AI interface. Includes 5 premium themes with customizable elements.",
    price: 50,
    type: "item",
    badge: "",
    stock: 31,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80",
    name: "Memory Expansion",
    description: "Increase your AI's memory capacity. Allows for longer conversations and better context retention.",
    price: 95,
    type: "upgrade",
    badge: "Limited",
    stock: 5,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=400&q=80",
    name: "Personality Module",
    description: "Add new personality traits to your AI companion. Choose from 8 different personality types.",
    price: 70,
    type: "item",
    badge: "",
    stock: 19,
  },
];

export default function DailyQuizLayout() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-950 text-white">
      <div className="container mx-auto mt-12 py-12 px-4 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">AIwaken Store</h1>
            <Badge variant="outline" className="ml-2 bg-purple-500/10 text-purple-300 border-purple-500/20">
              12 Exclusive Products
            </Badge>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl">
            Explore our exclusive items and upgrades to enhance your AI companion experience.
            Unlock new capabilities and personalize your digital assistant.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-[#9600ff50] rounded-lg p-2">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="upgrade">Upgrades</TabsTrigger>
              <TabsTrigger value="item">Items</TabsTrigger>
            </TabsList>

          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upgrade" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.filter(item => item.type === "upgrade").map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="item" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.filter(item => item.type === "item").map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center pt-8">
          <p className="text-sm text-gray-400">
            Stay tuned for exciting new items coming soon!
            <span className="ml-1 text-purple-400">Subscribe to our newsletter for updates.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  item: {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    type: string;
    badge: string;
    stock: number;
  };
}

function ProductCard({ item }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-indigo-700/50 transition-all duration-300">
      <div className="relative">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {item.badge && (
          <Badge className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-600">
            {item.badge}
          </Badge>
        )}
        <Badge
          variant="outline"
          className="absolute top-3 left-3 bg-gray-900/70 border-gray-700"
        >
          {item.type === "upgrade" ? (
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Upgrade</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              <span>Item</span>
            </div>
          )}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle>{item.name}</CardTitle>
        <CardDescription className="text-gray-400">
          Stock: {item.stock} available
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-300">{item.description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <div className="text-lg font-bold text-purple-300">${item.price}</div>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
