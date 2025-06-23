"use client";
import { Button } from "../ui/button";
import { Store, Gift, Star, Heart, Coins, Trophy, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { AnimatedModal } from "../ui/animated-modal";
import { useClaimDailyReward } from "@/(features)/daily-reward-action";
import { TDailyRewardResponse } from "@/types/services";

type DailyCheckInModalProps = {
  dailyRewards: TDailyRewardResponse | null
}

export const DailyCheckInModal = ({ dailyRewards }: DailyCheckInModalProps) => {
  const { claimDailyRewardAsync, isPending } = useClaimDailyReward();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showRewardModal, setShowRewardModal] = useState<boolean>(false);
  const [claimedReward, setClaimedReward] = useState<{ type: "heart" | "coin" | "xp"; reward: string } | null>(null);

  if (!dailyRewards) {
    return null;
  }

  function renderIcon(type: "heart" | "coin" | "xp") {
    switch (type) {
      case "heart":
        return <Heart className="h-6 w-6 text-red-400" />;
      case "coin":
        return <Coins className="h-6 w-6 text-yellow-400" />;
      case "xp":
        return <Star className="h-6 w-6 text-blue-400" />;
      default:
        return null;
    }
  }

  async function handleClaimDailyReward() {
    try {
      await claimDailyRewardAsync();
      const currentDayReward = dailyRewards?.rewards.find(reward => reward.day === dailyRewards.current_streak + 1);

      if (currentDayReward) {
        setClaimedReward({
          type: currentDayReward.type as "heart" | "coin" | "xp",
          reward: currentDayReward.reward
        });
        setShowRewardModal(true);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error claiming daily reward:", error);
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        className="h-9 px-3 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <Store className="h-4 w-4" />
        <span className="hidden sm:inline">Daily Check-in</span>
        {dailyRewards.can_claim && (
          <Badge
            variant="secondary"
            className=" h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]"
          >
            !
          </Badge>
        )}
      </Button>

      <AnimatedModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Daily Check-in"
        size="xl"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-slate-300">Current Streak</span>
            </div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              {dailyRewards.current_streak} {dailyRewards.current_streak > 1 ? "days" : "day"}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Next Reward</span>
              <span className="text-purple-400">Day {dailyRewards.current_streak + 1}</span>
            </div>
            <Progress value={(dailyRewards.current_streak % 7) * (100 / 7)} className="h-2" />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {dailyRewards.rewards.map((reward, index) => (
              <motion.div
                key={reward.day}
                className={`relative aspect-square rounded-lg border ${index < dailyRewards.current_streak + 1
                  ? "border-purple-500/50 bg-purple-300/40 glow-border text-white"
                  : "border-slate-700 bg-slate-800/50"
                  } p-2 flex flex-col items-center justify-center`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-xs  mb-1">Day {reward.day}</div>
                <div className="mb-1">{renderIcon(reward.type as "heart" | "coin" | "xp")}</div>
                <div className="text-[10px] text-center text-slate-300">{reward.reward}</div>
                {index < dailyRewards.current_streak && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-purple-500/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Trophy className="h-6 w-6 text-purple-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={handleClaimDailyReward}
              disabled={!dailyRewards.can_claim}
              loading={isPending}
              className={`w-full ${!dailyRewards.can_claim
                ? "bg-slate-700 text-slate-400"
                : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
            >
              {!dailyRewards.can_claim ? (
                "Already Claimed Today"
              ) : (
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Claim Today&apos;s Reward
                </div>
              )}
            </Button>
          </motion.div>

          {dailyRewards.can_claim ? (
            <div className="text-center text-sm text-slate-400">
              <p>Claim your reward to maintain your streak!</p>
              <p className="text-xs mt-1">Longer streaks unlock better rewards</p>
            </div>
          ) : (
            <div className="text-center text-sm text-slate-400">
              <p>Come back tomorrow to maintain your streak!</p>
              <p className="text-xs mt-1">Longer streaks unlock better rewards</p>
            </div>
          )}
        </div>
      </AnimatedModal>

      <AnimatedModal
        isOpen={showRewardModal}
        onClose={() => {
          setShowRewardModal(false);
          window.location.reload();
        }}
        size="xl"
      >
        <div className="text-center space-y-6 py-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                {claimedReward && renderIcon(claimedReward.type)}
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Trophy className="h-6 w-6 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h3 className="text-xl font-semibold text-white">Reward Claimed!</h3>
            <p className="text-slate-300">You received:</p>
            <Badge variant="outline" className="text-2xl font-bold text-purple-400">{claimedReward?.reward || "No reward"}</Badge>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button onClick={() => setShowRewardModal(false)}>Close</Button>
          </motion.div>
        </div>
      </AnimatedModal>
    </>
  );
};