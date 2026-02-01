import React from 'react'
import { Bell, Globe, Clock, Crown, ChevronRight, LogOut, ShieldCheck, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export const Settings: React.FC = () => {
  return (
    <div className="pb-32 pt-12 px-8 max-w-lg mx-auto min-h-screen bg-white">
      <header className="mb-12">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
          ВАШ АККАУНТ
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">Настройки</h1>
      </header>

      <motion.div
        whileHover={{ y: -2 }}
        className="bg-slate-900 p-8 rounded-[2rem] text-white mb-12 relative overflow-hidden shadow-2xl shadow-slate-900/10"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Crown size={20} className="text-[#2DD4BF]" strokeWidth={2.5} />
            <span className="font-bold text-lg tracking-tight uppercase">HABIT FLOW PRO</span>
          </div>
          <p className="text-slate-400 text-sm font-light leading-relaxed mb-8 max-w-[200px]">
            Безлимит, аналитика и экспорт данных в CSV.
          </p>
          <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-xs tracking-widest uppercase active:scale-95 transition-transform">
            АКТИВИРОВАТЬ
          </button>
        </div>
      </motion.div>

      <div className="space-y-10">
        <section>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-6">
            ОСНОВНЫЕ
          </h3>
          <div className="space-y-1">
            <SettingItem icon={User} label="Профиль" value="Иван И." />
            <SettingItem icon={Bell} label="Уведомления" value="ВКЛ." />
            <SettingItem icon={Globe} label="Язык" value="RU" />
          </div>
        </section>
        <section>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-6">
            СИСТЕМА
          </h3>
          <div className="space-y-1">
            <SettingItem icon={ShieldCheck} label="Конфиденциальность" />
            <SettingItem icon={Clock} label="Архив" />
            <SettingItem icon={LogOut} label="Выход" color="text-red-400" />
          </div>
        </section>
      </div>

      <div className="mt-20 text-center">
        <p className="text-slate-200 text-[10px] font-bold tracking-[0.3em] uppercase">
          VERSION 1.0.4
        </p>
      </div>
    </div>
  )
}

interface SettingItemProps {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  label: string
  value?: string
  color?: string
}

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, label, value, color }) => (
  <button className="w-full flex items-center justify-between py-5 px-4 rounded-2xl hover:bg-slate-50 transition-colors group">
    <div className="flex items-center gap-5">
      <div className={cn('w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors', color)}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <span className={cn('font-medium text-slate-700 group-hover:text-slate-900 transition-colors', color)}>
        {label}
      </span>
    </div>
    <div className="flex items-center gap-2">
      {value && (
        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{value}</span>
      )}
      <ChevronRight size={14} className="text-slate-100 group-hover:text-slate-300 transition-colors" />
    </div>
  </button>
)
