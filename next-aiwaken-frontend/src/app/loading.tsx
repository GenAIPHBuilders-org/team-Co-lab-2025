"use client";
import { useEffect, useState } from "react";

const messages = [
  "Loading, please wait...",
  "Hang tight, we're getting things ready for you...",
  "Almost there, just a moment longer...",
  "Preparing your experience, please hold on...",
  "Just a few seconds, we're almost done...",
  "Getting everything set up, thank you for your patience...",
  "Your content is loading, please be patient...",
  "We're working on it, thank you for waiting...",
  "Loading in progress, please bear with us...",
];

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(() =>
    Math.floor(Math.random() * messages.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-2">
          <span className="absolute inset-0 rounded-full border-4 border-dashed border-primary animate-spin"></span>
          <span className="absolute inset-2 rounded-full bg-primary/10"></span>
        </div>
        <h2 className="text-primary-foreground text-xl font-semibold mt-2 animate-pulse">
          Loading...
        </h2>
        <p className="text-info-color mt-2 transition-opacity duration-500 ease-in-out">
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  );
}