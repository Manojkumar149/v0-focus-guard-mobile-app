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
    <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">This Week's Forest</span>
        <span className="text-xs text-muted-foreground">6 trees grown</span>
      </div>
      
      {/* Forest visualization */}
      <div className="relative h-16 bg-gradient-to-b from-transparent via-emerald-950/20 to-emerald-950/40 rounded-xl overflow-hidden">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-emerald-900/60 to-transparent" />
        
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
