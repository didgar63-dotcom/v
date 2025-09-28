'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

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
                <PlayIcon className="ml-2 h-5 w-5" />
                مشاهده دمو
              </button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 persian-number">۱۰۰۰+</div>
                <div className="text-sm text-gray-600 persian-text">ویدئو تحلیل‌شده</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 persian-number">۹۵٪</div>
                <div className="text-sm text-gray-600 persian-text">دقت تحلیل</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 persian-number">۵۰+</div>
                <div className="text-sm text-gray-600 persian-text">مؤسسه آموزشی</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-lg">
              {/* Main Dashboard Mockup */}
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
                  {/* Video Player Mockup */}
                  <div className="mb-4 rounded-lg bg-gray-900 aspect-video flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <PlayIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-sm">ویدئو در حال پخش</div>
                    </div>
                  </div>
                  
                  {/* Analysis Results */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">دقت گفتار:</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                        </div>
                        <span className="text-sm font-medium">۹۲٪</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">کیفیت محتوا:</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '88%'}}></div>
                        </div>
                        <span className="text-sm font-medium">۸۸٪</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">اعتبار علمی:</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '95%'}}></div>
                        </div>
                        <span className="text-sm font-medium">۹۵٪</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
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

// Import PlayIcon for the hero section
import { PlayIcon } from '@heroicons/react/24/solid';