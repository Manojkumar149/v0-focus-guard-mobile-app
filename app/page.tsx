"use client"

import { useState } from "react"
import { XPProgressRing } from "@/components/focus-guard/xp-progress-ring"
import { StatsRow } from "@/components/focus-guard/stats-row"
import { ForestPreview } from "@/components/focus-guard/forest-preview"
import { BottomNav } from "@/components/focus-guard/bottom-nav"
import { FocusTimerScreen } from "@/components/focus-guard/focus-timer-screen"
import { SessionCompleteScreen } from "@/components/focus-guard/session-complete-screen"
import { ForestScreen } from "@/components/focus-guard/forest-screen"
import { AICoachScreen } from "@/components/focus-guard/ai-coach-screen"
import { SocialFeedScreen } from "@/components/focus-guard/social-feed-screen"
import { ProfileScreen } from "@/components/focus-guard/profile-screen"
import { ProgressStatsScreen } from "@/components/focus-guard/progress-stats-screen"
import { ChallengesScreen } from "@/components/focus-guard/challenges-screen"
import { OnboardingScreen } from "@/components/focus-guard/onboarding-screen"
import { SessionSetupScreen } from "@/components/focus-guard/session-setup-screen"
import { Flame, Bell, Settings, BarChart2, X, Play } from "lucide-react"

type Screen =
  | "onboarding"
  | "home"
  | "setup"
  | "timer"
  | "complete"
  | "forest"
  | "coach"
  | "social"
  | "profile"
  | "progress"
  | "challenges"

