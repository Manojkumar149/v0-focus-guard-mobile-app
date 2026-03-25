import { Clock, Zap, Trophy } from "lucide-react"

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
}

interface StatsRowProps {
  focusTime: string
  sessions: number
  percentile: number
}

export function StatsRow({ focusTime, sessions, percentile }: StatsRowProps) {
  const stats: Stat[] = [
    {
      icon: <Clock className="w-4 h-4" />,
      value: focusTime,
      label: "focused"
    },
    {
      icon: <Zap className="w-4 h-4" />,
      value: `${sessions}`,
      label: "sessions"
    },
    {
      icon: <Trophy className="w-4 h-4" />,
      value: `Top ${percentile}%`,
      label: "global"
    }
  ]

  return (
    <div className="flex items-center justify-center gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-card/60 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[90px] border border-border/50"
        >
          <div className="flex items-center gap-1.5 text-primary mb-1">
            {stat.icon}
            <span className="font-bold text-foreground">{stat.value}</span>
          </div>
          <span className="text-xs text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
