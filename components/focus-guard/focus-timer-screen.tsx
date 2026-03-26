"use client"

import { useEffect, useState, useCallback } from "react"
import { X, Pause, Play, TreeDeciduous, Settings, Plus, Clock, Zap, Users, ChevronDown } from "lucide-react"

interface FocusTimerScreenProps {
  initialMinutes?: number
  sessionName?: string
  sessionNumber?: number
  totalSessions?: number
  onClose: () => void
  onComplete?: () => void
}

export function FocusTimerScreen({
  initialMinutes = 25,
  sessionName: initialSessionName = "Focus Session",
  sessionNumber = 1,
  totalSessions = 3,
  onClose,
  onComplete
}: FocusTimerScreenProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)
  const [sessionName, setSessionName] = useState(initialSessionName)
  const [showSettings, setShowSettings] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(initialSessionName)
  
  const initialTotalSeconds = initialMinutes * 60
  const progress = ((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100
  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  // Calculate focused time today (mock: 1h 25m + current session progress)
  const focusedToday = Math.floor((initialTotalSeconds - totalSeconds) / 60) + 85 // 85 min from previous sessions
  const focusedHours = Math.floor(focusedToday / 60)
  const focusedMins = focusedToday % 60

  useEffect(() => {
    if (!isRunning || totalSeconds <= 0) {
      if (totalSeconds <= 0 && onComplete) {
        onComplete()
      }
      return
    }

    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev - 1)
      // Earn XP over time
      setEarnedXP((prev) => Math.min(prev + 0.05, 150))
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, totalSeconds, onComplete])

  const togglePause = useCallback(() => {
    setIsRunning((prev) => !prev)
    if (!hasStarted) {
      setHasStarted(true)
    }
  }, [hasStarted])

  const addFiveMinutes = useCallback(() => {
    setTotalSeconds((prev) => prev + 300)
  }, [])

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center z-50 overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-950/20 via-black to-black pointer-events-none" />
      
      {/* Ambient glow layers */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[100px] transition-opacity duration-1000 ${
          isRunning ? "animate-pulse opacity-100" : "opacity-30"
        }`} 
      />
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/20 blur-[60px] transition-opacity duration-1000 ${
          isRunning ? "animate-pulse opacity-100" : "opacity-20"
        }`} 
        style={{ animationDelay: "0.5s" }}
      />
      
      {/* Top Bar */}
      <div className="relative w-full max-w-[375px] flex items-center justify-between px-5 pt-6">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
          aria-label="Close timer"
        >
          <X className="w-5 h-5 text-white/60" />
        </button>
        
        <span className="text-white/40 text-sm">
          Session {sessionNumber} of {totalSessions} today
        </span>
        
        <button
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-white/60" />
        </button>
      </div>

      {/* Session Name & Status */}
      <div className="relative flex flex-col items-center mt-6">
        <h2 className="text-xl font-medium text-white tracking-tight">{sessionName}</h2>
        <div className="flex items-center gap-2 mt-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isRunning 
              ? "bg-primary/20 text-indigo-300" 
              : "bg-white/10 text-white/60"
          }`}>
            {isRunning ? "Focus Mode" : "Paused"}
          </span>
        </div>
        
        {/* Growing tree indicator */}
        <div className={`flex items-center gap-2 mt-4 transition-opacity duration-300 ${
          isRunning ? "opacity-100" : "opacity-50"
        }`}>
          <TreeDeciduous className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-emerald-400/80 font-medium">
            {isRunning ? "Growing your tree..." : "Tree growth paused"}
          </span>
        </div>
      </div>

      {/* Main Timer Ring */}
      <div className="relative flex items-center justify-center flex-1">
        {/* Pulsing outer glow */}
        <div 
          className={`absolute w-80 h-80 rounded-full transition-all duration-1000 ${
            isRunning 
              ? "shadow-[0_0_60px_20px_rgba(79,70,229,0.3),0_0_120px_40px_rgba(79,70,229,0.15)]" 
              : "shadow-[0_0_30px_10px_rgba(79,70,229,0.1)]"
          }`}
          style={{
            animation: isRunning ? "timerPulse 2s ease-in-out infinite" : "none"
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
            className={`transition-all duration-1000 ease-linear ${
              !isRunning ? "opacity-60" : "opacity-100"
            }`}
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
            style={{ fontVariantNumeric: "tabular-nums", fontWeight: 200 }}
          >
            {formatTime(minutes, seconds)}
          </span>
          <span className="text-white/40 text-xs mt-3 tracking-[0.2em] uppercase">
            {isRunning ? "Focus Mode" : (!hasStarted ? "Tap ▶ to begin" : "Paused")}
          </span>
        </div>
      </div>

      {/* Control Buttons Row */}
      <div className="relative flex items-center justify-center gap-4 mb-6">
        {/* +5 min button */}
        <button
          onClick={addFiveMinutes}
          className="px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white/70 text-sm font-medium flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          5 min
        </button>
        
        {/* Main Pause/Play button */}
        <button
          onClick={togglePause}
          className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
          aria-label={isRunning ? "Pause" : "Resume"}
        >
          <span className="relative w-6 h-6">
            <Pause 
              className={`w-6 h-6 text-white/80 absolute inset-0 transition-all duration-300 ease-out ${
                isRunning 
                  ? "opacity-100 scale-100 rotate-0" 
                  : "opacity-0 scale-75 -rotate-90"
              }`} 
            />
            <Play 
              className={`w-6 h-6 text-white/80 absolute inset-0 ml-0.5 transition-all duration-300 ease-out ${
                isRunning 
                  ? "opacity-0 scale-75 rotate-90" 
                  : "opacity-100 scale-100 rotate-0"
              }`} 
            />
          </span>
        </button>
        
        {/* End button */}
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all text-red-400 text-sm font-medium"
        >
          End
        </button>
      </div>

      {/* Progress Stats Bar */}
      <div className="relative w-full max-w-[340px] mx-auto mb-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-white/50 text-xs mb-1">
              <Clock className="w-3.5 h-3.5" />
              Focused today
            </div>
            <span className="text-white font-semibold">
              {focusedHours}h {focusedMins}m
            </span>
          </div>
          
          <div className="w-px h-8 bg-white/10" />
          
          <div className="flex flex-col items-center">
            <span className="text-white/50 text-xs mb-1">Sessions</span>
            <span className="text-white font-semibold">{sessionNumber}/{totalSessions}</span>
          </div>
          
          <div className="w-px h-8 bg-white/10" />
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-white/50 text-xs mb-1">
              <Zap className="w-3.5 h-3.5" />
              XP earned
            </div>
            <span className="text-amber-400 font-semibold">+{Math.floor(earnedXP)} XP</span>
          </div>
        </div>
      </div>

      {/* Social Nudge */}
      <div className="relative mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-white/40" />
          <span className="text-white/50 text-sm">12 friends focusing now</span>
        </div>
      </div>

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

      {/* Settings Sheet */}
      {showSettings && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={() => setShowSettings(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-[#0F0F1A] border-t border-white/10 rounded-t-3xl px-5 pt-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />
            <h3 className="text-base font-semibold text-white mb-5">Session Settings</h3>

            {/* Session name */}
            <div className="mb-4">
              <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Session Name</label>
              {editingName ? (
                <div className="flex gap-2">
                  <input
                    autoFocus
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSessionName(nameInput.trim() || sessionName)
                        setEditingName(false)
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50"
                  />
                  <button
                    onClick={() => { setSessionName(nameInput.trim() || sessionName); setEditingName(false) }}
                    className="px-4 py-2.5 bg-primary rounded-xl text-white text-sm font-medium"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setNameInput(sessionName); setEditingName(true) }}
                  className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm hover:bg-white/10 transition-colors"
                >
                  <span>{sessionName}</span>
                  <span className="text-white/40 text-xs">Tap to edit</span>
                </button>
              )}
            </div>

            {/* Add time */}
            <div className="mb-5">
              <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Add Time</label>
              <div className="flex gap-2">
                {[5, 10, 15].map((min) => (
                  <button
                    key={min}
                    onClick={() => { setTotalSeconds(s => s + min * 60); setShowSettings(false) }}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors"
                  >
                    +{min} min
                  </button>
                ))}
              </div>
            </div>

            {/* End session */}
            <button
              onClick={() => { setShowSettings(false); onClose() }}
              className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
            >
              End Session
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
