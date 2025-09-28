'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon, PlayIcon as PlayOutlineIcon } from '@heroicons/react/24/outline';
import { PlayIcon as PlaySolidIcon } from '@heroicons/react/24/solid';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-sky-50 via-white to-primary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 persian-text">
              تحلیل هوشمند
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-sky-600">
                ویدئوهای آموزشی
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed persian-text">
              سامانهٔ مولتی‌مدال تحلیل و اعتبارسنجی ویدئوهای آموزشی که به‌صورت خودکار محتوا را آنالیز کرده و گزارش‌های علمی، تعاملی و گواهی‌پذیر تولید می‌کند.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/upload" className="btn-primary inline-flex items-center justify-center px-8 py-3 text-lg">
                شروع تحلیل ویدئو
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              
              <button className="btn-secondary inline-flex items-center justify-center px-8 py-3 text-lg">
                <PlayOutlineIcon className="ml-2 h-5 w-5" />
                مشاهده دمو
              </button>
            </div>
            
            {/* ... بقیه JSX بدون تغییر ... */}
          </motion.div>
          
          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-sky-600 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm font-medium">پلتفرم تحلیل ویدئو</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4 rounded-lg bg-gray-900 aspect-video flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <PlaySolidIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-sm">ویدئو در حال پخش</div>
                    </div>
                  </div>
                  {/* ... بقیه JSX ... */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20">
          <path
            fill="#f8fafc"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
