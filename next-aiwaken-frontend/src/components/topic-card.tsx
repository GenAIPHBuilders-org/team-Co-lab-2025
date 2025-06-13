import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TopicCardProps } from "@/types/topic";
import { difficultyMap } from "@/constants/topics";

export function TopicCard({ topic, isSelected, onClick }: TopicCardProps) {
  const Icon = topic.icon;

  const topicButton = (
    <Button
      variant="outline"
      className={cn(
        "h-auto flex-col gap-2 p-4 justify-start items-center border border-[#9F8DFC] relative",
        isSelected ? "border-slate-400 bg-slate-50" : "border-[#9F8DFC]",
        topic.locked ? "opacity-80" : ""
      )}
      onClick={() => onClick(topic)}
      disabled={topic.locked}
    >
      <div className={cn("rounded-full p-2", topic.color)}>
        <Icon />
      </div>
      <span className="text-xs font-medium text-[#9F8DFC]">
        {topic.name}
      </span>
      {topic.locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-500/70 rounded-sm">
          <Lock className="h-4 w-4 text-slate-100" />
        </div>
      )}
      {!topic.locked && (
        <div
          className={cn(
            "absolute top-1 right-1 px-1.5 py-0.5 rounded-sm text-[10px] font-medium",
            difficultyMap[topic.difficulty].color,
            difficultyMap[topic.difficulty].textColor
          )}
        >
          {difficultyMap[topic.difficulty].label}
        </div>
      )}
    </Button>
  );

  return topic.locked ? (
    <div className="group relative">
      {topicButton}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/80 text-white text-xs p-2 rounded">
          Complete previous topics to unlock
        </div>
      </div>
    </div>
  ) : (
    topicButton
  );
} 