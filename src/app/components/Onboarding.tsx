import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Circle } from 'lucide-react'

interface OnboardingProps {
  onComplete: () => void
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-8 pb-12 overflow-hidden">
      <div className="flex-1 flex flex-col items-start justify-center pt-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 mb-6">
            <Circle className="text-[#2DD4BF]" size={24} strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Habit <br /> Flow
          </h1>
          <p className="text-slate-400 text-xl font-normal leading-relaxed max-w-[260px]">
            Строгий трекер ваших привычек. <br />
            Ничего лишнего.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 w-full"
        >
          <div className="flex items-center gap-4 py-3 border-b border-slate-50">
            <span className="text-slate-300 text-sm font-mono">01</span>
            <span className="text-slate-600 text-sm">Создавайте привычки</span>
          </div>
          <div className="flex items-center gap-4 py-3 border-b border-slate-50">
            <span className="text-slate-300 text-sm font-mono">02</span>
            <span className="text-slate-600 text-sm">Отслеживайте прогресс</span>
          </div>
          <div className="flex items-center gap-4 py-3 border-b border-slate-50">
            <span className="text-slate-300 text-sm font-mono">03</span>
            <span className="text-slate-600 text-sm">Становитесь лучше</span>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onComplete}
        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-medium text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
      >
        Начать
        <ArrowRight size={20} strokeWidth={1.5} />
      </motion.button>
    </div>
  )
}
