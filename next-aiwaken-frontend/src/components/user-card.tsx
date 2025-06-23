import { Flame, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthentication } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { LottieAnimation } from "./ui/lottie";
import yo from "@/components/lottie-json/yo.json";

export function UserCard() {
  const { user: userDetails } = useAuthentication();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 `}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#9F8DFC]" />
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className={cn(
                  "rounded-full bg-gray-700/20 flex items-center justify-center",
                  "lg",
                  "shadow-lg border-2 border-[#9F8DFC]",
                )}
              >
                <LottieAnimation animationData={yo} height="auto" width={130} />
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9F8DFC] text-white text-xs px-2 py-0.5 rounded-full shadow">
                Level {userDetails?.stats.level}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{userDetails?.user.username}</h3>
              <p className="text-sm text-gray-300">Student</p>
              <div className="flex items-center gap-2 mt-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-xs text-gray-400">{userDetails?.preferences.age_range}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 py-4">
            <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 px-3 py-1.5 border border-orange-500/30">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-semibold text-white">{userDetails?.stats.streak}</span>
              <span className="text-xs text-orange-300">Streak</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Exp :</span>
                <span>{userDetails?.stats.experience} / {userDetails?.stats?.experience_to_next_level as number}</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#9F8DFC] to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userDetails?.stats.experience as number / (userDetails?.stats.experience_to_next_level as number)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}