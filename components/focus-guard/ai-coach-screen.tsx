"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, Bot, Send, Mic, Flame, Clock, Target } from "lucide-react"
import { BottomNav } from "./bottom-nav"

interface Message {
  id: string
  type: "bot" | "user"
  content: string
  time: string
  isStatsCard?: boolean
  isThinking?: boolean
}

interface AICoachScreenProps {
  onTabChange?: (tab: "home" | "forest" | "social" | "coach" | "profile") => void
  onBack?: () => void
}

export function AICoachScreen({ onTabChange, onBack }: AICoachScreenProps) {
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Good morning! You've been crushing it lately — 3 sessions yesterday. Ready to make today even better?",
      time: "9:00 AM",
    },
    {
      id: "2",
      type: "user",
      content: "Thanks! I've been struggling to focus after lunch though",
      time: "9:01 AM",
    },
    {
      id: "3",
      type: "bot",
      content: "That's super common — post-lunch energy dips are real! Try a 5-min walk before your afternoon session. Also, your best focus window based on your data is 10-11 AM. Want me to set a reminder?",
      time: "9:01 AM",
    },
    {
      id: "4",
      type: "bot",
      content: "",
      time: "9:02 AM",
      isStatsCard: true,
    },
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = [
    { text: "Set a reminder", emoji: "🔔" },
    { text: "Show my stats", emoji: "📊" },
    { text: "Motivation boost", emoji: "💪" },
  ]

  const handleSend = () => {
    if (!inputText.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputText("")

    // Add thinking indicator
    setTimeout(() => {
      const thinkingMessage: Message = {
        id: `thinking-${Date.now()}`,
        type: "bot",
        content: "",
        time: "",
        isThinking: true,
      }
      setMessages((prev) => [...prev, thinkingMessage])
    }, 500)

    // Replace thinking with actual response
    setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter((m) => !m.isThinking)
        return [
          ...filtered,
          {
            id: `response-${Date.now()}`,
            type: "bot",
            content: "Great question! Keep building those streaks — consistency is the key to deep focus.",
            time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          },
        ]
      })
    }, 2500)
  }

  const handleQuickReply = (text: string) => {
    setInputText(text)
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[375px] h-screen bg-background flex flex-col">
        {/* Header - sticky top */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-3 shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack || (() => onTabChange?.("home"))}
              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white/60" />
            </button>
            
            <div className="text-center">
              <h1 className="text-base font-semibold text-white">AI Coach</h1>
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span className="text-xs text-white/50">Online</span>
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>

        {/* Chat Messages - scrollable flex-1 */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "bot" && !message.isThinking && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 shrink-0 self-end">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div className={`max-w-[75%] ${message.type === "user" ? "order-1" : ""}`}>
                {message.isThinking ? (
                  <div className="flex items-center gap-2 ml-10">
                    <div className="bg-primary/20 border border-primary/30 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                ) : message.isStatsCard ? (
                  <div className="ml-10">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-white mb-3">Your Weekly Insights</h4>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <Flame className="w-4 h-4 text-orange-400" />
                          <span className="text-sm text-white/70">Best streak:</span>
                          <span className="text-sm font-medium text-white ml-auto">13 days</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-indigo-400" />
                          <span className="text-sm text-white/70">Avg session:</span>
                          <span className="text-sm font-medium text-white ml-auto">24 min</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-white/70">Focus score:</span>
                          <span className="text-sm font-medium text-white ml-auto">94%</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-white/30 mt-1 block">{message.time}</span>
                  </div>
                ) : (
                  <>
                    <div
                      className={`px-4 py-3 ${
                        message.type === "user"
                          ? "bg-indigo-600 rounded-2xl rounded-tr-sm"
                          : "bg-primary/20 border border-primary/30 rounded-2xl rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm text-white leading-relaxed">{message.content}</p>
                    </div>
                    <span className={`text-xs text-white/30 mt-1 block ${message.type === "user" ? "text-right" : ""}`}>
                      {message.time}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies + input - sticky above bottom nav */}
        <div className="shrink-0 pb-20 px-4 bg-background/80 backdrop-blur-xl border-t border-border/50">
          {/* Quick reply chips */}
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleQuickReply(reply.text)}
                className="shrink-0 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors"
              >
                {reply.text} {reply.emoji}
              </button>
            ))}
          </div>
          
          {/* Input bar */}
          <div className="flex items-center gap-3 pb-2">
            <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors shrink-0">
              <Mic className="w-5 h-5 text-white/40" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Message your coach..."
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                inputText.trim()
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                  : "bg-white/5 text-white/30"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab="coach" onTabChange={onTabChange} />
      </div>
    </div>
  )
}
