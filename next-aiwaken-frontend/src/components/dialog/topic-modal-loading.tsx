import { AnimatePresence, motion } from "framer-motion";

import { Loader2 } from "lucide-react";
import AnimationVariants from "@/lib/animations";
import yo from "@/components/lottie-json/yo.json";
import { useRandomMessage } from "@/hooks/use-random-message";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { LottieAnimation } from "../ui/lottie";


const loadingMessages = [
  "Please wait while we generate content customized for you...",
  "Crafting your personalized learning experience...",
  "Preparing your unique study materials...",
  "Generating tailored content just for you...",
  "Creating your custom learning path...",
  "Building your personalized curriculum...",
  "Assembling your unique study session...",
  "Preparing your customized learning journey...",
];

type TopicModalLoadingProps = {
  isOpen: boolean
  onClose: () => void
}

export const TopicModalLoading = ({ isOpen, onClose }: TopicModalLoadingProps) => {
  const randomMessage = useRandomMessage(loadingMessages);
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-xl border-0 bg-gray-900/80 text-white shadow-[0_0_15px_rgba(159,141,252,0.5)] overflow-hidden p-4">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#9F8DFC90] to-gray-900 opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.5 }}
            />

            <motion.div
              className="relative z-10 flex flex-col items-center justify-center py-12"
              variants={AnimationVariants.dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="mb-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <LottieAnimation animationData={yo} height="auto" width={200} />

              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DialogTitle className="text-xl font-bold text-[#9F8DFC] mb-4">
                  GENERATING CONTENT
                </DialogTitle>

                <motion.div
                  key={randomMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {randomMessage}
                  </p>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#9F8DFC] to-[#9F8DFC]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}