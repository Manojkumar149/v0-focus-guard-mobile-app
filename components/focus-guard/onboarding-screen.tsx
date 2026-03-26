"use client"

import { useState } from "react"
import { ChevronRight, Check } from "lucide-react"

interface OnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    emoji: "🎯",
    gradient: "from-indigo-500 to-purple-600",
    glowColor: "rgba(99,102,241,0.5)",
    title: "Focus Like Never Before",
    description:
      "FocusGuard turns your phone into a productivity powerhouse — using the same science as Instagram, but for your goals.",
    highlights: [
      { emoji: "📈", text: "Track every minute of deep work", border: "border-blue-500/30", bg: "bg-blue-500/10" },
      { emoji: "🔥", text: "Build streaks that keep you coming back", border: "border-orange-500/30", bg: "bg-orange-500/10" },
      { emoji: "🌳", text: "Watch your forest grow with every session", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
    ],
  },
  {
    emoji: "🤖",
    gradient: "from-violet-500 to-fuchsia-600",
    glowColor: "rgba(139,92,246,0.5)",
    title: "Your AI Coach, Always On",
    description:
      "Gemini AI learns your patterns and gives you personalised nudges — so you focus when you're sharpest.",
    highlights: [
      { emoji: "☀️", text: "Morning check-in & goal setting", border: "border-yellow-500/30", bg: "bg-yellow-500/10" },
      { emoji: "💬", text: "Post-session personalised feedback", border: "border-violet-500/30", bg: "bg-violet-500/10" },
      { emoji: "📊", text: "Weekly insights on your best focus times", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
    ],
  },
  {
    emoji: "🚀",
    gradient: "from-pink-500 to-rose-600",
    glowColor: "rgba(236,72,153,0.5)",
    title: "What's Your Main Goal?",
    description: "Choose your focus so FocusGuard can personalise your experience from day one.",
    isGoalSlide: true,
  },
]

