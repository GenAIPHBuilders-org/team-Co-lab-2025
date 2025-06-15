import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TopicModalProps } from "@/types/topic";
import { difficultyMap } from "@/constants/topics";
import AnimationVariants from "@/lib/animations";

export function TopicModal({ topic, isOpen, onClose, onConfirm, isPending }: TopicModalProps) {
  if (!topic) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md border-0 bg-gray-900/80 text-white shadow-[0_0_15px_rgba(159,141,252,0.5)] overflow-hidden p-0">
            <motion.div
              className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.5 }}
            />

            <motion.button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-20"
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-4 w-4 text-[#9F8DFC]" />
              <span className="sr-only">Close</span>
            </motion.button>

            <motion.div
              className="relative z-10"
              variants={AnimationVariants.dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DialogHeader className="border-b border-[#9F8DFC]/50 bg-gradient-to-r from-[#9F8DFC] to-gray-900 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#9F8DFC]"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                    >
                      <Star className="h-4 w-4 text-[#9F8DFC]" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <DialogTitle className="text-xl font-bold">
                        QUEST CONFIRMATION
                      </DialogTitle>
                    </motion.div>
                  </div>
                  <motion.div
                    className="flex items-center gap-1 rounded-full bg-[#9F8DFC] px-3 py-1 text-xs font-bold"
                    initial={{ opacity: 0, scale: 0, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <span>
                      LVL {difficultyMap[topic.difficulty].level}
                    </span>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <DialogDescription className="mt-2 text-lg font-medium">
                    {topic.name}
                  </DialogDescription>
                </motion.div>
              </DialogHeader>

              <div className="p-6">
                <motion.div
                  className="mb-4 rounded-md bg-gray-800/50 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-gray-300">
                    {topic.description}
                  </p>
                </motion.div>

                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.h4
                    className="mb-2 text-sm font-bold text-[#9F8DFC]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    REWARDS
                  </motion.h4>
                  <ul className="space-y-2">
                    {topic.rewards.map((reward, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                        custom={index}
                        variants={AnimationVariants.rewardItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div
                          className="h-1.5 w-1.5 rounded-full bg-[#9F8DFC]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        />
                        <span className="text-gray-300">{reward}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
                  <motion.div
                    variants={AnimationVariants.buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="mb-2 border-gray-700 bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white sm:mb-0"
                    >
                      Decline
                    </Button>
                  </motion.div>
                  <motion.div
                    variants={AnimationVariants.buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      onClick={() => onConfirm(topic.name, topic.difficulty)}
                      disabled={isPending}
                      className="relative overflow-hidden bg-gradient-to-r from-[#9F8DFC] to-[#9F8DFC] text-white hover:from-[#9F8DFC] hover:to-[#9F8DFC]"
                    >
                      <motion.span
                        className="relative z-10 flex items-center font-bold"
                        whileHover={{ x: 5 }}
                      >
                        Confirm
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            duration: 0.6,
                          }}
                        >
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </motion.div>
                      </motion.span>
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="h-full w-full bg-[#9F8DFC]/20" />
                      </span>
                    </Button>
                  </motion.div>
                </DialogFooter>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
} 