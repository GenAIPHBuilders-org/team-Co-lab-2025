"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Users, Gift, Star, Copy } from "lucide-react"
import { motion } from "framer-motion"
import { useClipboard } from "@/hooks/use-clipboard"

export default function ReferralPage() {
  const copyReferralCode = useClipboard();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-950 text-white">
      <div className="container mx-auto mt-12 py-12 px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-8"
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-10" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Invite Friends</h1>
                <p className="text-purple-100 mb-4">
                  Share your referral code and earn rewards for each friend who joins!
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className="bg-white/20 text-white">
                    <Gift className="h-4 w-4 mr-1" />
                    Get 100 coins per referral
                  </Badge>
                  <Badge className="bg-white/20 text-white">
                    <Star className="h-4 w-4 mr-1" />
                    +500 XP bonus
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-purple-100 mb-1">Your Referral Code</p>
                  <p className="text-2xl font-mono font-bold">AIWAKEN2024</p>
                </div>
                <Button className="w-full bg-white text-purple-600 hover:bg-purple-50" onClick={() => copyReferralCode.copyToClipboard("AIWAKEN2024")}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copyReferralCode.isCopied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Referral Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Referrals</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Gift className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Coins Earned</p>
                    <p className="text-2xl font-bold">1,200</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Star className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">XP Earned</p>
                    <p className="text-2xl font-bold">6,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Share Options */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle>Share with Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Twitter", "Facebook", "LinkedIn", "Email"].map((platform, index) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 hover:bg-slate-800"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {platform}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
