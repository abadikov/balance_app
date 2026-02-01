export type Screen = 'onboarding' | 'dashboard' | 'add' | 'edit' | 'details' | 'motivation' | 'settings'

export type Frequency = 'daily' | 'custom' | 'period'

export interface Habit {
  id: string
  name: string
  icon: string
  frequency: Frequency
  daysOfWeek?: number[]
  periodInterval?: number
  reminderTime: string
  isReminderOn: boolean
  streak: number
  completedDates: string[]
  createdAt: string
}

export interface AppState {
  habits: Habit[]
  currentScreen: Screen
  selectedHabitId?: string
  onboarded: boolean
}
