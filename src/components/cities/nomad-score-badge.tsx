import { cn } from "@/lib/utils";

interface NomadScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function NomadScoreBadge({ score, size = "md", className }: NomadScoreBadgeProps) {
  const color =
    score >= 80
      ? "bg-green-500/10 text-green-600 border-green-500/20"
      : score >= 70
        ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
        : "bg-red-500/10 text-red-600 border-red-500/20";

  const sizeClass =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : size === "lg"
        ? "text-2xl font-bold px-4 py-2"
        : "text-sm px-2.5 py-1";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-semibold",
        color,
        sizeClass,
        className
      )}
    >
      {size === "lg" && <span className="text-base opacity-70">노마드</span>}
      {score}
      {size !== "lg" && <span className="opacity-60 text-xs font-normal">점</span>}
      {size === "lg" && <span className="text-base opacity-70">점</span>}
    </span>
  );
}

export function NomadScoreCircle({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-green-500"
      : score >= 70
        ? "text-yellow-500"
        : "text-red-500";

  const strokeColor =
    score >= 80 ? "#22c55e" : score >= 70 ? "#eab308" : "#ef4444";

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/20"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={cn("text-4xl font-bold", color)}>{score}</span>
        <span className="text-xs text-muted-foreground font-medium">/ 100</span>
      </div>
    </div>
  );
}
