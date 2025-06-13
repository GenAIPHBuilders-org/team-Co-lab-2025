import { CompanionAvatar } from "./companion-avatar";

export function CompanionGuide({ companion }: { companion: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 w-full">
      <div className="relative">
        <CompanionAvatar name={companion} size="lg" className="shadow-lg border-2 border-[#9F8DFC]" />
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9F8DFC] text-white text-xs px-2 py-0.5 rounded-full shadow">
          Guide
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-white">{companion}</span>
        <span className="text-xs text-gray-400">Your AI Learning Companion</span>
        <span className="text-xs text-[#9F8DFC] mt-1 font-semibold">Level 1</span>
      </div>
    </div>
  )
}