import { Button } from "../ui/button";
import { Store, Gift, Star, Heart, Coins, Trophy, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { AnimatedModal } from "../ui/animated-modal";

const rewards = [
  { day: 1, icon: <Heart className="h-6 w-6 text-red-400" />, reward: "+1 Heart" },
  { day: 2, icon: <Coins className="h-6 w-6 text-yellow-400" />, reward: "+50 Coins" },
  { day: 3, icon: <Star className="h-6 w-6 text-blue-400" />, reward: "+100 XP" },
  { day: 4, icon: <Heart className="h-6 w-6 text-red-400" />, reward: "+2 Hearts" },
  { day: 5, icon: <Coins className="h-6 w-6 text-yellow-400" />, reward: "+100 Coins" },
  { day: 6, icon: <Star className="h-6 w-6 text-blue-400" />, reward: "+150 XP" },
  { day: 7, icon: <Trophy className="h-6 w-6 text-purple-400" />, reward: "Special Badge" },
];

export const DailyCheckInModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(3); // Mock current streak
  const [claimedToday, setClaimedToday] = useState(false);

  const handleClaim = () => {
    if (!claimedToday) {
      setClaimedToday(true);
      setCurrentStreak(prev => prev + 1);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="h-9 px-3 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <Store className="h-4 w-4" />
        <span className="hidden sm:inline">Daily Check-in</span>
        <Badge
          variant="secondary"
          className=" h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]"
        >
          !
        </Badge>
      </Button>

      <AnimatedModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Daily Check-in"
        size="xl"
      >
        <div className="space-y-6">
          {/* Streak Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-slate-300">Current Streak</span>
            </div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              {currentStreak} days
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Next Reward</span>
              <span className="text-purple-400">Day {currentStreak + 1}</span>
            </div>
            <Progress value={(currentStreak % 7) * (100 / 7)} className="h-2" />
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-7 gap-2">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.day}
                className={`relative aspect-square rounded-lg border ${index < currentStreak
                  ? "border-purple-500/50 bg-purple-500/10"
                  : "border-slate-700 bg-slate-800/50"
                  } p-2 flex flex-col items-center justify-center`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-xs text-slate-400 mb-1">Day {reward.day}</div>
                <div className="mb-1">{reward.icon}</div>
                <div className="text-[10px] text-center text-slate-300">{reward.reward}</div>
                {index < currentStreak && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-purple-500/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Trophy className="h-4 w-4 text-purple-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Claim Button */}
          <motion.div
            className="flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={handleClaim}
              disabled={claimedToday}
              className={`w-full ${claimedToday
                ? "bg-slate-700 text-slate-400"
                : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
            >
              {claimedToday ? (
                "Already Claimed Today"
              ) : (
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Claim Today&apos;s Reward
                </div>
              )}
            </Button>
          </motion.div>

          {/* Streak Info */}
          <div className="text-center text-sm text-slate-400">
            <p>Come back tomorrow to maintain your streak!</p>
            <p className="text-xs mt-1">Longer streaks unlock better rewards</p>
          </div>
        </div>
      </AnimatedModal>
    </>
  );
};