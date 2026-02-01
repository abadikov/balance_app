import React from 'react'
import { Check, Clock, Flame, Circle } from 'lucide-react'
import { Habit } from '@/app/types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface HabitCardProps {
  habit: Habit
  isCompleted: boolean
  onToggle: (id: string) => void
  onClick: (id: string) => void
  isMuted?: boolean
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  isCompleted,
  onToggle,
  onClick,
  isMuted = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'group relative p-5 rounded-[1.5rem] bg-white border border-slate-100 transition-all flex items-center gap-4',
        isCompleted && !isMuted && 'bg-slate-50/50 border-transparent',
        isMuted && 'opacity-70 border-slate-50'
      )}
      onClick={() => onClick(habit.id)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (!isMuted) onToggle(habit.id)
        }}
        disabled={isMuted}
        className={cn(
          'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0',
          isMuted && 'cursor-default opacity-50 border-slate-200',
          !isMuted &&
            (isCompleted
              ? 'bg-[#2DD4BF] border-[#2DD4BF] text-white'
              : 'border-slate-200 text-transparent hover:border-[#2DD4BF]')
        )}
      >
        <Check
          size={16}
          strokeWidth={3}
          className={cn('transition-transform duration-300', isCompleted ? 'scale-100' : 'scale-0')}
        />
      </button>

      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            'text-base font-medium text-slate-800 transition-all',
            isCompleted && !isMuted && 'text-slate-400',
            isMuted && 'text-slate-500'
          )}
        >
          {habit.name}
        </h3>
        <div className="flex items-center gap-3 mt-1 text-[12px] font-medium uppercase tracking-tight">
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={12} strokeWidth={2} />
            <span>
              {habit.frequency === 'period'
                ? `Раз в ${habit.periodInterval}ч`
                : habit.reminderTime}
            </span>
          </div>
          {habit.streak > 0 && (
            <div className="flex items-center gap-1 text-slate-400">
              <Flame size={12} strokeWidth={2} />
              <span>{habit.streak} ДНЯ</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-slate-200 group-hover:text-slate-300 transition-colors">
        <Circle size={4} fill="currentColor" />
      </div>
    </motion.div>
  )
}
