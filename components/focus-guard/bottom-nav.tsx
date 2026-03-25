"use client"

import { Home, TreePine, Users, Bot, User } from "lucide-react"

type TabId = "home" | "forest" | "social" | "coach" | "profile"

interface NavItem {
  id: TabId
  icon: React.ReactNode
  label: string
}

interface BottomNavProps {
  activeTab?: TabId
  onTabChange?: (tab: TabId) => void
}

export function BottomNav({ activeTab = "home", onTabChange }: BottomNavProps) {

  const navItems: NavItem[] = [
    { id: "home", icon: <Home className="w-5 h-5" />, label: "Home" },
    { id: "forest", icon: <TreePine className="w-5 h-5" />, label: "Forest" },
    { id: "social", icon: <Users className="w-5 h-5" />, label: "Social" },
    { id: "coach", icon: <Bot className="w-5 h-5" />, label: "AI Coach" },
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 safe-area-inset-bottom">
      <div className="max-w-[375px] mx-auto flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-0.5 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
