"use client"

import { useState } from "react"
import { ChevronRight, Flame, TreePine, Users, Brain, Target, Zap } from "lucide-react"

interface OnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    id: 0,
    icon: <Zap className="w-16 h-16 text-indigo-400" />,
    badge: "Focus like a Pro",
    title: "Replace Scrolling\nwith Deep Work",
    description:
      "FocusGuard turns your phone from a distraction machine into a productivity powerhouse — using the same dopamine loops as Instagram.",
    accent: "from-indigo-600 to-purple-600",
    glow: "bg-indigo-500/20",
    highlights: [
      { icon: <Flame className="w-4 h-4 text-orange-400" />, text: "Streak system keeps you coming back" },
      { icon: <TreePine className="w-4 h-4 text-green-400" />, text: "Watch your forest grow every session" },
      { icon: <Users className="w-4 h-4 text-blue-400" />, text: "Beat friends on the leaderboard" },
    ],
  },
  {
    id: 1,
    icon: <Brain className="w-16 h-16 text-purple-400" />,
    badge: "AI-Powered",
    title: "Your Personal\nAI Focus Coach",
    description:
      "Gemini AI analyzes your patterns and gives personalized advice — so you focus when you're sharpest and rest when you need it.",
    accent: "from-purple-600 to-pink-600",
    glow: "bg-purple-500/20",
    highlights: [
      { icon: <Brain className="w-4 h-4 text-purple-400" />, text: "Morning check-in & goal setting" },
      { icon: <Zap className="w-4 h-4 text-yellow-400" />, text: "Post-session personalized feedback" },
      { icon: <Target className="w-4 h-4 text-red-400" />, text: "Weekly productivity insights report" },
    ],
  },
  {
    id: 2,
    icon: <Target className="w-16 h-16 text-emerald-400" />,
    badge: "Let's Begin",
    title: "What's Your\nMain Goal?",
    description: "Choose your focus to personalize your FocusGuard experience.",
    accent: "from-emerald-600 to-teal-600",
    glow: "bg-emerald-500/20",
    isGoalSlide: true,
  },
]

const goals = [
  { id: "exam", emoji: "📚", label: "Crack Exams", sub: "UPSC, JEE, NEET, CAT" },
  { id: "career", emoji: "💼", label: "Career Growth", sub: "Skills & certifications" },
  { id: "work", emoji: "🧑‍💻", label: "Deep Work", sub: "Project focus & flow" },
  { id: "habits", emoji: "🌱", label: "Build Habits", sub: "Daily discipline" },
]

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

  const slide = slides[currentSlide]
  const isLast = currentSlide === slides.length - 1

  const handleNext = () => {
    if (isLast) {
      onComplete()
    } else {
      setCurrentSlide((s) => s + 1)
    }
  }

  const canProceed = !isLast || selectedGoal !== null

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] min-h-screen bg-background relative overflow-hidden flex flex-col">
        {/* Background glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 ${slide.glow} rounded-full blur-3xl transition-all duration-700`} />

        {/* Skip button */}
        <div className="relative z-10 flex justify-end px-5 pt-12">
          <button
            onClick={onComplete}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-card/60"
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col px-6 pt-4">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${slide.accent} bg-opacity-20 flex items-center justify-center shadow-2xl`}>
              <div className={`w-24 h-24 rounded-2xl bg-background/40 backdrop-blur-sm flex items-center justify-center`}>
                {slide.icon}
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${slide.accent} text-white`}>
              {slide.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground text-center mb-3 leading-tight whitespace-pre-line">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-center text-sm leading-relaxed mb-8">
            {slide.description}
          </p>

          {/* Highlights or Goal Picker */}
          {slide.isGoalSlide ? (
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                    selectedGoal === goal.id
                      ? "bg-primary/20 border-primary shadow-lg shadow-primary/20"
                      : "bg-card/60 border-border/50 hover:border-border"
                  }`}
                >
                  <div className="text-2xl mb-2">{goal.emoji}</div>
                  <div className="text-sm font-semibold text-foreground">{goal.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{goal.sub}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {slide.highlights?.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-card/60 border border-border/50"
                >
                  <div className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center flex-shrink-0">
                    {h.icon}
                  </div>
                  <span className="text-sm text-foreground/90">{h.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom area */}
        <div className="relative z-10 px-6 pb-12 pt-6">
          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 ${
              canProceed
                ? `bg-gradient-to-r ${slide.accent} shadow-lg hover:opacity-90 active:scale-95`
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isLast ? "Start Focusing 🚀" : "Continue"}
            {!isLast && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
