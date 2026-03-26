"use client"

import { useMemo } from "react"
import { TreePine, Clock, Trophy, Lock, ChevronRight, Flame } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface ForestScreenProps {
  onTabChange?: (tab: "home" | "forest" | "social" | "coach" | "profile") => void
}

export function ForestScreen({ onTabChange }: ForestScreenProps) {
  // Stable sparkle positions (no Math.random() in render)
  const sparkles = useMemo(() =>
    [...Array(8)].map((_, i) => ({
      left: `${10 + (i * 11.3) % 80}%`,
      top: `${10 + (i * 7.7) % 60}%`,
      delay: `${(i * 0.3) % 2}s`,
    })), []
  )

  // Tree data with varying sizes and colors
  const trees = [
    { size: "lg", color: "#22C55E", delay: 0 },
    { size: "md", color: "#16A34A", delay: 0.3 },
    { size: "xl", color: "#4ADE80", delay: 0.6 },
    { size: "sm", color: "#15803D", delay: 0.9 },
    { size: "md", color: "#22C55E", delay: 0.2 },
    { size: "lg", color: "#4ADE80", delay: 0.5 },
    { size: "sm", color: "#16A34A", delay: 0.8 },
    { size: "xl", color: "#22C55E", delay: 0.1 },
    { size: "md", color: "#15803D", delay: 0.4 },
    { size: "lg", color: "#4ADE80", delay: 0.7 },
    { size: "sm", color: "#22C55E", delay: 1.0 },
    { size: "growing", color: "#22C55E", delay: 1.2 },
  ]

  const getTreeHeight = (size: string) => {
    switch (size) {
      case "sm": return "h-8"
      case "md": return "h-10"
      case "lg": return "h-14"
      case "xl": return "h-16"
      case "growing": return "h-10"
      default: return "h-10"
    }
  }

  // Weekly calendar data
  const weekDays = [
    { day: "Mon", hasSession: true },
    { day: "Tue", hasSession: true },
    { day: "Wed", hasSession: true },
    { day: "Thu", hasSession: true },
    { day: "Fri", hasSession: false },
    { day: "Sat", hasSession: true },
    { day: "Sun", hasSession: false, isToday: true },
  ]

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] h-screen bg-background relative flex flex-col overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-10 pb-4">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Your Forest</h1>
              <p className="text-sm text-muted-foreground mt-1">7 trees grown this week</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/20">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">13 days</span>
            </div>
          </header>

          {/* Forest Canvas — daytime in light mode, deep forest in dark */}
          <div className="relative h-64 rounded-2xl overflow-hidden mb-6
            bg-gradient-to-b from-sky-200/80 to-emerald-100/60
            dark:from-emerald-950/40 dark:to-slate-950">
            {/* Sparkles (stars in dark / light rays in light) */}
            {sparkles.map((s, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-foreground/10 dark:bg-white/25 rounded-full animate-pulse"
                style={{ left: s.left, top: s.top, animationDelay: s.delay }}
              />
            ))}

            {/* Ground strip */}
            <div className="absolute bottom-0 left-0 right-0 h-16
              bg-gradient-to-t from-emerald-700/40 to-transparent
              dark:from-emerald-900/60 dark:to-transparent" />

            {/* Trees grid — 3 rows of 4 */}
            <div className="absolute bottom-8 left-0 right-0 px-4">
              <div className="grid grid-cols-4 gap-3">
                {trees.map((tree, i) => (
                  <div
                    key={i}
                    className={`flex justify-center ${tree.size === "growing" ? "relative" : ""}`}
                    style={{
                      animation: "float 3s ease-in-out infinite",
                      animationDelay: `${tree.delay}s`,
                    }}
                  >
                    {tree.size === "growing" ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-lg animate-pulse" />
                        <svg className={`${getTreeHeight(tree.size)} opacity-50`} viewBox="0 0 24 32" fill="none">
                          <rect x="10" y="24" width="4" height="8" fill="#8B4513" />
                          <path d="M12 2L4 14H20L12 2Z" fill={tree.color} />
                          <path d="M12 8L6 18H18L12 8Z" fill={tree.color} opacity="0.9" />
                          <path d="M12 12L7 22H17L12 12Z" fill={tree.color} opacity="0.8" />
                        </svg>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-emerald-500 dark:text-emerald-400 whitespace-nowrap">
                          Growing...
                        </span>
                      </div>
                    ) : (
                      <svg className={getTreeHeight(tree.size)} viewBox="0 0 24 32" fill="none">
                        <rect x="10" y="24" width="4" height="8" fill="#8B4513" />
                        <path d="M12 2L4 14H20L12 2Z" fill={tree.color} />
                        <path d="M12 8L6 18H18L12 8Z" fill={tree.color} opacity="0.9" />
                        <path d="M12 12L7 22H17L12 12Z" fill={tree.color} opacity="0.8" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <TreePine className="w-4 h-4 text-emerald-400" />
                <span className="text-lg font-bold text-foreground">28</span>
              </div>
              <p className="text-xs text-muted-foreground">Trees (All time)</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span className="text-lg font-bold text-foreground">14.5 hrs</span>
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-lg font-bold text-foreground">Top 12%</span>
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">This Week&apos;s Progress</h3>
            <div className="flex items-center justify-between">
              {weekDays.map((day, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl ${
                    day.isToday ? "ring-2 ring-indigo-500 bg-indigo-500/10" : ""
                  }`}
                >
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                  <TreePine
                    className={`w-5 h-5 ${
                      day.hasSession ? "text-emerald-400" : "text-muted-foreground/30"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Achievements</h3>
              <button className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Unlocked Achievement */}
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-amber-500/30 p-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/5 animate-pulse" />
                <div className="relative">
                  <div className="text-2xl mb-1">🏅</div>
                  <h4 className="text-sm font-semibold text-foreground">Iron Focus</h4>
                  <p className="text-xs text-muted-foreground mt-1">10 sessions this week</p>
                </div>
              </div>

              {/* Locked Achievement */}
              <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 p-3 opacity-60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl">🌲</span>
                  <Lock className="w-4 h-4 text-muted-foreground/50" />
                </div>
                <h4 className="text-sm font-semibold text-muted-foreground">Forest Guardian</h4>
                <p className="text-xs text-muted-foreground/70 mt-1">Grow 50 trees</p>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab="forest" onTabChange={onTabChange} />
      </div>
    </div>
  )
}
