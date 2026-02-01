import React, { useState } from 'react'
import { ChevronLeft, Bell, Calendar } from 'lucide-react'
import { Habit } from '@/app/types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface HabitFormProps {
  habit?: Habit
  onSave: (habit: Partial<Habit>) => void
  onCancel: () => void
}

const DAYS = [
  { label: 'Пн', value: 1 },
  { label: 'Вт', value: 2 },
  { label: 'Ср', value: 3 },
  { label: 'Чт', value: 4 },
  { label: 'Пт', value: 5 },
  { label: 'Сб', value: 6 },
  { label: 'Вс', value: 0 },
]

export const HabitForm: React.FC<HabitFormProps> = ({ habit, onSave, onCancel }) => {
  const [name, setName] = useState(habit?.name ?? '')
  const [frequency, setFrequency] = useState<Habit['frequency']>(habit?.frequency ?? 'daily')
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>(
    habit?.daysOfWeek ?? [1, 2, 3, 4, 5, 6, 0]
  )
  const [periodInterval, setPeriodInterval] = useState(habit?.periodInterval ?? 1)
  const [reminderTime, setReminderTime] = useState(habit?.reminderTime ?? '09:00')
  const [isReminderOn, setIsReminderOn] = useState(habit?.isReminderOn ?? true)

  const toggleDay = (day: number) => {
    if (daysOfWeek.includes(day)) {
      if (daysOfWeek.length > 1) setDaysOfWeek(daysOfWeek.filter((d) => d !== day))
    } else {
      setDaysOfWeek([...daysOfWeek, day].sort((a, b) => a - b))
    }
  }

  const handleSave = () => {
    if (!name.trim()) return
    onSave({
      name,
      icon: '✨',
      frequency,
      daysOfWeek: frequency === 'custom' ? daysOfWeek : [0, 1, 2, 3, 4, 5, 6],
      periodInterval: frequency === 'period' ? periodInterval : undefined,
      reminderTime,
      isReminderOn,
    })
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      <header className="px-8 py-6 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-slate-50">
        <button
          onClick={onCancel}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h2 className="text-base font-semibold text-slate-900">
          {habit ? 'Редактировать' : 'Новая привычка'}
        </h2>
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="text-sm font-bold text-[#2DD4BF] disabled:text-slate-300"
        >
          Готово
        </button>
      </header>

      <div className="px-8 mt-12 space-y-12 max-w-lg mx-auto">
        <section className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Название
          </label>
          <input
            autoFocus
            type="text"
            placeholder="Что вы хотите внедрить?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-2xl font-normal bg-transparent border-none outline-none placeholder:text-slate-200"
          />
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Calendar size={12} strokeWidth={2} />
            <span>Повторение</span>
          </div>
          <div className="flex bg-slate-50 p-1 rounded-xl">
            <button
              onClick={() => setFrequency('daily')}
              className={cn(
                'flex-1 py-3 text-[10px] font-bold rounded-lg transition-all',
                frequency === 'daily' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
              )}
            >
              ЕЖЕДНЕВНО
            </button>
            <button
              onClick={() => setFrequency('custom')}
              className={cn(
                'flex-1 py-3 text-[10px] font-bold rounded-lg transition-all',
                frequency === 'custom' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
              )}
            >
              ДНИ
            </button>
            <button
              onClick={() => setFrequency('period')}
              className={cn(
                'flex-1 py-3 text-[10px] font-bold rounded-lg transition-all',
                frequency === 'period' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
              )}
            >
              ПЕРИОД
            </button>
          </div>

          {frequency === 'custom' && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between gap-1 pt-2"
            >
              {DAYS.map((day) => (
                <button
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  className={cn(
                    'w-9 h-9 rounded-lg text-[10px] font-bold transition-all border',
                    daysOfWeek.includes(day.value)
                      ? 'bg-[#2DD4BF] border-[#2DD4BF] text-white'
                      : 'bg-transparent border-slate-100 text-slate-400 hover:border-slate-200'
                  )}
                >
                  {day.label}
                </button>
              ))}
            </motion.div>
          )}

          {frequency === 'period' && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pt-2"
            >
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-medium text-slate-600">Интервал:</span>
                <span className="text-sm font-bold text-slate-900">Раз в {periodInterval} ч.</span>
              </div>
              <input
                type="range"
                min={1}
                max={24}
                step={1}
                value={periodInterval}
                onChange={(e) => setPeriodInterval(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2DD4BF]"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-300 uppercase px-1">
                <span>1ч</span>
                <span>12ч</span>
                <span>24ч</span>
              </div>
            </motion.div>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Bell size={12} strokeWidth={2} />
              <span>Напоминание</span>
            </div>
            <button
              onClick={() => setIsReminderOn(!isReminderOn)}
              className={cn(
                'w-10 h-5 rounded-full transition-colors relative',
                isReminderOn ? 'bg-[#2DD4BF]' : 'bg-slate-200'
              )}
            >
              <div
                className={cn(
                  'absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform',
                  isReminderOn && 'translate-x-5'
                )}
              />
            </button>
          </div>

          {isReminderOn && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full p-6 bg-slate-50 rounded-2xl text-3xl font-light text-center text-slate-800 outline-none hover:bg-slate-100 transition-colors [&::-webkit-datetime-edit-ampm-field]:hidden"
                step={60}
                title="24-часовой формат (ЧЧ:ММ)"
              />
            </motion.div>
          )}
        </section>

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-medium text-lg shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {habit ? 'Сохранить изменения' : 'Создать привычку'}
        </button>
      </div>
    </div>
  )
}
