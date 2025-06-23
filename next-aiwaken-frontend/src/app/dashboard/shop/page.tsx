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
import { produceMockData } from "@/constants/shop"
import {
  Sparkles,
  Package,
  Coins,
} from 'lucide-react'

// const mock = {
//   "learning_style": "visual",
//   "tone": "friendly",
//   "goals": ["master algebra in 2 weeks"],
//   "preferences": {
//     "format": "infographics",
//     "difficulty": "medium"
//   }
// }

export default function ShopPage() {

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
              {produceMockData.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upgrade" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produceMockData.filter(item => item.type === "upgrade").map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="item" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produceMockData.filter(item => item.type === "item").map((item) => (
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
    icon: React.ElementType;
    name: string;
    description: string;
    price: number;
    type: string;
    badge: string;
    stock: number;
  };
}

function ProductCard({ item }: ProductCardProps) {
  const Icon = item.icon;
  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-indigo-700/30 transition-all duration-300">
      <div className="relative flex items-center justify-center h-48 bg-gradient-to-br from-slate-800 to-gray-900">
        <Icon className="w-20 h-20 text-purple-400 drop-shadow-lg" />
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
        <Button variant="outline" className="flex cursor-pointer hover:scale-105 items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-3 py-1.5 border border-yellow-500/30">
          <Coins className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-semibold text-white">{item.price}</span>
          <span className="text-xs text-yellow-300">Coins</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
