import React from 'react'
import { ChevronLeft, Edit2, Trash2, Calendar, Flame, Activity } from 'lucide-react'
import { Habit } from '@/app/types'
import { cn } from '@/lib/utils'
import { format, subDays, isSameDay } from 'date-fns'
import { ru } from 'date-fns/locale'

interface HabitDetailsProps {
  habit: Habit
  onBack: () => void
  onEdit: () => void
  onDelete: (id: string) => void
}

export const HabitDetails: React.FC<HabitDetailsProps> = ({
  habit,
  onBack,
  onEdit,
  onDelete,
}) => {
  const last14Days = Array.from({ length: 14 }, (_, i) => subDays(new Date(), i)).reverse()

  return (
    <div className="min-h-screen bg-white pb-32">
      <header className="px-8 py-6 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-slate-50">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <div className="flex gap-4">
          <button onClick={onEdit} className="text-slate-400 hover:text-slate-900 transition-colors">
            <Edit2 size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => {
              if (confirm('Удалить эту привычку?')) onDelete(habit.id)
            }}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="px-8 mt-12 max-w-lg mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-semibold text-slate-900 tracking-tight mb-4">{habit.name}</h1>
          <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} />
              <span>
                {habit.frequency === 'daily' && 'ЕЖЕДНЕВНО'}
                {habit.frequency === 'custom' && 'ПО РАСПИСАНИЮ'}
                {habit.frequency === 'period' && 'ПЕРИОДИЧЕСКИ'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity size={12} />
              <span>
                {habit.frequency === 'period'
                  ? `Раз в ${habit.periodInterval}ч`
                  : `В ${habit.reminderTime}`}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-16">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              ТЕКУЩАЯ СЕРИЯ
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-slate-900">{habit.streak}</span>
              <span className="text-sm font-medium text-slate-500">дн.</span>
            </div>
            <Flame size={20} className="mt-4 text-[#2DD4BF]" strokeWidth={1.5} />
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              ВСЕГО ДНЕЙ
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-slate-900">
                {habit.completedDates.length}
              </span>
              <span className="text-sm font-medium text-slate-500">дн.</span>
            </div>
            <Activity size={20} className="mt-4 text-slate-300" strokeWidth={1.5} />
          </div>
        </div>

        <section className="mb-12">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">
            ИСТОРИЯ ВЫПОЛНЕНИЯ
          </h3>
          <div className="grid grid-cols-7 gap-y-8 gap-x-2">
            {last14Days.map((date, i) => {
              const dateStr = format(date, 'yyyy-MM-dd')
              const isCompleted = habit.completedDates.includes(dateStr)
              const isToday = isSameDay(date, new Date())
              return (
                <div key={i} className="flex flex-col items-center gap-3">
                  <span className="text-[9px] font-bold text-slate-300 uppercase">
                    {format(date, 'EE', { locale: ru })}
                  </span>
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all',
                      isCompleted
                        ? 'bg-[#2DD4BF] text-white shadow-lg shadow-[#2DD4BF]/20'
                        : isToday
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-300'
                    )}
                  >
                    {format(date, 'd')}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
