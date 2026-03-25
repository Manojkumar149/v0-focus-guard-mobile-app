"use client"

import { useState } from "react"
import { XPProgressRing } from "@/components/focus-guard/xp-progress-ring"
import { StatsRow } from "@/components/focus-guard/stats-row"
import { FocusButton } from "@/components/focus-guard/focus-button"
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
import { Flame, Bell, Settings, BarChart2 } from "lucide-react"

type Screen =
  | "onboarding"
  | "home"
  | "timer"
  | "complete"
  | "forest"
  | "coach"
  | "social"
  | "profile"
  | "progress"
  | "challenges"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding")

  const handleTabChange = (tab: "home" | "forest" | "social" | "coach" | "profile") => {
    setCurrentScreen(tab)
  }

  // Onboarding (shown first)
  if (currentScreen === "onboarding") {
    return <OnboardingScreen onComplete={() => setCurrentScreen("home")} />
  }

  // Timer Screen (full screen overlay - no bottom nav)
  if (currentScreen === "timer") {
    return (
      <FocusTimerScreen
        initialMinutes={25}
        onClose={() => setCurrentScreen("home")}
        onComplete={() => setCurrentScreen("complete")}
      />
    )
  }

  // Session Complete Screen (full screen overlay - no bottom nav)
  if (currentScreen === "complete") {
    return (
      <SessionCompleteScreen
        xpEarned={150}
        sessionDuration="25:00"
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
        onNextSession={() => setCurrentScreen("timer")}
      />
    )
  }

  // Forest Screen
  if (currentScreen === "forest") {
    return <ForestScreen onTabChange={handleTabChange} />
  }

  // AI Coach Screen
  if (currentScreen === "coach") {
    return <AICoachScreen onTabChange={handleTabChange} onBack={() => setCurrentScreen("home")} />
  }

  // Social Feed Screen
  if (currentScreen === "social") {
    return (
      <SocialFeedScreen
        onTabChange={handleTabChange}
        onViewChallenges={() => setCurrentScreen("challenges")}
      />
    )
  }

  // Profile Screen
  if (currentScreen === "profile") {
    return <ProfileScreen onTabChange={handleTabChange} />
  }

  // Progress / Stats Screen
  if (currentScreen === "progress") {
    return (
      <ProgressStatsScreen
        onTabChange={handleTabChange}
        onBack={() => setCurrentScreen("home")}
      />
    )
  }

  // Challenges Screen
  if (currentScreen === "challenges") {
    return (
      <ChallengesScreen
        onTabChange={handleTabChange}
        onBack={() => setCurrentScreen("social")}
      />
    )
  }

  // Home Dashboard
  return (
    <div className="min-h-screen bg-background flex justify-center">
      {/* Mobile container - fixed 375px width */}
      <div className="w-full max-w-[375px] h-screen bg-background relative flex flex-col overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Main content */}
        <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-12 pb-4">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Good morning, Ravi
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">12 Day Streak</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentScreen("progress")}
                className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <BarChart2 className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* XP Progress Ring */}
          <section className="flex justify-center mb-8">
            <XPProgressRing
              currentXP={650}
              maxXP={1000}
              level={7}
              levelTitle="Flow Master"
            />
          </section>

          {/* Today's Stats */}
          <section className="mb-8">
            <StatsRow
              focusTime="2.5 hrs"
              sessions={3}
              percentile={18}
            />
          </section>

          {/* Focus Session CTA */}
          <section className="mb-8">
            <FocusButton onStartSession={() => setCurrentScreen("timer")} />
          </section>

          {/* Forest Preview */}
          <section>
            <ForestPreview />
          </section>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab="home" onTabChange={handleTabChange} />
      </div>
    </div>
  )
}
