"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

interface OnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    emoji: "🎯",
    title: "Focus Like Never Before",
    description:
      "FocusGuard turns your phone into a productivity powerhouse — using the same science as Instagram, but for your goals.",
    highlights: ["📈 Track every minute of deep work", "🔥 Build streaks that keep you coming back", "🌳 Watch your forest grow with every session"],
  },
  {
    emoji: "🤖",
    title: "Your AI Coach, Always On",
    description:
      "Gemini AI learns your patterns and gives you personalised nudges — so you focus when you're sharpest.",
    highlights: ["☀️ Morning check-in & goal setting", "💬 Post-session personalised feedback", "📊 Weekly insights on your best focus times"],
  },
  {
    emoji: "🚀",
    title: "What's Your Main Goal?",
    description: "Choose your focus so FocusGuard can personalise your experience from day one.",
    isGoalSlide: true,
  },
]

const goals = [
  { id: "exam", emoji: "📚", label: "Crack Exams", sub: "UPSC · JEE · NEET · CAT" },
  { id: "career", emoji: "💼", label: "Career Growth", sub: "Skills & certifications" },
  { id: "work", emoji: "🧑‍💻", label: "Deep Work", sub: "Projects & flow state" },
  { id: "habits", emoji: "🌱", label: "Build Habits", sub: "Daily discipline" },
]

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [current, setCurrent] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

  const slide = slides[current]
  const isLast = current === slides.length - 1
  const canProceed = !isLast || selectedGoal !== null

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] h-screen bg-background flex flex-col overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Skip */}
        <div className="relative z-10 flex justify-end px-5 pt-12 shrink-0">
          <button onClick={onComplete} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-7 pb-4">
          {/* Emoji */}
          <div className="text-6xl mb-6">{slide.emoji}</div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground text-center mb-3 leading-tight">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground text-center leading-relaxed mb-8">
            {slide.description}
          </p>

          {/* Highlights or Goal Picker */}
          {slide.isGoalSlide ? (
            <div className="w-full grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedGoal === goal.id
                      ? "bg-primary/15 border-primary"
                      : "bg-card/50 border-border/50 hover:border-border"
                  }`}
                >
                  <div className="text-2xl mb-2">{goal.emoji}</div>
                  <div className="text-sm font-semibold text-foreground">{goal.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{goal.sub}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full space-y-2.5">
              {slide.highlights?.map((h, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-card/50 border border-border/40">
                  <span className="text-base leading-none">{h.slice(0, 2)}</span>
                  <span className="text-sm text-foreground/80">{h.slice(2).trim()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="relative z-10 px-7 pb-10 shrink-0">
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => isLast ? onComplete() : setCurrent((c) => c + 1)}
            disabled={!canProceed}
            className={`w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
              canProceed
                ? "bg-primary hover:bg-primary/90 active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isLast ? "Start Focusing" : "Continue"}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
