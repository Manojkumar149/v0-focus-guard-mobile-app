"use client"

import { useState } from "react"
import { Flame, Trophy, Shield, Bell, Moon, ChevronRight, Star, Zap, LogOut, Lock } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface ProfileScreenProps {
  onTabChange?: (tab: "home" | "forest" | "social" | "coach" | "profile") => void
}

const levelTitles = ["Beginner", "Focus Warrior", "Flow Master", "Deep Worker", "Legend"]

const badges = [
  { name: "Iron Focus", emoji: "🏅", earned: true },
  { name: "Streak Starter", emoji: "🔥", earned: true },
  { name: "First Blood", emoji: "⚔️", earned: true },
  { name: "Night Owl", emoji: "🦉", earned: true },
  { name: "Iron Warrior", emoji: "🛡️", earned: false },
  { name: "Legend", emoji: "👑", earned: false },
  { name: "Century", emoji: "💯", earned: false },
  { name: "Time Lord", emoji: "⏱️", earned: false },
]

export function ProfileScreen({ onTabChange }: ProfileScreenProps) {
  const [streakFreezes, setStreakFreezes] = useState(2)
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [isPro, setIsPro] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  const level = 7
  const levelTitle = levelTitles[Math.min(Math.floor(level / 2), levelTitles.length - 1)]
  const currentXP = 650
  const maxXP = 1000
  const xpPct = (currentXP / maxXP) * 100
  const streak = 12
  const totalSessions = 87
  const totalHours = 43.5

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] h-screen bg-background relative flex flex-col overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-12 pb-4">
          {/* Profile header */}
          <div className="flex flex-col items-center mb-6">
            {/* Avatar */}
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/30">
                RK
              </div>
              {isPro && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            <h1 className="text-xl font-bold text-foreground">Ravi Kumar</h1>
            <p className="text-sm text-muted-foreground">@ravikumar</p>

            {/* Level badge */}
            <div className="mt-2 flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Level {level} · {levelTitle}</span>
            </div>

            {/* XP bar */}
            <div className="w-full mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{currentXP} XP</span>
                <span>{maxXP} XP to Level {level + 1}</span>
              </div>
              <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                  style={{ width: `${xpPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{streak}</div>
              <div className="text-[10px] text-muted-foreground">Day Streak</div>
            </div>
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Zap className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{totalSessions}</div>
              <div className="text-[10px] text-muted-foreground">Sessions</div>
            </div>
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{totalHours}h</div>
              <div className="text-[10px] text-muted-foreground">Total Focus</div>
            </div>
          </div>

          {/* Streak Freeze */}
          <div className="bg-card/60 border border-border/50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Streak Freeze</div>
                  <div className="text-xs text-muted-foreground">Protects your streak for 1 day</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      i < streakFreezes
                        ? "bg-blue-500/20 border border-blue-500/40"
                        : "bg-muted/40 border border-border/30"
                    }`}
                  >
                    {i < streakFreezes && <Shield className="w-3 h-3 text-blue-400" />}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 ml-13">
              You earn 1 freeze every 7 days · {streakFreezes}/3 available
            </p>
          </div>

          {/* Badges */}
          <div className="bg-card/60 border border-border/50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Badges</h2>
              <span className="text-xs text-muted-foreground">{badges.filter((b) => b.earned).length}/{badges.length} earned</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {badges.map((b) => (
                <div
                  key={b.name}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl ${
                    b.earned
                      ? "bg-yellow-500/10 border border-yellow-500/25"
                      : "bg-muted/20 border border-border/20 opacity-40"
                  }`}
                >
                  <span className={`text-xl ${!b.earned ? "grayscale" : ""}`}>{b.emoji}</span>
                  <span className="text-[9px] text-center leading-tight text-muted-foreground">{b.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro upgrade */}
          {!isPro && (
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-foreground">Upgrade to Pro</span>
                <span className="text-xs bg-yellow-500 text-black font-bold px-2 py-0.5 rounded-full">₹199/mo</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                AI Coach full access · unlimited friends · all themes · detailed analytics
              </p>
              <button
                onClick={() => setIsPro(true)}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all"
              >
                Start 7-day Free Trial
              </button>
            </div>
          )}

          {/* Settings */}
          <div className="bg-card/60 border border-border/50 rounded-2xl overflow-hidden mb-4">
            <div className="px-4 py-2.5 border-b border-border/30">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preferences</span>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-foreground">Notifications</div>
                  <div className="text-xs text-muted-foreground">Daily 8 PM streak reminder</div>
                </div>
              </div>
              <button
                onClick={() => setNotificationsOn((v) => !v)}
                className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                  notificationsOn ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                    notificationsOn ? "left-5.5" : "left-0.5"
                  }`}
                  style={{ left: notificationsOn ? "22px" : "2px" }}
                />
              </button>
            </div>

            {/* Dark mode */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <Moon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-foreground">Dark Mode</div>
                  <div className="text-xs text-muted-foreground">Premium gaming aesthetic</div>
                </div>
              </div>
              <button
                onClick={() => setDarkMode((v) => !v)}
                className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                  darkMode ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
                  style={{ left: darkMode ? "22px" : "2px" }}
                />
              </button>
            </div>

            {/* App theme - Pro */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-foreground">App Theme</div>
                  <div className="text-xs text-muted-foreground">Seasonal & custom themes</div>
                </div>
              </div>
              {isPro ? (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              ) : (
                <div className="flex items-center gap-1 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-2 py-0.5">
                  <Lock className="w-3 h-3 text-yellow-400" />
                  <span className="text-[10px] text-yellow-400 font-medium">Pro</span>
                </div>
              )}
            </div>

            {/* Privacy */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-foreground">Privacy</div>
                  <div className="text-xs text-muted-foreground">Manage data & visibility</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Sign out */}
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </main>

        <BottomNav activeTab="profile" onTabChange={onTabChange} />
      </div>
    </div>
  )
}
