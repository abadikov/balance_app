import React from 'react'
import { Sparkles, Quote, Target, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

const MOTIVATIONS = [
  { quote: 'Дисциплина — это свобода.', author: 'ДЖОКО ВИЛЛИНК' },
  { quote: 'Успех — это сумма маленьких усилий.', author: 'РОБЕРТ КОЛЬЕР' },
  { quote: 'Делайте сегодня то, что другие не хотят.', author: 'ДЖЕРРИ РАЙС' },
]

export const Motivation: React.FC = () => {
  const randomMotivation = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]

  return (
    <div className="pb-32 pt-12 px-8 max-w-lg mx-auto min-h-screen bg-white">
      <header className="mb-16">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
          ДЛЯ ВАС
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight flex items-center gap-3">
          Инсайты <Sparkles className="text-[#2DD4BF]" size={28} strokeWidth={1.5} />
        </h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 mb-12 relative overflow-hidden"
      >
        <Quote size={40} className="absolute -top-4 -left-4 text-slate-100 rotate-12" />
        <p className="text-2xl font-normal text-slate-900 leading-[1.4] mb-10 italic tracking-tight">
          «{randomMotivation.quote}»
        </p>
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-slate-200" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            {randomMotivation.author}
          </span>
        </div>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4 mb-6">
          ВАША АКТИВНОСТЬ
        </h3>
        <div className="group bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between hover:border-slate-200 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
              <Target size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Фокус недели</p>
              <p className="text-xs text-slate-400">Выполнили 85% задач</p>
            </div>
          </div>
          <ArrowUpRight size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
        </div>
        <div className="group bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between hover:border-slate-200 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
              <Sparkles size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Новый уровень</p>
              <p className="text-xs text-slate-400">Еще 2 дня до новой медали</p>
            </div>
          </div>
          <ArrowUpRight size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
        </div>
      </div>
    </div>
  )
}
