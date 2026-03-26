"use client"

import { useState } from "react"
import { Flame, Trophy, Shield, Bell, Moon, ChevronRight, ChevronDown, Star, Zap, LogOut, Lock, Check, Palette } from "lucide-react"
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

const themes = [
  { id: "indigo", label: "Indigo Night", color: "#4F46E5" },
  { id: "emerald", label: "Forest Green", color: "#10B981" },
  { id: "rose", label: "Rose Flame", color: "#F43F5E" },
  { id: "amber", label: "Golden Hour", color: "#F59E0B" },
]

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0"
      style={{ backgroundColor: value ? "var(--color-primary, #4F46E5)" : "oklch(0.2 0.03 280)" }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
        style={{ transform: value ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  )
}

export function ProfileScreen({ onTabChange }: ProfileScreenProps) {
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [isPro, setIsPro] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("indigo")
  const [showThemes, setShowThemes] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [notifSaved, setNotifSaved] = useState(false)

  const level = 7
  const levelTitle = levelTitles[Math.min(Math.floor(level / 2), levelTitles.length - 1)]
  const currentXP = 650
  const maxXP = 1000
  const xpPct = (currentXP / maxXP) * 100
  const streak = 12

  const handleNotifToggle = (v: boolean) => {
    setNotificationsOn(v)
    setNotifSaved(true)
    setTimeout(() => setNotifSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] h-screen bg-background relative flex flex-col overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-12 pb-4">
          {/* Profile header */}
          <div className="flex flex-col items-center mb-6">
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
            <div className="mt-2 flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Level {level} · {levelTitle}</span>
            </div>
            <div className="w-full mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{currentXP} XP</span>
                <span>{maxXP} XP to Level {level + 1}</span>
              </div>
              <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full" style={{ width: `${xpPct}%` }} />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{streak}</div>
              <div className="text-[10px] text-muted-foreground">Day Streak</div>
            </div>
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Zap className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">87</div>
              <div className="text-[10px] text-muted-foreground">Sessions</div>
            </div>
            <div className="bg-card/60 border border-border/50 rounded-2xl p-3 text-center">
              <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">43.5h</div>
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
                  <div key={i} className={`w-6 h-6 rounded-md flex items-center justify-center ${i < 2 ? "bg-blue-500/20 border border-blue-500/40" : "bg-muted/40 border border-border/30"}`}>
                    {i < 2 && <Shield className="w-3 h-3 text-blue-400" />}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">2/3 available · earn 1 every 7 days</p>
          </div>

          {/* Badges */}
          <div className="bg-card/60 border border-border/50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">Badges</h2>
              <span className="text-xs text-muted-foreground">{badges.filter(b => b.earned).length}/{badges.length} earned</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {badges.map((b) => (
                <div key={b.name} className={`flex flex-col items-center gap-1 p-2 rounded-xl ${b.earned ? "bg-yellow-500/10 border border-yellow-500/25" : "bg-muted/20 border border-border/20 opacity-40"}`}>
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
              <p className="text-xs text-muted-foreground mb-3">AI Coach full access · unlimited friends · all themes · detailed analytics</p>
              <button onClick={() => setIsPro(true)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all">
                Start 7-day Free Trial
              </button>
            </div>
          )}

          {/* Preferences */}
          <div className="bg-card/60 border border-border/50 rounded-2xl overflow-hidden mb-4">
            <div className="px-4 py-2.5 border-b border-border/30">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preferences</span>
            </div>

            {/* Notifications */}
            <div className="px-4 py-3.5 border-b border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-foreground">Notifications</div>
                    <div className="text-xs text-muted-foreground">
                      {notifSaved ? (
                        <span className="text-emerald-400">✓ Saved!</span>
                      ) : notificationsOn ? "8 PM daily streak reminder ON" : "Reminders turned off"}
                    </div>
                  </div>
                </div>
                <Toggle value={notificationsOn} onChange={handleNotifToggle} />
              </div>
            </div>

            {/* Dark mode */}
            <div className="px-4 py-3.5 border-b border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-foreground">Dark Mode</div>
                    <div className="text-xs text-muted-foreground">{darkMode ? "Dark theme active" : "Light mode (coming soon)"}</div>
                  </div>
                </div>
                <Toggle value={darkMode} onChange={setDarkMode} />
              </div>
            </div>

            {/* App theme */}
            <div className="border-b border-border/20">
              <button
                onClick={() => isPro ? setShowThemes(v => !v) : undefined}
                className="w-full flex items-center justify-between px-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <div className="text-left">
                    <div className="text-sm text-foreground">App Theme</div>
                    <div className="text-xs text-muted-foreground">
                      {isPro ? themes.find(t => t.id === selectedTheme)?.label : "Upgrade to Pro to unlock"}
                    </div>
                  </div>
                </div>
                {isPro ? (
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showThemes ? "rotate-180" : ""}`} />
                ) : (
                  <div className="flex items-center gap-1 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-2 py-0.5">
                    <Lock className="w-3 h-3 text-yellow-400" />
                    <span className="text-[10px] text-yellow-400 font-medium">Pro</span>
                  </div>
                )}
              </button>
              {showThemes && isPro && (
                <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTheme(t.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${selectedTheme === t.id ? "border-primary bg-primary/10" : "border-border/40 bg-background/40"}`}
                    >
                      <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                      <span className="text-xs text-foreground">{t.label}</span>
                      {selectedTheme === t.id && <Check className="w-3 h-3 text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy */}
            <div>
              <button
                onClick={() => setShowPrivacy(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <div className="text-left">
                    <div className="text-sm text-foreground">Privacy</div>
                    <div className="text-xs text-muted-foreground">Manage data & visibility</div>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showPrivacy ? "rotate-180" : ""}`} />
              </button>
              {showPrivacy && (
                <div className="px-4 pb-4 space-y-3">
                  {["Show activity in Social Feed", "Allow friends to nudge me", "Appear in leaderboards"].map((label) => (
                    <PrivacyToggle key={label} label={label} />
                  ))}
                </div>
              )}
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

function PrivacyToggle({ label }: { label: string }) {
  const [on, setOn] = useState(true)
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground/80">{label}</span>
      <Toggle value={on} onChange={setOn} />
    </div>
  )
}
