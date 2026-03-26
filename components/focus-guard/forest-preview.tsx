"use client"

interface Tree {
  id: number
  size: "sm" | "md" | "lg"
  color: string
  delay: number
}

export function ForestPreview() {
  const trees: Tree[] = [
    { id: 1, size: "md", color: "#22C55E", delay: 0 },
    { id: 2, size: "lg", color: "#16A34A", delay: 0.2 },
    { id: 3, size: "sm", color: "#4ADE80", delay: 0.4 },
    { id: 4, size: "lg", color: "#22C55E", delay: 0.1 },
    { id: 5, size: "md", color: "#16A34A", delay: 0.3 },
    { id: 6, size: "sm", color: "#4ADE80", delay: 0.5 },
  ]

  const sizeMap = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12"
  }

  return (
    <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-4 border border-emerald-500/20" style={{ boxShadow: "0 4px 24px rgba(16,185,129,0.1)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center text-sm">🌳</div>
          <span className="text-sm font-semibold text-foreground">This Week's Forest</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">6 trees</span>
          <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full px-2 py-0.5 font-medium">+42 XP</span>
        </div>
      </div>

      {/* Forest visualization */}
      <div className="relative h-20 bg-gradient-to-b from-indigo-950/50 via-slate-900/40 to-emerald-950/50 rounded-xl overflow-hidden">
        {/* Twinkling stars in sky */}
        <div className="absolute top-[15%] left-[12%] w-0.5 h-0.5 bg-white/70 rounded-full animate-twinkle" />
        <div className="absolute top-[22%] left-[38%] w-0.5 h-0.5 bg-white/60 rounded-full animate-twinkle" style={{ animationDelay: "0.6s" }} />
        <div className="absolute top-[12%] right-[20%] w-0.5 h-0.5 bg-white/50 rounded-full animate-twinkle" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-[28%] right-[8%]  w-0.5 h-0.5 bg-white/60 rounded-full animate-twinkle" style={{ animationDelay: "0.3s" }} />
        <div className="absolute top-[18%] left-[62%] w-0.5 h-0.5 bg-white/40 rounded-full animate-twinkle" style={{ animationDelay: "1.8s" }} />
        {/* Moon */}
        <div className="absolute top-1.5 right-5 w-4 h-4 rounded-full border border-yellow-200/30 bg-yellow-100/8" />
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-emerald-800/70 to-transparent" />
        
        {/* Trees */}
        <div className="absolute bottom-2 left-0 right-0 flex items-end justify-around px-4">
          {trees.map((tree) => (
            <div
              key={tree.id}
              className={`${sizeMap[tree.size]} animate-float`}
              style={{ 
                animationDelay: `${tree.delay}s`,
                animationDuration: '3s'
              }}
            >
              {/* Tree SVG */}
              <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-lg">
                {/* Tree trunk */}
                <rect x="10" y="24" width="4" height="8" fill="#8B5A2B" rx="1" />
                {/* Tree crown layers */}
                <path d="M12 0 L22 14 H2 Z" fill={tree.color} />
                <path d="M12 6 L20 18 H4 Z" fill={tree.color} opacity="0.9" />
                <path d="M12 12 L18 22 H6 Z" fill={tree.color} opacity="0.8" />
              </svg>
            </div>
          ))}
        </div>
        
        {/* Subtle sparkles */}
        <div className="absolute top-2 left-8 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute top-4 right-12 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-3 left-1/2 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  )
}
