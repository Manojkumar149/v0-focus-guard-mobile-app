"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface FocusButtonProps {
  onStartSession?: () => void
}

export function FocusButton({ onStartSession }: FocusButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onStartSession}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group w-full"
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 ${isHovered ? 'animate-pulse-glow' : ''}`} />
      
      {/* Button */}
      <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl transform transition-all duration-200 group-hover:scale-[1.02] group-active:scale-[0.98]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 rounded-2xl animate-shimmer" />
        
        <div className="relative flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <span className="text-lg">Start Focus Session</span>
        </div>
      </div>
    </button>
  )
}
