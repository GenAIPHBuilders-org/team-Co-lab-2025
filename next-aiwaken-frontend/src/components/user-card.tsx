import { Brain, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import AnimationVariants from "@/lib/animations";
import { useAuthentication } from "@/contexts/auth-context";
import { Progress } from "./ui/progress";

export function UserCard() {
  const { user } = useAuthentication();

  return (
    <motion.div variants={AnimationVariants.itemVariants} className="md:col-span-1">
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
          <div className="bg-gray-900 p-6 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Hunter Rank</h3>
                    <p className="text-sm text-gray-400">E-Rank Hunter</p>
                  </div>
                </div>
                <Badge className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30">Level {user?.stats.level}</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Experience</span>
                    <span className="text-gray-300">{user?.stats.experience || 0}/{user?.stats.experience_to_next_level || 0} XP</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <Progress
                      value={user?.stats.experience || 0}
                      max={100}
                      className="h-2 bg-gray-800 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-blue-500"
                      style={{ width: `${user?.stats.experience || 0}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-gray-300">Intelligence</span>
                    </div>
                    <span className="text-2xl font-bold text-white">42</span>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">Wisdom</span>
                    </div>
                    <span className="text-2xl font-bold text-white">38</span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Current Quest</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Advanced AI Concepts</span>
                    <span className="text-sm text-gray-400">3/5 completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
      </div>
    </motion.div>
  )
}