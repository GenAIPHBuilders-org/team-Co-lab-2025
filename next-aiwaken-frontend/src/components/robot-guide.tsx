"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LottieAnimation } from "./ui/lottie";
import robot from "./lottie-json/robot.json";

interface RobotGuideProps {
  message: string;
}

export function RobotGuide({ message }: RobotGuideProps) {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedMessage("");

    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedMessage((prev) => prev + message.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [message]);

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <LottieAnimation animationData={robot} height="auto" width={300} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-lg rounded-lg p-4 text-center "
      >
        <div className="absolute -top-5 left-1/2 h-4 w-4 -translate-x-1/2  glow-border rotate-45 border border-[#9F8DFC] " />

        <div className="w-full rounded-lg  border border-[#9F8DFC] p-4 shadow-md glow-border">
          <p className="text-sm md:text-base text-slate-300">
            {displayedMessage}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
              ></motion.span>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
