import React from 'react'
import { Plus } from 'lucide-react'
import { Habit, Screen } from '@/app/types'
import { HabitCard } from '@/app/components/HabitCard'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface DashboardProps {
  habits: Habit[]
  onNavigate: (screen: Screen, habitId?: string) => void
  onToggleHabit: (id: string) => void
}

function isDueToday(h: Habit): boolean {
  if (h.frequency === 'daily') return true
  if (h.frequency === 'period') return false // «Раз в N ч» не привязан к дню недели — в блок «Не сегодня»
  const day = new Date().getDay()
  return h.daysOfWeek?.includes(day) ?? false
}

export const Dashboard: React.FC<DashboardProps> = ({
  habits,
  onNavigate,
  onToggleHabit,
}) => {
  const today = format(new Date(), 'yyyy-MM-dd')

  const habitsDueToday = habits.filter(isDueToday)
  const habitsNotToday = habits.filter((h) => !isDueToday(h))

  const completedToday = habitsDueToday.filter((h) => h.completedDates.includes(today)).length
  const totalToday = habitsDueToday.length
  const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0

  const chartData = [
    { value: progressPercent || 0.1 },
    { value: Math.max(0, 100 - progressPercent) },
  ]

  const hasAnyHabits = habits.length > 0

  return (
    <div className="pb-32 pt-12 px-8 max-w-lg mx-auto min-h-screen bg-white">
      <header className="mb-12">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
          {format(new Date(), 'EEEE, d MMMM', { locale: ru })}
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">Обзор дня</h1>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 flex items-center gap-10"
      >
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={52}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                <Cell fill="#2DD4BF" />
                <Cell fill="#F8FAFC" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">{progressPercent}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Ваш прогресс
          </p>
          <p className="text-slate-800 text-lg font-normal leading-tight">
            {totalToday === 0
              ? 'Добавьте первую привычку'
              : `Завершено ${completedToday} из ${totalToday}`}
          </p>
        </div>
      </motion.div>

      <div className="space-y-6 relative">
        <div className="flex justify-between items-end border-b border-slate-50 pb-4">
          <h3 className="font-semibold text-slate-900 text-xl tracking-tight">Привычки</h3>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
            {habitsDueToday.length} СЕГОДНЯ
          </span>
        </div>

        {habitsDueToday.length > 0 && (
          <div className="grid gap-3">
            {habitsDueToday.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={habit.completedDates.includes(today)}
                onToggle={onToggleHabit}
                onClick={(id) => onNavigate('details', id)}
              />
            ))}
          </div>
        )}

        {habitsNotToday.length > 0 && (
          <div className="mt-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Не сегодня
            </p>
            <div className="grid gap-3">
              {habitsNotToday.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isCompleted={false}
                  onToggle={onToggleHabit}
                  onClick={(id) => onNavigate('details', id)}
                  isMuted
                />
              ))}
            </div>
          </div>
        )}

        {!hasAnyHabits && (
          <div className="text-center py-16 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-100">
            <p className="text-slate-400 text-sm font-medium">Список пуст</p>
          </div>
        )}

        <div className="sticky bottom-6 mt-8 flex justify-center z-10">
          <button
            onClick={() => onNavigate('add')}
            className="flex items-center gap-2 py-3 px-5 rounded-2xl bg-[#2DD4BF] text-white text-sm font-medium shadow-lg shadow-[#2DD4BF]/25 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <Plus size={20} strokeWidth={2} />
            Создать
          </button>
        </div>
      </div>
    </div>
  )
}
