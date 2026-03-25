"use client"

import { useState } from "react"
import { ArrowLeft, Flame, TrendingUp, Clock, Star, Trophy, Target } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface ProgressStatsScreenProps {
  onTabChange?: (tab: "home" | "forest" | "social" | "coach" | "profile") => void
  onBack?: () => void
}

type Period = "week" | "month" | "all"

const weekData = [
  { day: "Mon", hours: 2.5, sessions: 3 },
  { day: "Tue", hours: 3.8, sessions: 5 },
  { day: "Wed", hours: 1.2, sessions: 2 },
  { day: "Thu", hours: 4.0, sessions: 5 },
  { day: "Fri", hours: 2.8, sessions: 4 },
  { day: "Sat", hours: 1.5, sessions: 2 },
  { day: "Sun", hours: 0.5, sessions: 1 },
]

const monthData = [
  { day: "W1", hours: 12.5, sessions: 16 },
  { day: "W2", hours: 18.3, sessions: 22 },
  { day: "W3", hours: 9.8, sessions: 12 },
  { day: "W4", hours: 16.2, sessions: 20 },
]

const bestHours = [
  { label: "9 AM", score: 88 },
  { label: "10 AM", score: 95 },
  { label: "11 AM", score: 72 },
  { label: "2 PM", score: 60 },
  { label: "7 PM", score: 83 },
  { label: "9 PM", score: 91 },
]

const streakHistory = [
  { week: "Mar 18", days: [true, true, true, true, false, true, true] },
  { week: "Mar 11", days: [true, true, false, true, true, true, true] },
  { week: "Mar 4", days: [true, true, true, true, true, true, false] },
  { week: "Feb 25", days: [false, true, true, true, true, false, true] },
]

export function ProgressStatsScreen({ onTabChange, onBack }: ProgressStatsScreenProps) {
  const [period, setPeriod] = useState<Period>("week")

  const chartData = period === "week" ? weekData : monthData
  const maxHours = Math.max(...chartData.map((d) => d.hours))

  const totalHours = weekData.reduce((s, d) => s + d.hours, 0)
  const totalSessions = weekData.reduce((s, d) => s + d.sessions, 0)
  const bestDay = [...weekData].sort((a, b) => b.hours - a.hours)[0]

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] min-h-screen bg-background relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-0 w-56 h-56 bg-purple-600/8 rounded-full blur-3xl" />

        <main className="relative z-10 px-5 pt-12 pb-28">
          {/* Header */}
          <header className="flex items-center gap-3 mb-6">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-card/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-foreground">Progress</h1>
              <p className="text-xs text-muted-foreground">Your focus analytics</p>
            </div>
          </header>

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Clock className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{totalHours.toFixed(1)}h</div>
              <div className="text-[10px] text-muted-foreground">This Week</div>
            </div>
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Target className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{totalSessions}</div>
              <div className="text-[10px] text-muted-foreground">Sessions</div>
            </div>
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">12</div>
              <div className="text-[10px] text-muted-foreground">Day Streak</div>
            </div>
          </div>

          {/* Period toggle */}
          <div className="flex bg-card/40 border border-border/40 rounded-xl p-1 mb-5">
            {(["week", "month", "all"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 capitalize ${
                  period === p
                    ? "bg-primary text-white shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p === "all" ? "All Time" : p === "week" ? "This Week" : "This Month"}
              </button>
            ))}
          </div>

          {/* Bar chart */}
          <div className="bg-card/60 border border-border/50 rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Focus Hours</h2>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+23% vs last week</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-28">
              {chartData.map((d, i) => {
                const pct = (d.hours / maxHours) * 100
                const isToday = period === "week" && i === new Date().getDay() - 1
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex-1 flex items-end relative">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 relative overflow-hidden ${
                          isToday
                            ? "bg-gradient-to-t from-indigo-600 to-indigo-400"
                            : "bg-gradient-to-t from-primary/60 to-primary/30"
                        }`}
                        style={{ height: `${Math.max(pct, 4)}%` }}
                      >
                        {isToday && (
                          <div className="absolute inset-0 bg-white/10 animate-pulse" />
                        )}
                      </div>
                    </div>
                    <span className={`text-[9px] font-medium ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                      {d.day}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Best day & percentile */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-muted-foreground">Best Day</span>
              </div>
              <div className="text-base font-bold text-foreground">{bestDay.day}</div>
              <div className="text-xs text-muted-foreground">{bestDay.hours}h · {bestDay.sessions} sessions</div>
            </div>
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-medium text-muted-foreground">Percentile</span>
              </div>
              <div className="text-base font-bold text-foreground">Top 18%</div>
              <div className="text-xs text-muted-foreground">vs all users this week</div>
            </div>
          </div>

          {/* Best focus hours */}
          <div className="bg-card/60 border border-border/50 rounded-2xl p-4 mb-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">Peak Focus Hours</h2>
            <div className="space-y-2">
              {bestHours.map((h) => (
                <div key={h.label} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-10">{h.label}</span>
                  <div className="flex-1 bg-muted/40 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        h.score >= 90
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                          : h.score >= 80
                          ? "bg-gradient-to-r from-indigo-500/80 to-purple-500/80"
                          : "bg-gradient-to-r from-indigo-500/50 to-purple-500/50"
                      }`}
                      style={{ width: `${h.score}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium w-8 text-right ${h.score >= 90 ? "text-indigo-400" : "text-muted-foreground"}`}>
                    {h.score}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              💡 You focus best at <span className="text-indigo-400 font-medium">10 AM</span> — schedule deep work then.
            </p>
          </div>

          {/* Streak history */}
          <div className="bg-card/60 border border-border/50 rounded-2xl p-4">
            <h2 className="text-sm font-semibold text-foreground mb-3">Streak History</h2>
            <div className="space-y-2.5">
              {streakHistory.map((week) => (
                <div key={week.week} className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground w-14">{week.week}</span>
                  <div className="flex gap-1">
                    {week.days.map((active, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          active
                            ? "bg-orange-500/20 border border-orange-500/50"
                            : "bg-muted/40 border border-border/30"
                        }`}
                      >
                        {active && <Flame className="w-3 h-3 text-orange-400" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <BottomNav activeTab="home" onTabChange={onTabChange} />
      </div>
    </div>
  )
}