const goals = [
  {
    id: "exam",
    emoji: "📚",
    label: "Crack Exams",
    sub: "UPSC · JEE · NEET · CAT",
    gradient: "from-blue-600 to-indigo-600",
    borderColor: "rgba(99,102,241,0.7)",
    shadowColor: "rgba(99,102,241,0.3)",
  },
  {
    id: "career",
    emoji: "💼",
    label: "Career Growth",
    sub: "Skills & certifications",
    gradient: "from-amber-500 to-orange-600",
    borderColor: "rgba(245,158,11,0.7)",
    shadowColor: "rgba(245,158,11,0.3)",
  },
  {
    id: "work",
    emoji: "🧑‍💻",
    label: "Deep Work",
    sub: "Projects & flow state",
    gradient: "from-emerald-500 to-teal-600",
    borderColor: "rgba(16,185,129,0.7)",
    shadowColor: "rgba(16,185,129,0.3)",
  },
  {
    id: "habits",
    emoji: "🌱",
    label: "Build Habits",
    sub: "Daily discipline",
    gradient: "from-pink-500 to-rose-600",
    borderColor: "rgba(236,72,153,0.7)",
    shadowColor: "rgba(236,72,153,0.3)",
  },
]

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [current, setCurrent] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

  const slide = slides[current]
  const isLast = current === slides.length - 1
  const canProceed = !isLast || selectedGoal !== null

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] h-screen bg-background flex flex-col overflow-hidden relative">

        {/* Ambient background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -left-16 w-72 h-72 bg-indigo-600/15 rounded-full blur-[80px] animate-drift"
          />
          <div
            className="absolute -bottom-20 -right-12 w-64 h-64 bg-purple-600/15 rounded-full blur-[70px] animate-drift"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 right-0 w-48 h-48 bg-pink-500/8 rounded-full blur-[60px] animate-drift"
            style={{ animationDelay: "8s" }}
          />
          {/* Star sparkles */}
          <div className="absolute top-[14%] left-[10%] w-1 h-1 bg-white/50 rounded-full animate-twinkle" />
          <div className="absolute top-[20%] right-[12%] w-1 h-1 bg-white/40 rounded-full animate-twinkle" style={{ animationDelay: "0.8s" }} />
          <div className="absolute top-[60%] left-[7%]  w-1.5 h-1.5 bg-white/30 rounded-full animate-twinkle" style={{ animationDelay: "1.4s" }} />
          <div className="absolute top-[75%] right-[9%] w-1 h-1 bg-white/40 rounded-full animate-twinkle" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-[45%] left-[85%] w-1 h-1 bg-white/25 rounded-full animate-twinkle" style={{ animationDelay: "1.9s" }} />
        </div>

        {/* Skip */}
        <div className="relative z-10 flex justify-end px-5 pt-12 shrink-0">
          <button
            onClick={onComplete}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            Skip
          </button>
        </div>

        {/* Animated content — key changes to trigger re-animation on slide change */}
        <div
          key={current}
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-7 pb-4 animate-slide-up"
        >
          {/* Emoji orb */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Spinning decorative rings */}
            <div className="absolute w-40 h-40 rounded-full border border-white/6 animate-spin-slow" />
            <div className="absolute w-32 h-32 rounded-full border border-white/10 animate-spin-reverse" />
            {/* Glow backdrop */}
            <div
              className="absolute w-24 h-24 rounded-full blur-2xl opacity-70 animate-pulse"
              style={{ background: slide.glowColor }}
            />
            {/* Main orb */}
            <div
              className={`relative w-24 h-24 bg-gradient-to-br ${slide.gradient} rounded-full flex items-center justify-center shadow-2xl border border-white/20`}
            >
              <span className="text-5xl leading-none animate-bounce-in">{slide.emoji}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-3 leading-tight text-gradient-indigo">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground text-center leading-relaxed mb-8">
            {slide.description}
          </p>

          {/* Highlights or Goal Picker */}
          {slide.isGoalSlide ? (
            <div className="w-full grid grid-cols-2 gap-3">
              {goals.map((goal, i) => {
                const isSelected = selectedGoal === goal.id
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className="relative p-4 rounded-2xl text-left transition-all duration-200 active:scale-95 border bg-card/50 animate-scale-in"
                    style={{
                      animationDelay: `${i * 0.07}s`,
                      borderColor: isSelected ? goal.borderColor : "rgba(255,255,255,0.08)",
                      boxShadow: isSelected
                        ? `0 0 0 1px ${goal.borderColor}, 0 6px 28px ${goal.shadowColor}`
                        : undefined,
                    }}
                  >
                    {/* Checkmark on selected */}
                    {isSelected && (
                      <div
                        className={`absolute top-2 right-2 w-5 h-5 bg-gradient-to-br ${goal.gradient} rounded-full flex items-center justify-center animate-bounce-in`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${goal.gradient} rounded-xl flex items-center justify-center mb-2.5 shadow-md text-xl`}
                    >
                      {goal.emoji}
                    </div>
                    <div className="text-sm font-semibold text-foreground">{goal.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{goal.sub}</div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="w-full space-y-2.5">
              {slide.highlights?.map((h, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl ${h.bg} backdrop-blur-sm border ${h.border} animate-slide-up`}
                  style={{ animationDelay: `${0.08 + i * 0.1}s` }}
                >
                  <span className="text-xl leading-none shrink-0">{h.emoji}</span>
                  <span className="text-sm text-foreground/90">{h.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="relative z-10 px-7 pb-10 shrink-0">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-gradient-to-r from-indigo-400 to-purple-400"
                    : i < current
                    ? "w-4 bg-primary/50"
                    : "w-1.5 bg-muted-foreground/25"
                }`}
                style={
                  i === current
                    ? { boxShadow: "0 0 8px rgba(129,140,248,0.7)" }
                    : undefined
                }
              />
            ))}
          </div>

          <button
            onClick={() => (isLast ? onComplete() : setCurrent((c) => c + 1))}
            disabled={!canProceed}
            className={`shimmer-overlay w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 ${
              canProceed
                ? "active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            style={
              canProceed
                ? {
                    background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)",
                    boxShadow: "0 4px 24px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.12) inset",
                  }
                : undefined
            }
          >
            {isLast ? "Start Focusing 🚀" : "Continue"}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
