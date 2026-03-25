import { XPProgressRing } from "@/components/focus-guard/xp-progress-ring"
import { StatsRow } from "@/components/focus-guard/stats-row"
import { FocusButton } from "@/components/focus-guard/focus-button"
import { ForestPreview } from "@/components/focus-guard/forest-preview"
import { BottomNav } from "@/components/focus-guard/bottom-nav"
import { Flame, Bell, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      {/* Mobile container - fixed 375px width */}
      <div className="w-full max-w-[375px] min-h-screen bg-background relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        
        {/* Main content */}
        <main className="relative z-10 px-5 pt-12 pb-28">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Good morning, Ravi
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">12 Day Streak</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* XP Progress Ring */}
          <section className="flex justify-center mb-8">
            <XPProgressRing
              currentXP={650}
              maxXP={1000}
              level={7}
              levelTitle="Flow Master"
            />
          </section>

          {/* Today's Stats */}
          <section className="mb-8">
            <StatsRow
              focusTime="2.5 hrs"
              sessions={3}
              percentile={18}
            />
          </section>

          {/* Focus Session CTA */}
          <section className="mb-8">
            <FocusButton />
          </section>

          {/* Forest Preview */}
          <section>
            <ForestPreview />
          </section>
        </main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  )
}
