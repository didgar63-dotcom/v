'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-sky-700">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl persian-text"
          >
            آماده‌اید ویدئوهای آموزشی خود را تحلیل کنید؟
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100 persian-text"
          >
            همین حالا شروع کنید و از مزایای تحلیل هوشمند ویدئوهای آموزشی بهره‌مند شوید
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="/upload"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold leading-7 text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200"
            >
              شروع رایگان
            </Link>
            <Link href="/dashboard" className="text-base font-semibold leading-7 text-white">
              مشاهده داشبورد <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}