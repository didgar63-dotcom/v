'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  PlayIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  description: string;
  estimatedTime: string;
}

export default function ProcessingPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId') || 'job-2025-001';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: 'upload',
      name: 'آپلود ویدئو',
      status: 'completed',
      progress: 100,
      description: 'فایل ویدئو با موفقیت آپلود شد',
      estimatedTime: 'تکمیل شده',
    },
    {
      id: 'audio-extraction',
      name: 'استخراج صدا',
      status: 'processing',
      progress: 65,
      description: 'در حال استخراج و پیش‌پردازش صدای ویدئو',
      estimatedTime: '~2 دقیقه',
    },
    {
      id: 'asr',
      name: 'تبدیل گفتار به متن',
      status: 'pending',
      progress: 0,
      description: 'تبدیل گفتار به متن با استفاده از مدل‌های ASR پیشرفته',
      estimatedTime: '~5 دقیقه',
    },
    {
      id: 'visual-analysis',
      name: 'تحلیل بصری',
      status: 'pending',
      progress: 0,
      description: 'استخراج فرمول‌ها، نمودارها و محتوای بصری',
      estimatedTime: '~8 دقیقه',
    },
    {
      id: 'fact-checking',
      name: 'اعتبارسنجی محتوا',
      status: 'pending',
      progress: 0,
      description: 'بررسی دقت محتوا با منابع علمی معتبر',
      estimatedTime: '~3 دقیقه',
    },
    {
      id: 'report-generation',
      name: 'تولید گزارش نهایی',
      status: 'pending',
      progress: 0,
      description: 'ایجاد گزارش جامع تحلیلی',
      estimatedTime: '~1 دقیقه',
    },
  ]);

  // Simulate processing progress
  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const currentProcessingStep = newSteps.find(step => step.status === 'processing');
        
        if (currentProcessingStep) {
          const stepIndex = newSteps.findIndex(step => step.id === currentProcessingStep.id);
          
          if (currentProcessingStep.progress < 100) {
            // Increase progress
            newSteps[stepIndex] = {
              ...currentProcessingStep,
              progress: Math.min(currentProcessingStep.progress + Math.random() * 15 + 5, 100),
            };
          } else {
            // Mark as completed and move to next step
            newSteps[stepIndex] = {
              ...currentProcessingStep,
              status: 'completed',
              progress: 100,
              estimatedTime: 'تکمیل شده',
            };
            
            // Start next step
            if (stepIndex < newSteps.length - 1) {
              newSteps[stepIndex + 1] = {
                ...newSteps[stepIndex + 1],
                status: 'processing',
              };
            }
          }
        }
        
        return newSteps;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'processing':
        return <ArrowPathIcon className="h-6 w-6 text-blue-500 animate-spin" />;
      case 'failed':
        return <ExclamationCircleIcon className="h-6 w-6 text-red-500" />;
      default:
        return <ClockIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'processing':
        return 'bg-blue-50 border-blue-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const isProcessingComplete = steps.every(step => step.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 persian-text">
            وضعیت پردازش ویدئو
          </h1>
          <p className="mt-2 text-gray-600 persian-text">
            شناسه پردازش: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{jobId}</span>
          </p>
        </div>

        {/* Progress Overview */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 persian-text">مراحل پردازش</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 persian-text">
                زمان تخمینی باقی‌مانده: 
                {isProcessingComplete ? 'تکمیل شده' : '~15 دقیقه'}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`border rounded-lg p-4 transition-all duration-300 ${
                  getStatusColor(step.status)
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {getStatusIcon(step.status)}
                    <span className="mr-3 font-medium text-gray-900 persian-text">
                      {step.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 persian-text">
                    {step.estimatedTime}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 persian-text mr-9">
                  {step.description}
                </p>
                
                {step.status === 'processing' && (
                  <div className="mr-9">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 persian-text">پیشرفت</span>
                      <span className="text-sm font-medium text-gray-900 persian-number">
                        {Math.round(step.progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${step.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {isProcessingComplete ? (
          <div className="card text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2 persian-text">
              پردازش با موفقیت تکمیل شد!
            </h3>
            <p className="text-gray-600 mb-6 persian-text">
              گزارش تحلیلی ویدئوی شما آماده است. می‌توانید نتایج را مشاهده و دانلود کنید.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-primary inline-flex items-center">
                <ChartBarIcon className="ml-2 h-5 w-5" />
                مشاهده گزارش کامل
              </button>
              <button className="btn-secondary inline-flex items-center">
                <DocumentTextIcon className="ml-2 h-5 w-5" />
                دانلود PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="card text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="loading-spinner"></div>
              <span className="mr-3 text-lg font-medium text-gray-900 persian-text">
                در حال پردازش...
              </span>
            </div>
            <p className="text-gray-600 persian-text">
              لطفاً صبر کنید. این فرآیند ممکن است چند دقیقه طول بکشد.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button className="btn-secondary inline-flex items-center">
                <PlayIcon className="ml-2 h-5 w-5" />
                مشاهده پیش‌نمایش
              </button>
              <button className="btn-secondary">
                دریافت اطلاعیه پایان
              </button>
            </div>
          </div>
        )}

        {/* Processing Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 persian-text">
            نکات مهم درباره پردازش
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 persian-text">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              زمان پردازش بسته به طول ویدئو و پیچیدگی محتوا متفاوت است
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              می‌توانید این صفحه را ببندید و بعداً با شناسه پردازش وضعیت را بررسی کنید
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              پس از تکمیل، ایمیل اطلاع‌رسانی برای شما ارسال خواهد شد
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              گزارش نهایی شامل تحلیل کامل، نمودارها و توصیه‌های بهبود است
            </li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}