const NOTIFICATIONS = [
  { id: "1", icon: "🔥", title: "Keep your streak!", body: "You haven't focused today. Your 12-day streak ends at midnight.", time: "2h ago", unread: true },
  { id: "2", icon: "🏅", title: "Achievement unlocked", body: "Iron Focus — 10 sessions this week. Well done!", time: "Yesterday", unread: true },
  { id: "3", icon: "👋", title: "Arjun nudged you", body: "Arjun says: Time to focus! 💪", time: "Yesterday", unread: false },
  { id: "4", icon: "📊", title: "Weekly report ready", body: "You focused 16.3 hrs this week — top 18% of users!", time: "Mon", unread: false },
]

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding")
  const [sessionName, setSessionName] = useState("Focus Session")
  const [sessionMinutes, setSessionMinutes] = useState(25)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [darkMode, setDarkMode] = useState(true)

  const unreadCount = notifications.filter(n => n.unread).length

  const handleTabChange = (tab: "home" | "forest" | "social" | "coach" | "profile") => {
    setCurrentScreen(tab)
  }

  const handleStartSession = (name: string, minutes: number) => {
    setSessionName(name)
    setSessionMinutes(minutes)
    setCurrentScreen("timer")
  }

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, unread: false })))

  // Single return — theme wrapper covers ALL screens so dark/light mode works everywhere
  return (
    <div className={darkMode ? "dark" : "light"}>

      {/* Onboarding */}
      {currentScreen === "onboarding" && (
        <OnboardingScreen onComplete={() => setCurrentScreen("home")} />
      )}

      {/* Session Setup */}
      {currentScreen === "setup" && (
        <SessionSetupScreen
          onBack={() => setCurrentScreen("home")}
          onStart={handleStartSession}
        />
      )}

      {/* Timer */}
      {currentScreen === "timer" && (
        <FocusTimerScreen
          initialMinutes={sessionMinutes}
          sessionName={sessionName}
          sessionNumber={1}
          totalSessions={3}
          onClose={() => setCurrentScreen("home")}
          onComplete={() => setCurrentScreen("complete")}
        />
      )}

      {/* Session Complete */}
      {currentScreen === "complete" && (
        <SessionCompleteScreen
          xpEarned={Math.round(sessionMinutes * 1.5 + 75)}
          sessionDuration={`${sessionMinutes}:00`}
          focusScore={98}
          streakDays={13}
          prevXP={500}
          newXP={650}
          maxXP={1000}
          level={7}
          achievementUnlocked={true}
          achievementName="Iron Focus"
          achievementDesc="10 sessions this week"
          onBreak={() => setCurrentScreen("home")}
          onNextSession={() => setCurrentScreen("setup")}
        />
      )}

      {/* Forest */}
      {currentScreen === "forest" && (
        <ForestScreen onTabChange={handleTabChange} />
      )}

      {/* AI Coach */}
      {currentScreen === "coach" && (
        <AICoachScreen onTabChange={handleTabChange} onBack={() => setCurrentScreen("home")} />
      )}

      {/* Social Feed */}
      {currentScreen === "social" && (
        <SocialFeedScreen
          onTabChange={handleTabChange}
          onViewChallenges={() => setCurrentScreen("challenges")}
        />
      )}

      {/* Profile */}
      {currentScreen === "profile" && (
        <ProfileScreen onTabChange={handleTabChange} darkMode={darkMode} onDarkModeChange={setDarkMode} />
      )}

      {/* Progress / Stats */}
      {currentScreen === "progress" && (
        <ProgressStatsScreen
          onTabChange={handleTabChange}
          onBack={() => setCurrentScreen("home")}
        />
      )}

      {/* Challenges */}
      {currentScreen === "challenges" && (
        <ChallengesScreen
          onTabChange={handleTabChange}
          onBack={() => setCurrentScreen("social")}
        />
      )}

      {/* Home Dashboard */}
      {currentScreen === "home" && (
        <div className="min-h-screen bg-background flex justify-center">
          <div className="w-full max-w-[375px] h-screen bg-background relative flex flex-col overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-[80px] pointer-events-none animate-drift" />
            <div className="absolute top-1/3 -right-16 w-72 h-72 bg-purple-600/12 rounded-full blur-[70px] pointer-events-none animate-drift" style={{ animationDelay: "5s" }} />
            <div className="absolute bottom-32 left-1/4 w-56 h-56 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none animate-drift" style={{ animationDelay: "9s" }} />
            {/* Star sparkles */}
            <div className="absolute top-24 right-10 w-1 h-1 bg-foreground/20 rounded-full animate-twinkle pointer-events-none" />
            <div className="absolute top-44 left-6 w-1 h-1 bg-foreground/15 rounded-full animate-twinkle pointer-events-none" style={{ animationDelay: "1.1s" }} />
            <div className="absolute top-80 right-14 w-1.5 h-1.5 bg-foreground/10 rounded-full animate-twinkle pointer-events-none" style={{ animationDelay: "0.6s" }} />

            {/* Main content */}
            <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-12 pb-4">
              {/* Header */}
              <header className="flex items-center justify-between mb-8 animate-slide-down">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    Good morning, <span className="text-gradient-indigo font-bold">Ravi</span> 👋
                  </h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                    <span className="text-sm font-semibold text-orange-400">12 Day Streak</span>
                    <span className="text-xs bg-orange-500/15 text-orange-400 border border-orange-500/25 rounded-full px-2 py-0.5 font-medium">🔥 On fire!</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Progress button */}
                  <button
                    onClick={() => setCurrentScreen("progress")}
                    className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <BarChart2 className="w-5 h-5" />
                  </button>
                  {/* Bell */}
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="relative w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  {/* Settings → Profile */}
                  <button
                    onClick={() => setCurrentScreen("profile")}
                    className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </header>

              {/* XP Progress Ring */}
              <section className="flex justify-center mb-8 animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <XPProgressRing currentXP={650} maxXP={1000} level={7} levelTitle="Flow Master" />
              </section>

              {/* Today's Stats */}
              <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <StatsRow focusTime="2.5 hrs" sessions={3} percentile={18} />
              </section>

              {/* Focus Session CTA */}
              <section className="mb-8">
                <button
                  onClick={() => setCurrentScreen("setup")}
                  className="relative group w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="shimmer-overlay overflow-hidden relative flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl group-hover:scale-[1.02] group-active:scale-[0.98] transition-transform" style={{ boxShadow: "0 4px 32px rgba(99,102,241,0.5), 0 1px 0 rgba(255,255,255,0.15) inset" }}>
                    <div className="bg-white/20 rounded-full p-2">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-lg">Start Focus Session</span>
                  </div>
                </button>
              </section>

              {/* Forest Preview */}
              <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <ForestPreview />
              </section>
            </main>

            {/* Bottom Navigation */}
            <BottomNav activeTab="home" onTabChange={handleTabChange} />

            {/* Notifications overlay */}
            {showNotifications && (
              <div className="absolute inset-0 z-50 flex flex-col justify-start" onClick={() => setShowNotifications(false)}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <div
                  className="relative bg-card border-b border-border/50 rounded-b-3xl px-5 pt-14 pb-5 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-foreground">Notifications</h2>
                    <div className="flex items-center gap-3">
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-primary hover:text-primary/80">
                          Mark all read
                        </button>
                      )}
                      <button onClick={() => setShowNotifications(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${n.unread ? "bg-primary/8 border border-primary/20" : "bg-background/40"}`}
                      >
                        <span className="text-xl shrink-0 mt-0.5">{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground truncate">{n.title}</span>
                            <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                        </div>
                        {n.unread && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
