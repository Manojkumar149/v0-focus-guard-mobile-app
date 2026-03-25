"use client"

import { useState } from "react"
import { ArrowLeft, Trophy, Users, Clock, Star, CheckCircle, Lock, Zap, Flame } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface ChallengesScreenProps {
  onTabChange?: (tab: "home" | "forest" | "social" | "coach" | "profile") => void
  onBack?: () => void
}

interface Challenge {
  id: string
  title: string
  description: string
  emoji: string
  target: number
  current: number
  unit: string
  participants: number
  reward: string
  rewardXP: number
  daysLeft: number
  difficulty: "Easy" | "Medium" | "Hard"
  joined: boolean
  completed: boolean
}

const initialChallenges: Challenge[] = [
  {
    id: "1",
    title: "Focus 10 Hours",
    description: "Complete 10 total hours of focused work this week",
    emoji: "⏱️",
    target: 10,
    current: 6.5,
    unit: "hrs",
    participants: 4821,
    reward: "Time Lord",
    rewardXP: 500,
    daysLeft: 3,
    difficulty: "Medium",
    joined: true,
    completed: false,
  },
  {
    id: "2",
    title: "5-in-1 Day Blitz",
    description: "Complete 5 focus sessions in a single day",
    emoji: "🔥",
    target: 5,
    current: 3,
    unit: "sessions",
    participants: 2103,
    reward: "Blitz Master",
    rewardXP: 300,
    daysLeft: 5,
    difficulty: "Hard",
    joined: true,
    completed: false,
  },
  {
    id: "3",
    title: "7-Day Warrior",
    description: "Maintain your focus streak for 7 consecutive days",
    emoji: "🛡️",
    target: 7,
    current: 7,
    unit: "days",
    participants: 7644,
    reward: "Iron Warrior",
    rewardXP: 400,
    daysLeft: 0,
    difficulty: "Medium",
    joined: true,
    completed: true,
  },
  {
    id: "4",
    title: "Deep Work Sprint",
    description: "Complete three 50-minute deep work sessions",
    emoji: "🚀",
    target: 3,
    current: 0,
    unit: "sessions",
    participants: 1289,
    reward: "Deep Diver",
    rewardXP: 350,
    daysLeft: 6,
    difficulty: "Hard",
    joined: false,
    completed: false,
  },
  {
    id: "5",
    title: "Morning Kickstart",
    description: "Start a focus session before 9 AM on 3 days",
    emoji: "🌅",
    target: 3,
    current: 0,
    unit: "mornings",
    participants: 3341,
    reward: "Early Bird",
    rewardXP: 250,
    daysLeft: 4,
    difficulty: "Easy",
    joined: false,
    completed: false,
  },
]

const earnedBadges = [
  { name: "Iron Focus", emoji: "🏅", desc: "10 sessions in a week" },
  { name: "Streak Starter", emoji: "🔥", desc: "7-day streak" },
  { name: "First Blood", emoji: "⚔️", desc: "First session ever" },
  { name: "Night Owl", emoji: "🦉", desc: "Session after 10 PM" },
]

const difficultyColor = {
  Easy: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  Medium: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  Hard: "text-red-400 bg-red-500/15 border-red-500/30",
}

export function ChallengesScreen({ onTabChange, onBack }: ChallengesScreenProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)
  const [activeTab, setActiveTab] = useState<"active" | "available" | "badges">("active")

  const handleJoin = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: true } : c))
    )
  }

  const active = challenges.filter((c) => c.joined && !c.completed)
  const available = challenges.filter((c) => !c.joined)
  const completed = challenges.filter((c) => c.completed)

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] min-h-screen bg-background relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-56 h-56 bg-purple-600/8 rounded-full blur-3xl" />

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
              <h1 className="text-xl font-bold text-foreground">Challenges</h1>
              <p className="text-xs text-muted-foreground">Compete, win, earn badges</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-3 py-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400">1,450 XP earned</span>
            </div>
          </header>

          {/* Tabs */}
          <div className="flex bg-card/40 border border-border/40 rounded-xl p-1 mb-5">
            {(["active", "available", "badges"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? "bg-primary text-white shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "active" ? `Active (${active.length})` : tab === "available" ? "Available" : "Badges"}
              </button>
            ))}
          </div>

          {/* Active challenges */}
          {activeTab === "active" && (
            <div className="space-y-4">
              {/* Completed this week */}
              {completed.length > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">Completed</span>
                  </div>
                  {completed.map((c) => (
                    <div key={c.id} className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{c.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{c.title}</span>
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-2.5 py-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs font-medium text-yellow-400">{c.reward} badge</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">+{c.rewardXP} XP</span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* In-progress */}
              {active.length > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-indigo-400">In Progress</span>
                  </div>
                  {active.map((c) => {
                    const pct = Math.min((c.current / c.target) * 100, 100)
                    return (
                      <div key={c.id} className="bg-card/60 border border-border/50 rounded-2xl p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-2xl">{c.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-semibold text-foreground">{c.title}</span>
                              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${difficultyColor[c.difficulty]}`}>
                                {c.difficulty}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{c.description}</p>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">
                              {c.current}/{c.target} {c.unit}
                            </span>
                            <span className="text-primary font-medium">{Math.round(pct)}%</span>
                          </div>
                          <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{c.participants.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{c.daysLeft}d left</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-2.5 py-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs font-medium text-yellow-400">+{c.rewardXP} XP</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          )}

          {/* Available challenges */}
          {activeTab === "available" && (
            <div className="space-y-3">
              {available.map((c) => (
                <div key={c.id} className="bg-card/60 border border-border/50 rounded-2xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{c.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-foreground">{c.title}</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${difficultyColor[c.difficulty]}`}>
                          {c.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{c.participants.toLocaleString()} joined</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{c.daysLeft}d left</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoin(c.id)}
                      className="bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
                    >
                      Join +{c.rewardXP}XP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Badges */}
          {activeTab === "badges" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400">Earned Badges ({earnedBadges.length})</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {earnedBadges.map((b) => (
                    <div key={b.name} className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-center">
                      <div className="text-3xl mb-2">{b.emoji}</div>
                      <div className="text-sm font-semibold text-foreground">{b.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground">Locked Badges</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Iron Warrior", emoji: "🛡️", desc: "7-day streak challenge" },
                    { name: "Legend", emoji: "👑", desc: "Reach Level 10" },
                    { name: "Century", emoji: "💯", desc: "100-day streak" },
                    { name: "Time Lord", emoji: "⏱️", desc: "Focus 10h in a week" },
                  ].map((b) => (
                    <div key={b.name} className="bg-card/40 border border-border/30 rounded-2xl p-4 text-center opacity-50">
                      <div className="text-3xl mb-2 grayscale">{b.emoji}</div>
                      <div className="text-sm font-semibold text-muted-foreground">{b.name}</div>
                      <div className="text-xs text-muted-foreground/60 mt-0.5">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        <BottomNav activeTab="social" onTabChange={onTabChange} />
      </div>
    </div>
  )
}
