import { Clock, Zap, Trophy } from "lucide-react"

interface StatsRowProps {
  focusTime: string
  sessions: number
  percentile: number
}

export function StatsRow({ focusTime, sessions, percentile }: StatsRowProps) {
  const stats = [
    {
      icon: <Clock className="w-4 h-4" />,
      value: focusTime,
      label: "focused",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
      valueColor: "text-cyan-300",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      value: `${sessions}`,
      label: "sessions",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      valueColor: "text-amber-300",
    },
    {
      icon: <Trophy className="w-4 h-4" />,
      value: `Top ${percentile}%`,
      label: "global",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      valueColor: "text-purple-300",
    },
  ]

  return (
    <div className="flex items-center justify-center gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-card/60 backdrop-blur-sm rounded-2xl px-4 py-3.5 min-w-[100px] border border-border/40 animate-slide-up"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className={`${stat.iconBg} ${stat.iconColor} rounded-full p-1.5 mb-2`}>
            {stat.icon}
          </div>
          <span className={`font-bold text-base ${stat.valueColor}`}>{stat.value}</span>
          <span className="text-xs text-muted-foreground mt-0.5">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
