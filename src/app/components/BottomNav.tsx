import React from 'react'
import { Home, Sparkles, Settings as SettingsIcon } from 'lucide-react'
import { Screen } from '@/app/types'
import { cn } from '@/lib/utils'

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'ГЛАВНАЯ' },
    { id: 'motivation', icon: Sparkles, label: 'ИНСАЙТЫ' },
    { id: 'settings', icon: SettingsIcon, label: 'ПРОФИЛЬ' },
  ]

  const activeTab =
    ['dashboard', 'edit', 'details'].includes(currentScreen) ? 'dashboard' : currentScreen

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-50 px-6 py-4 flex justify-between items-center pb-[calc(1rem+env(safe-area-inset-bottom))] z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id as Screen)}
            className={cn(
              'flex flex-col items-center gap-1.5 transition-all duration-300 flex-1',
              isActive ? 'text-[#2DD4BF]' : 'text-slate-300 hover:text-slate-400'
            )}
          >
            <div className="transition-all duration-300 flex items-center justify-center">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[9px] font-bold tracking-[0.1em]">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
