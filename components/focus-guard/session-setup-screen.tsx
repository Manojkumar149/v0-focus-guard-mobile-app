"use client"

import { useState } from "react"
import { ArrowLeft, Play, Clock } from "lucide-react"

interface SessionSetupScreenProps {
  onBack: () => void
  onStart: (sessionName: string, minutes: number) => void
}

const suggestions = ["DSA Practice", "System Design", "Reading", "Math Problems", "English", "Project Work", "Revision"]

const durations = [
  { label: "25 min", value: 25, tag: "Pomodoro" },
  { label: "50 min", value: 50, tag: "Deep Work" },
  { label: "15 min", value: 15, tag: "Quick" },
  { label: "90 min", value: 90, tag: "Flow" },
]

export function SessionSetupScreen({ onBack, onStart }: SessionSetupScreenProps) {
  const [sessionName, setSessionName] = useState("")
  const [duration, setDuration] = useState(25)

  const displayName = sessionName.trim() || "Untitled Session"

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] h-screen bg-background flex flex-col overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <main className="relative z-10 flex-1 overflow-y-auto px-5 pt-12 pb-4">
          {/* Header */}
          <header className="flex items-center gap-3 mb-8">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-card/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">New Session</h1>
              <p className="text-xs text-muted-foreground">What are you working on?</p>
            </div>
          </header>

          {/* Session name input */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
              Session Name
            </label>
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="e.g. DSA Practice"
              maxLength={40}
              className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/60 transition-colors"
              autoFocus
            />
          </div>

          {/* Quick suggestions */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Pick</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSessionName(s)}
                  className={`px-3.5 py-2 rounded-full text-sm transition-all border ${
                    sessionName === s
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-card/50 border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-8">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
              Duration
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {durations.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDuration(d.value)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    duration === d.value
                      ? "bg-primary/15 border-primary"
                      : "bg-card/50 border-border/50 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-base font-bold text-foreground">{d.label}</span>
                  </div>
                  <span className={`text-xs ${duration === d.value ? "text-primary" : "text-muted-foreground"}`}>
                    {d.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Start button */}
        <div className="relative z-10 px-5 pb-8 pt-3 shrink-0 border-t border-border/30 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-muted-foreground">Starting: <span className="text-foreground font-medium">{displayName}</span></span>
            <span className="text-xs text-muted-foreground">{duration} min · ~{Math.round(duration * 1.5)} XP</span>
          </div>
          <button
            onClick={() => onStart(displayName, duration)}
            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30"
          >
            <div className="bg-white/20 rounded-full p-1.5">
              <Play className="w-4 h-4 fill-current" />
            </div>
            Let's Focus
          </button>
        </div>
      </div>
    </div>
  )
}
