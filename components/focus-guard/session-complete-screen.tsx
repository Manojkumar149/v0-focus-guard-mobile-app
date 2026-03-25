"use client"

import { useEffect, useState } from "react"
import { Check, Play, Coffee, Trophy } from "lucide-react"

interface SessionCompleteScreenProps {
  xpEarned?: number
  sessionDuration?: string
  focusScore?: number
  streakDays?: number
  prevXP?: number
  newXP?: number
  maxXP?: number
  level?: number
  achievementUnlocked?: boolean
  achievementName?: string
  achievementDesc?: string
  onBreak?: () => void
  onNextSession?: () => void
}

export function SessionCompleteScreen({
  xpEarned = 150,
  sessionDuration = "25:00",
  focusScore = 98,
  streakDays = 13,
  prevXP = 500,
  newXP = 650,
  maxXP = 1000,
  level = 7,
  achievementUnlocked = true,
  achievementName = "Iron Focus",
  achievementDesc = "10 sessions this week",
  onBreak,
  onNextSession,
}: SessionCompleteScreenProps) {
  // Animation states
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showXP, setShowXP] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showAchievement, setShowAchievement] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [xpBarWidth, setXpBarWidth] = useState((prevXP / maxXP) * 100)

  useEffect(() => {
    // Staggered animation triggers
    const timers = [
      setTimeout(() => setShowCheckmark(true), 0),
      setTimeout(() => setShowTitle(true), 200),
      setTimeout(() => setShowXP(true), 400),
      setTimeout(() => {
        setShowProgress(true)
        // Animate XP bar after showing progress
        setTimeout(() => setXpBarWidth((newXP / maxXP) * 100), 100)
      }, 600),
      setTimeout(() => setShowStats(true), 800),
      setTimeout(() => setShowAchievement(true), 1000),
      setTimeout(() => setShowButtons(true), 1200),
    ]

    return () => timers.forEach(clearTimeout)
  }, [newXP, maxXP])

  const xpToNextLevel = maxXP - newXP

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

      {/* Confetti particles */}
      <Confetti />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Phase 1: Checkmark celebration */}
        <div className="mb-4">
          <div
            className={`relative w-20 h-20 transition-all duration-500 ease-out ${
              showCheckmark ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          >
            {/* Green glow */}
            <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl" />
            {/* Circle with gradient border */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 p-[3px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Check className="w-10 h-10 text-emerald-400 stroke-[3]" />
              </div>
            </div>
          </div>
        </div>

        {/* Session Complete text */}
        <div
          className={`text-center mb-8 transition-all duration-500 ${
            showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-2xl font-bold text-white mb-1">Session Complete!</h1>
          <p className="text-sm text-white/50">You stayed focused for the full session</p>
        </div>

        {/* Phase 2: XP Reward */}
        <div
          className={`relative mb-6 transition-all duration-500 ${
            showXP ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          {/* Sparkles */}
          <Sparkle className="absolute -top-2 -left-4 text-amber-400/80" delay={0} />
          <Sparkle className="absolute -top-4 right-0 text-amber-300/60" delay={100} />
          <Sparkle className="absolute top-1/2 -right-6 text-amber-500/70" delay={200} />
          <Sparkle className="absolute -bottom-2 -left-2 text-amber-400/50" delay={300} />
          <Sparkle className="absolute bottom-0 right-4 text-amber-300/60" delay={150} />
          
          {/* XP number with float animation */}
          <div className="animate-float">
            <span className="text-7xl font-extrabold text-amber-500 tracking-tight">
              +{xpEarned}
            </span>
            <span className="text-3xl font-bold text-amber-500/80 ml-1">XP</span>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div
          className={`w-full max-w-[320px] mb-8 transition-all duration-500 ${
            showProgress ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white/70">Level {level} — Flow Master</span>
            <span className="text-xs text-white/50">{newXP}/{maxXP} XP</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-[1500ms] ease-out"
              style={{ width: `${xpBarWidth}%` }}
            />
          </div>
          <p className="text-xs text-white/40 mt-2 text-center">
            {xpToNextLevel} XP to Level {level + 1}
          </p>
        </div>

        {/* Phase 3: Stats Card */}
        <div
          className={`w-full max-w-[320px] mb-6 transition-all duration-500 ${
            showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              {/* Duration */}
              <div className="flex-1 text-center">
                <p className="text-xl font-bold text-white">{sessionDuration}</p>
                <p className="text-xs text-white/50 mt-1">Duration</p>
              </div>
              
              {/* Divider */}
              <div className="w-px h-10 bg-white/10" />
              
              {/* Focus Score */}
              <div className="flex-1 text-center">
                <p className="text-xl font-bold text-white">{focusScore}%</p>
                <p className="text-xs text-white/50 mt-1">Accuracy</p>
              </div>
              
              {/* Divider */}
              <div className="w-px h-10 bg-white/10" />
              
              {/* Streak */}
              <div className="flex-1 text-center">
                <p className="text-xl font-bold text-white">
                  <span className="text-orange-400">🔥</span> {streakDays} days
                </p>
                <p className="text-xs text-white/50 mt-1">Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 4: Achievement Badge */}
        {achievementUnlocked && (
          <div
            className={`w-full max-w-[320px] mb-8 transition-all duration-500 ${
              showAchievement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative bg-white/5 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-sm overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              
              <div className="relative flex items-center gap-4">
                {/* Medal icon */}
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 text-amber-400" />
                </div>
                
                {/* Achievement text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-0.5">
                    Achievement Unlocked!
                  </p>
                  <p className="text-base font-bold text-white truncate">{achievementName}</p>
                  <p className="text-xs text-white/50 truncate">{achievementDesc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 5: Action Buttons */}
        <div
          className={`w-full max-w-[320px] space-y-3 transition-all duration-500 ${
            showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Start Next Session - Primary CTA */}
          <button
            onClick={onNextSession}
            className="relative w-full py-4 rounded-2xl font-semibold text-white overflow-hidden group"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] group-hover:animate-shimmer" />
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-indigo-500/50 blur-xl -z-10" />
            {/* Content */}
            <span className="relative flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              Start Next Session
            </span>
          </button>

          {/* Take a Break - Ghost button */}
          <button
            onClick={onBreak}
            className="w-full py-4 rounded-2xl font-medium text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Coffee className="w-5 h-5" />
            Take a Break · 5 min
          </button>
        </div>
      </div>
    </div>
  )
}

// Sparkle component for decorating the XP number
function Sparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400 + delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span
      className={`text-lg transition-all duration-300 ${className} ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      ✦
    </span>
  )
}

// Confetti component - CSS-only floating particles
function Confetti() {
  const particles = [
    { color: "bg-indigo-500", left: "10%", delay: 0, duration: 4 },
    { color: "bg-purple-500", left: "20%", delay: 0.5, duration: 5 },
    { color: "bg-amber-400", left: "30%", delay: 1, duration: 4.5 },
    { color: "bg-emerald-400", left: "40%", delay: 0.3, duration: 5.5 },
    { color: "bg-pink-400", left: "50%", delay: 0.8, duration: 4 },
    { color: "bg-indigo-400", left: "60%", delay: 0.2, duration: 5 },
    { color: "bg-amber-500", left: "70%", delay: 0.6, duration: 4.5 },
    { color: "bg-purple-400", left: "80%", delay: 1.2, duration: 5 },
    { color: "bg-emerald-500", left: "90%", delay: 0.4, duration: 4.5 },
    { color: "bg-pink-500", left: "15%", delay: 0.9, duration: 5.5 },
    { color: "bg-indigo-300", left: "45%", delay: 0.7, duration: 4 },
    { color: "bg-amber-300", left: "75%", delay: 1.1, duration: 5 },
    { color: "bg-purple-300", left: "25%", delay: 0.1, duration: 4.5 },
    { color: "bg-emerald-300", left: "55%", delay: 0.5, duration: 5.5 },
    { color: "bg-pink-300", left: "85%", delay: 0.3, duration: 4 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${p.color} opacity-60`}
          style={{
            left: p.left,
            bottom: "-10px",
            animation: `confetti-rise ${p.duration}s ease-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-rise {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
