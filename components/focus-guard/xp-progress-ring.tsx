"use client"

import { useEffect, useState } from "react"

interface XPProgressRingProps {
  currentXP: number
  maxXP: number
  level: number
  levelTitle: string
}

export function XPProgressRing({ currentXP, maxXP, level, levelTitle }: XPProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const progress = (currentXP / maxXP) * 100
  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 300)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-75" />
      
      {/* SVG Progress Ring */}
      <svg className="w-64 h-64 -rotate-90 drop-shadow-2xl" viewBox="0 0 260 260">
        {/* Background circle */}
        <circle
          cx="130"
          cy="130"
          r="120"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-secondary"
        />
        
        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <circle
          cx="130"
          cy="130"
          r="120"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          filter="url(#glow)"
          className="transition-all duration-1000 ease-out"
        />
        
        {/* Inner decorative circle */}
        <circle
          cx="130"
          cy="130"
          r="105"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {/* Level badge */}
        <div className="bg-gradient-to-br from-primary/30 to-primary/10 rounded-full px-4 py-1.5 mb-2 border border-primary/30">
          <span className="text-xs font-semibold text-primary-foreground tracking-wider uppercase">
            Level {level}
          </span>
        </div>
        
        {/* Level title */}
        <h2 className="text-xl font-bold text-foreground mb-1 tracking-tight">
          {levelTitle}
        </h2>
        
        {/* XP Counter */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-primary tabular-nums">
            {currentXP.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">
            / {maxXP.toLocaleString()} XP
          </span>
        </div>
        
        {/* XP to next level */}
        <p className="text-xs text-muted-foreground mt-2">
          {(maxXP - currentXP).toLocaleString()} XP to Level {level + 1}
        </p>
      </div>
    </div>
  )
}
