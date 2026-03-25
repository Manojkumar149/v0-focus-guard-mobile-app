"use client"

import { useEffect, useState, useCallback } from "react"
import { X, Pause, Play, TreeDeciduous } from "lucide-react"

interface FocusTimerScreenProps {
  initialMinutes?: number
  onClose: () => void
  onComplete?: () => void
}

export function FocusTimerScreen({ 
  initialMinutes = 25, 
  onClose, 
  onComplete 
}: FocusTimerScreenProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(true)
  const [isPulsing, setIsPulsing] = useState(true)
  
  const initialTotalSeconds = initialMinutes * 60
  const progress = ((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100
  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  useEffect(() => {
    if (!isRunning || totalSeconds <= 0) {
      if (totalSeconds <= 0 && onComplete) {
        onComplete()
      }
      return
    }

    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, totalSeconds, onComplete])

  const togglePause = useCallback(() => {
    setIsRunning((prev) => !prev)
    setIsPulsing((prev) => !prev)
  }, [])

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Ambient glow layers */}
      <div 
        className={`absolute w-96 h-96 rounded-full bg-primary/10 blur-[100px] transition-opacity duration-1000 ${
          isPulsing ? "animate-pulse" : "opacity-30"
        }`} 
      />
      <div 
        className={`absolute w-72 h-72 rounded-full bg-primary/20 blur-[60px] transition-opacity duration-1000 ${
          isPulsing ? "animate-pulse" : "opacity-20"
        }`} 
        style={{ animationDelay: "0.5s" }}
      />
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        aria-label="Close timer"
      >
        <X className="w-6 h-6 text-white/60" />
      </button>

      {/* Growing tree indicator */}
      <div className="flex items-center gap-2 mb-8 text-emerald-400/80">
        <TreeDeciduous className="w-5 h-5" />
        <span className="text-sm font-medium tracking-wide">Growing your tree...</span>
      </div>

      {/* Timer ring */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing outer glow */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            isPulsing 
              ? "shadow-[0_0_60px_20px_rgba(79,70,229,0.3),0_0_120px_40px_rgba(79,70,229,0.15)]" 
              : "shadow-[0_0_30px_10px_rgba(79,70,229,0.15)]"
          }`}
          style={{
            animation: isPulsing ? "timerPulse 2s ease-in-out infinite" : "none"
          }}
        />
        
        <svg className="w-80 h-80 -rotate-90" viewBox="0 0 320 320">
          {/* Background track */}
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          
          {/* Progress gradient */}
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <filter id="timerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Progress circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#timerGlow)"
            className="transition-all duration-1000 ease-linear"
          />
          
          {/* Inner decorative ring */}
          <circle
            cx="160"
            cy="160"
            r="125"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
        </svg>

        {/* Center time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-7xl font-extralight text-white tracking-tight tabular-nums"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {formatTime(minutes, seconds)}
          </span>
          <span className="text-white/40 text-sm mt-3 tracking-widest uppercase">
            {isRunning ? "Focus Mode" : "Paused"}
          </span>
        </div>
      </div>

      {/* Pause/Play button */}
      <button
        onClick={togglePause}
        className="mt-12 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
        aria-label={isRunning ? "Pause" : "Resume"}
      >
        {isRunning ? (
          <Pause className="w-6 h-6 text-white/80" />
        ) : (
          <Play className="w-6 h-6 text-white/80 ml-1" />
        )}
      </button>

      {/* Session info */}
      <p className="mt-8 text-white/30 text-xs tracking-wider">
        Stay focused to grow your tree
      </p>

      {/* CSS for custom pulse animation */}
      <style jsx>{`
        @keyframes timerPulse {
          0%, 100% {
            box-shadow: 0 0 60px 20px rgba(79,70,229,0.3), 0 0 120px 40px rgba(79,70,229,0.15);
          }
          50% {
            box-shadow: 0 0 80px 30px rgba(79,70,229,0.4), 0 0 160px 60px rgba(79,70,229,0.2);
          }
        }
      `}</style>
    </div>
  )
}
