'use client';

import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  LanguageIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'تحلیل هوشمند محتوا',
    description: 'استخراج خودکار فرمول‌ها، متن‌ها و اجزای بصری با استفاده از OCR و بینایی ماشین پیشرفته',
    icon: DocumentTextIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'اعتبارسنجی علمی',
    description: 'بررسی دقت محتوای آموزشی و مقایسه با منابع علنی معتبر با استفاده از RAG و LLM',
    icon: ShieldCheckIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    name: 'گزارش‌های تعاملی',
    description: 'ایجاد گزارش‌های جامع با تایم‌لاین تعاملی، نمودارهای تحلیلی و خروجی PDF/JSON',
    icon: ChartBarIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'پردازش سریع',
    description: 'تحلیل ویدئوها در کمترین زمان ممکن با استفاده از زیرساخت ابری مقیاس‌پذیر',
    icon: ClockIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    name: 'پشتیبانی چندزبانه',
    description: 'پشتیبانی کامل از زبان فارسی و سایر زبان‌ها با مدل‌های ASR و NLP بومی',
    icon: LanguageIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    name: 'بررسی انسانی',
    description: 'سیستم human-in-the-loop برای تصحیح و بهبود نتایج با رابط کاربری ساده',
    icon: UsersIcon,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
];

export default function FeaturesSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            ویژگی‌های پیشرفته
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl persian-text">
            همه چیز برای تحلیل دقیق ویدئوهای آموزشی
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 persian-text">
            با استفاده از جدیدترین تکنولوژی‌های هوش مصنوعی، ویدئوهای آموزشی شما را به دقت تحلیل کرده و گزارش‌های جامع ارائه می‌دهیم
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className={`${feature.bgColor} ${feature.color} rounded-lg p-2`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="persian-text">{feature.name}</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto persian-text">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}