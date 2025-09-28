'use client';

import { useState } from 'react';
import {
  DocumentTextIcon,
  ChartBarIcon,
  PlayIcon,
  DownloadIcon,
  ShareIcon,
  EyeIcon,
  CalendarIcon,
  UserIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoPlayer from '@/components/reports/VideoPlayer';
import AnalysisTimeline from '@/components/reports/AnalysisTimeline';
import ReportMetrics from '@/components/reports/ReportMetrics';
import FormulaViewer from '@/components/reports/FormulaViewer';

interface Report {
  id: string;
  title: string;
  instructor: string;
  date: string;
  duration: string;
  status: 'completed' | 'processing' | 'failed';
  metrics: {
    accuracy: number;
    clarity: number;
    engagement: number;
    overall: number;
  };
  thumbnail: string;
}

const mockReports: Report[] = [
  {
    id: 'report-001',
    title: 'محاسبات دیفرانسیل - جلسه ۱: مفهوم مشتق',
    instructor: 'دکتر محمد احمدی',
    date: '2024-01-15',
    duration: '45:32',
    status: 'completed',
    metrics: {
      accuracy: 92,
      clarity: 88,
      engagement: 85,
      overall: 89,
    },
    thumbnail: '/api/placeholder/320/180',
  },
  {
    id: 'report-002',
    title: 'فیزیک کوانتوم - مقدمه‌ای بر مکانیک کوانتومی',
    instructor: 'دکتر سارا رحیمی',
    date: '2024-01-12',
    duration: '52:18',
    status: 'completed',
    metrics: {
      accuracy: 95,
      clarity: 91,
      engagement: 89,
      overall: 92,
    },
    thumbnail: '/api/placeholder/320/180',
  },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(mockReports[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'formulas' | 'export'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'تکمیل شده';
      case 'processing':
        return 'در حال پردازش';
      case 'failed':
        return 'خطا در پردازش';
      default:
        return 'نامشخص';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 persian-text">گزارش‌های تحلیلی</h1>
          <p className="mt-2 text-gray-600 persian-text">
            مشاهده و مدیریت گزارش‌های تحلیل ویدئوهای آموزشی شما
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Reports List */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 persian-text">
                ویدئوهای تحلیل‌شده
              </h2>
              
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                      selectedReport?.id === report.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-video bg-gray-200 rounded mb-3 overflow-hidden">
                      <img
                        src={report.thumbnail}
                        alt={report.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h3 className="font-medium text-gray-900 text-sm mb-2 persian-text line-clamp-2">
                      {report.title}
                    </h3>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <UserIcon className="h-3 w-3 ml-1" />
                      <span className="persian-text">{report.instructor}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-3 w-3 ml-1" />
                        <span className="persian-text">{report.date}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Details */}
          <div className="lg:col-span-3">
            {selectedReport ? (
              <div className="space-y-6">
                {/* Report Header */}
                <div className="card">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 persian-text">
                        {selectedReport.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 ml-1" />
                          <span className="persian-text">{selectedReport.instructor}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 ml-1" />
                          <span className="persian-text">{selectedReport.date}</span>
                        </div>
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-4 w-4 ml-1" />
                          <span className="persian-text">{selectedReport.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="btn-secondary inline-flex items-center px-3 py-2 text-sm">
                        <ShareIcon className="ml-2 h-4 w-4" />
                        اشتراک‌گذاری
                      </button>
                      <button className="btn-primary inline-flex items-center px-3 py-2 text-sm">
                        <DownloadIcon className="ml-2 h-4 w-4" />
                        دانلود PDF
                      </button>
                    </div>
                  </div>
                  
                  {/* Video Player */}
                  <div className="mb-6">
                    <VideoPlayer />
                  </div>
                  
                  {/* Overall Score */}
                  <div className="bg-gradient-to-r from-primary-50 to-sky-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 persian-text">
                          امتیاز کلی تحلیل
                        </h3>
                        <p className="text-sm text-gray-600 persian-text">
                          بر اساس دقت علمی، وضوح ارائه و میزان تعامل
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary-600 persian-number">
                          {selectedReport.metrics.overall}
                        </div>
                        <div className="text-sm text-gray-600 persian-text">از ۱۰۰</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="card">
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                      {[
                        { id: 'overview', name: 'مرور کلی', icon: ChartBarIcon },
                        { id: 'timeline', name: 'تایم‌لاین', icon: DocumentTextIcon },
                        { id: 'formulas', name: 'فرمول‌ها', icon: AcademicCapIcon },
                        { id: 'export', name: 'خروجی', icon: DownloadIcon },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === tab.id
                              ? 'border-primary-500 text-primary-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <tab.icon className="ml-2 h-4 w-4" />
                          <span className="persian-text">{tab.name}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <ReportMetrics metrics={selectedReport.metrics} />
                  )}
                  
                  {activeTab === 'timeline' && (
                    <AnalysisTimeline />
                  )}
                  
                  {activeTab === 'formulas' && (
                    <FormulaViewer />
                  )}
                  
                  {activeTab === 'export' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 persian-text">
                        خروجی‌های قابل دانلود
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <DocumentTextIcon className="h-6 w-6 text-blue-600 ml-2" />
                            <h4 className="font-medium text-gray-900 persian-text">گزارش PDF</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 persian-text">
                            گزارش جامع تحلیلی با تمام جزئیات، نمودارها و توصیه‌ها
                          </p>
                          <button className="btn-secondary w-full inline-flex items-center justify-center">
                            <DownloadIcon className="ml-2 h-4 w-4" />
                            دانلود PDF
                          </button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <ChartBarIcon className="h-6 w-6 text-green-600 ml-2" />
                            <h4 className="font-medium text-gray-900 persian-text">داده‌های خام</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 persian-text">
                            داده‌های تحلیلی در قالب JSON برای پردازش‌های بعدی
                          </p>
                          <button className="btn-secondary w-full inline-flex items-center justify-center">
                            <DownloadIcon className="ml-2 h-4 w-4" />
                            دانلود JSON
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <EyeIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 persian-text">
                  ویدئویی انتخاب نشده
                </h3>
                <p className="text-gray-600 persian-text">
                  لطفاً از لیست سمت راست یک ویدئو را انتخاب کنید تا گزارش آن را مشاهده کنید.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}