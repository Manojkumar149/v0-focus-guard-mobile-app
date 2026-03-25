"use client"

import { useState } from "react"
import { Plus, Check } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface Friend {
  name: string
  initials: string
  gradient: string
  isOnline: boolean
}

interface ActivityItem {
  id: string
  name: string
  initials: string
  gradient: string
  time: string
  activity: string
  xp: number
  nudged: boolean
}

interface SocialFeedScreenProps {
  onTabChange?: (tab: "home" | "forest" | "social" | "coach" | "profile") => void
}

export function SocialFeedScreen({ onTabChange }: SocialFeedScreenProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: "1", name: "Arjun", initials: "AR", gradient: "from-indigo-500 to-indigo-700", time: "2m ago", activity: "completed a 25-min deep work session", xp: 150, nudged: false },
    { id: "2", name: "Priya", initials: "PR", gradient: "from-purple-500 to-purple-700", time: "5m ago", activity: "reached a 14-day streak 🔥", xp: 300, nudged: false },
    { id: "3", name: "Dev", initials: "DE", gradient: "from-emerald-500 to-emerald-700", time: "12m ago", activity: "grew 3 new trees in their forest", xp: 90, nudged: false },
    { id: "4", name: "Kavya", initials: "KA", gradient: "from-amber-500 to-amber-700", time: "18m ago", activity: "unlocked 'Iron Focus' achievement 🏅", xp: 200, nudged: false },
    { id: "5", name: "Rohit", initials: "RO", gradient: "from-rose-500 to-rose-700", time: "1h ago", activity: "completed a 50-min flow session 🚀", xp: 250, nudged: false },
  ])

  const [hasJoinedChallenge, setHasJoinedChallenge] = useState(false)

  const onlineFriends: Friend[] = [
    { name: "Arjun", initials: "AR", gradient: "from-indigo-500 to-indigo-700", isOnline: true },
    { name: "Priya", initials: "PR", gradient: "from-purple-500 to-purple-700", isOnline: true },
    { name: "Dev", initials: "DE", gradient: "from-emerald-500 to-emerald-700", isOnline: true },
    { name: "Kavya", initials: "KA", gradient: "from-amber-500 to-amber-700", isOnline: true },
    { name: "Rohit", initials: "RO", gradient: "from-rose-500 to-rose-700", isOnline: true },
  ]

  const handleNudge = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, nudged: true } : a))
    )
    
    // Reset after 2 seconds
    setTimeout(() => {
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? { ...a, nudged: false } : a))
      )
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] min-h-screen bg-background relative overflow-y-auto pb-24">
        {/* Background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        
        <main className="relative z-10 px-5 pt-10">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Friends</h1>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/50 text-primary text-sm font-medium hover:bg-primary/10 transition-colors">
              <Plus className="w-4 h-4" />
              Invite
            </button>
          </header>

          {/* Online Now Bar */}
          <section className="mb-6">
            <h3 className="text-xs text-white/50 uppercase tracking-wider mb-3">Focusing Now</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {onlineFriends.map((friend, i) => (
                <div key={i} className="flex flex-col items-center shrink-0">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${friend.gradient} flex items-center justify-center text-white font-semibold text-sm`}>
                      {friend.initials}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-background" />
                  </div>
                  <span className="text-xs text-white/60 mt-1.5">{friend.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Activity Feed */}
          <section className="mb-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 p-4 mb-3"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activity.gradient} flex items-center justify-center text-white font-semibold text-xs shrink-0`}>
                    {activity.initials}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{activity.name}</span>
                      <span className="text-xs text-white/40">{activity.time}</span>
                    </div>
                    <p className="text-sm text-white/70 mt-0.5">{activity.activity}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                      +{activity.xp} XP
                    </span>
                  </div>
                  
                  {/* Nudge Button */}
                  <button
                    onClick={() => handleNudge(activity.id)}
                    disabled={activity.nudged}
                    className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      activity.nudged
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 text-white/50 hover:bg-white/5"
                    }`}
                  >
                    {activity.nudged ? (
                      <span className="flex items-center gap-1">
                        Sent! <Check className="w-3 h-3" />
                      </span>
                    ) : (
                      "Nudge 👋"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Weekly Challenge Card */}
          <section className="mb-6">
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white">🏆 Weekly Challenge</h3>
                  <p className="text-sm text-white/60 mt-1">Focus 10 hours this week</p>
                </div>
                <button
                  onClick={() => setHasJoinedChallenge(true)}
                  disabled={hasJoinedChallenge}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    hasJoinedChallenge
                      ? "bg-white/10 text-white/50"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {hasJoinedChallenge ? "Joined" : "Join"}
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: "75%" }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">7.5 / 10 hours</span>
                <span className="text-xs text-white/50">23 friends participating</span>
              </div>
            </div>
          </section>

          {/* My Stats Card */}
          <section className="mb-6">
            <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 p-4">
              <h3 className="text-sm text-white/60 mb-2">Your Rank This Week</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">#12</span>
                <span className="text-sm text-white/50">out of 847 friends</span>
              </div>
              <p className="text-sm text-emerald-400 mt-2">↑ 3 spots from last week</p>
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab="social" onTabChange={onTabChange} />
      </div>
    </div>
  )
}
