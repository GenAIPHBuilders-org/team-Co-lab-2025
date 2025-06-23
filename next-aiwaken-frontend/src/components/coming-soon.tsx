import { HardHat } from "lucide-react";

export function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gradient-to-b from-slate-900 to-gray-950">
      <HardHat className="w-24 h-24 mb-4 text-yellow-400" />
      <h1 className="text-4xl font-bold mb-2">Coming Soon!</h1>
      <p className="text-lg text-slate-400">
        This feature is currently under construction.
      </p>
      <p className="text-lg text-slate-400">
        We're working hard to bring it to you soon.
      </p>
    </div>
  );
} 