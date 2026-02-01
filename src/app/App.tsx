import React, { useState, useEffect } from 'react'
import { AppState, Habit, Screen } from '@/app/types'
import { Onboarding } from '@/app/components/Onboarding'
import { Dashboard } from '@/app/components/Dashboard'
import { HabitForm } from '@/app/components/HabitForm'
import { HabitDetails } from '@/app/components/HabitDetails'
import { Motivation } from '@/app/components/Motivation'
import { Settings } from '@/app/components/Settings'
import { BottomNav } from '@/app/components/BottomNav'
import { format, subDays } from 'date-fns'
import { Toaster, toast } from 'sonner'

const STORAGE_KEY = 'habit-flow-state'

const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Пить воду',
    icon: '✨',
    frequency: 'daily',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    reminderTime: '08:00',
    isReminderOn: true,
    streak: 5,
    completedDates: [
      format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      format(subDays(new Date(), 3), 'yyyy-MM-dd'),
      format(subDays(new Date(), 4), 'yyyy-MM-dd'),
      format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Медитация',
    icon: '✨',
    frequency: 'daily',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    reminderTime: '07:30',
    isReminderOn: true,
    streak: 3,
    completedDates: [
      format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    ],
    createdAt: new Date().toISOString(),
  },
]

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse state', e)
      }
    }
    return {
      habits: INITIAL_HABITS,
      currentScreen: 'onboarding',
      onboarded: false,
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const handleNavigate = (screen: Screen, habitId?: string) => {
    setState((prev) => ({
      ...prev,
      currentScreen: screen,
      selectedHabitId: habitId ?? prev.selectedHabitId,
    }))
    window.scrollTo(0, 0)
  }

  const handleToggleHabit = (id: string) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) => {
        if (habit.id !== id) return habit
        const alreadyCompleted = habit.completedDates.includes(today)
        let newCompletedDates = [...habit.completedDates]
        let newStreak = habit.streak
        if (alreadyCompleted) {
          newCompletedDates = newCompletedDates.filter((d) => d !== today)
          newStreak = Math.max(0, newStreak - 1)
          toast.info('Отмечено как невыполненное')
        } else {
          newCompletedDates.push(today)
          newStreak += 1
          toast.success(`Отлично! Серия ${newStreak} дн. 🎉`)
        }
        return { ...habit, completedDates: newCompletedDates, streak: newStreak }
      }),
    }))
  }

  const handleSaveHabit = (habitData: Partial<Habit>) => {
    setState((prev) => {
      const isEditing = prev.currentScreen === 'edit' && prev.selectedHabitId
      let newHabits: Habit[]
      if (isEditing) {
        newHabits = prev.habits.map((h) =>
          h.id === prev.selectedHabitId ? { ...h, ...habitData } : h
        )
        toast.success('Привычка обновлена')
      } else {
        const newHabit: Habit = {
          id: Math.random().toString(36).substring(2, 9),
          name: habitData.name ?? '',
          icon: habitData.icon ?? '✨',
          frequency: habitData.frequency ?? 'daily',
          daysOfWeek: habitData.daysOfWeek,
          reminderTime: habitData.reminderTime ?? '09:00',
          isReminderOn: habitData.isReminderOn ?? true,
          streak: 0,
          completedDates: [],
          createdAt: new Date().toISOString(),
        }
        newHabits = [...prev.habits, newHabit]
        toast.success('Привычка создана! Удачи ✨')
      }
      return {
        ...prev,
        habits: newHabits,
        currentScreen: 'dashboard',
        selectedHabitId: undefined,
      }
    })
  }

  const handleDeleteHabit = (id: string) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== id),
      currentScreen: 'dashboard',
      selectedHabitId: undefined,
    }))
    toast.error('Привычка удалена')
  }

  const renderScreen = () => {
    if (!state.onboarded && state.currentScreen === 'onboarding') {
      return (
        <Onboarding
          onComplete={() =>
            setState((prev) => ({ ...prev, onboarded: true, currentScreen: 'dashboard' }))
          }
        />
      )
    }
    switch (state.currentScreen) {
      case 'dashboard':
        return (
          <Dashboard
            habits={state.habits}
            onNavigate={handleNavigate}
            onToggleHabit={handleToggleHabit}
          />
        )
      case 'add':
        return <HabitForm onSave={handleSaveHabit} onCancel={() => handleNavigate('dashboard')} />
      case 'edit':
        return (
          <HabitForm
            habit={state.habits.find((h) => h.id === state.selectedHabitId)}
            onSave={handleSaveHabit}
            onCancel={() => handleNavigate('details')}
          />
        )
      case 'details': {
        const habit = state.habits.find((h) => h.id === state.selectedHabitId)
        if (!habit)
          return (
            <Dashboard
              habits={state.habits}
              onNavigate={handleNavigate}
              onToggleHabit={handleToggleHabit}
            />
          )
        return (
          <HabitDetails
            habit={habit}
            onBack={() => handleNavigate('dashboard')}
            onEdit={() => handleNavigate('edit')}
            onDelete={handleDeleteHabit}
          />
        )
      }
      case 'motivation':
        return <Motivation />
      case 'settings':
        return <Settings />
      default:
        return (
          <Dashboard
            habits={state.habits}
            onNavigate={handleNavigate}
            onToggleHabit={handleToggleHabit}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#5DE0E6]/20">
      <div className="mx-auto max-w-md min-h-screen bg-white shadow-2xl relative">
        {renderScreen()}
        {state.onboarded &&
          ['dashboard', 'motivation', 'settings', 'details'].includes(state.currentScreen) && (
            <BottomNav currentScreen={state.currentScreen} onNavigate={handleNavigate} />
          )}
        <Toaster position="top-center" expand={false} richColors />
      </div>
    </div>
  )
}
