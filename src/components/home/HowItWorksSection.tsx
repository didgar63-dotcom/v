'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpTrayIcon,
  Cog6ToothIcon,
  ChartPieIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    id: 1,
    name: 'آپلود ویدئو',
    description: 'ویدئوی آموزشی خود را از طریق drag-and-drop یا لینک LMS آپلود کنید',
    icon: ArrowUpTrayIcon,
    iconForeground: 'text-blue-700',
    iconBackground: 'bg-blue-50',
  },
  {
    id: 2,
    name: 'پردازش هوشمند',
    description: 'سیستم به‌صورت خودکار ویدئو را تحلیل کرده و اجزای مختلف را استخراج می‌کند',
    icon: Cog6ToothIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    id: 3,
    name: 'اعتبارسنجی',
    description: 'محتوای استخراج‌شده با منابع علمی معتبر مقایسه و اعتبارسنجی می‌شود',
    icon: DocumentCheckIcon,
    iconForeground: 'text-green-700',
    iconBackground: 'bg-green-50',
  },
  {
    id: 4,
    name: 'دریافت گزارش',
    description: 'گزارش جامع تحلیلی با نمودارها و توصیه‌های بهبود دریافت کنید',
    icon: ChartPieIcon,
    iconForeground: 'text-orange-700',
    iconBackground: 'bg-orange-50',
  },
];

export default function HowItWorksSection() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            فرآیند کار
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl persian-text">
            چگونه ویدئوهای شما را تحلیل می‌کنیم؟
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 persian-text">
            فرآیند ساده و کارآمد که در چهار مرحله اصلی ویدئوهای آموزشی شما را به دقت تحلیل می‌کند
          </p>
        </div>
        
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 divide-y divide-gray-200">
            {steps.map((step, stepIdx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: stepIdx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: stepIdx * 0.1 }}
                className="relative flex flex-col lg:flex-row items-center gap-x-8 gap-y-4 py-8"
              >
                <div className={`flex items-center justify-center ${step.iconBackground} rounded-full p-4`}>
                  <step.icon className={`h-8 w-8 ${step.iconForeground}`} aria-hidden="true" />
                </div>
                
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900 persian-text">
                    <span className="absolute inset-0" aria-hidden="true" />
                    مرحله {step.id}: {step.name}
                  </h3>
                  <p className="text-base leading-7 text-gray-600 persian-text">
                    {step.description}
                  </p>
                </div>
                
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute left-1/2 top-full hidden lg:block -translate-x-1/2">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}