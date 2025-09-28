'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const processingTrendData = [
  { date: '2024-01-01', videos: 12, accuracy: 91 },
  { date: '2024-01-02', videos: 15, accuracy: 93 },
  { date: '2024-01-03', videos: 8, accuracy: 89 },
  { date: '2024-01-04', videos: 18, accuracy: 94 },
  { date: '2024-01-05', videos: 22, accuracy: 92 },
  { date: '2024-01-06', videos: 14, accuracy: 90 },
  { date: '2024-01-07', videos: 19, accuracy: 95 },
];

const subjectDistribution = [
  { name: 'ریاضیات', value: 35, color: '#3b82f6' },
  { name: 'فیزیک', value: 25, color: '#10b981' },
  { name: 'شیمی', value: 20, color: '#f59e0b' },
  { name: 'زیست', value: 15, color: '#8b5cf6' },
  { name: 'سایر', value: 5, color: '#6b7280' },
];

const recentVideos = [
  {
    id: '1',
    title: 'مشتق و کاربردهای آن',
    instructor: 'دکتر احمدی',
    status: 'completed',
    accuracy: 94,
    date: '2024-01-07',
    duration: '45:32',
  },
  {
    id: '2',
    title: 'قوانین نیوتن',
    instructor: 'دکتر رحیمی',
    status: 'processing',
    accuracy: 0,
    date: '2024-01-07',
    duration: '52:18',
  },
  {
    id: '3',
    title: 'واکنش‌های شیمیایی',
    instructor: 'دکتر کریمی',
    status: 'completed',
    accuracy: 89,
    date: '2024-01-06',
    duration: '38:45',
  },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      name: 'ویدئوهای تحلیل‌شده',
      value: '۱۲۵',
      change: '+12%',
      changeType: 'increase',
      icon: DocumentTextIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'میانگین دقت',
      value: '۹۲٪',
      change: '+3%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'مدت زمان پردازش',
      value: '۳.۲ دقیقه',
      change: '-15%',
      changeType: 'decrease',
      icon: ClockIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'مؤسسات فعال',
      value: '۱۸',
      change: '+2',
      changeType: 'increase',
      icon: UserIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

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
        return 'خطا';
      default:
        return 'نامشخص';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 persian-text">داشبورد تحلیلی</h1>
              <p className="mt-2 text-gray-600 persian-text">
                مرور کلی بر عملکرد پلتفرم و آمار ویدئوهای تحلیل‌شده
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field text-sm"
              >
                <option value="24h">۲۴ ساعت گذشته</option>
                <option value="7d">۷ روز گذشته</option>
                <option value="30d">۳۰ روز گذشته</option>
                <option value="90d">۹۰ روز گذشته</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const ChangeIcon = stat.changeType === 'increase' ? TrendingUpIcon : TrendingDownIcon;
            
            return (
              <div key={index} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 persian-text">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1 persian-number">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <ChangeIcon className={`h-4 w-4 ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'} ml-1`} />
                      <span className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'} persian-text`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 mr-1 persian-text">نسبت به دوره قبل</span>
                    </div>
                  </div>
                  
                  <div className={`${stat.bgColor} ${stat.color} rounded-lg p-3`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Processing Trend */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 persian-text">
                روند پردازش و دقت
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full ml-2"></div>
                  <span className="text-sm text-gray-600 persian-text">تعداد ویدئوها</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full ml-2"></div>
                  <span className="text-sm text-gray-600 persian-text">دقت (%)</span>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processingTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'videos' ? `${value} ویدئو` : `${value}%`,
                      name === 'videos' ? 'تعداد ویدئوها' : 'دقت'
                    ]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('fa-IR')}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="videos"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 persian-text">
              توزیع موضوعات
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'درصد']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {subjectDistribution.map((subject, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full ml-2"
                      style={{ backgroundColor: subject.color }}
                    ></div>
                    <span className="text-sm text-gray-700 persian-text">{subject.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 persian-number">
                    {subject.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Videos and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Videos */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 persian-text">
                ویدئوهای اخیر
              </h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 persian-text">
                مشاهده همه
              </button>
            </div>
            
            <div className="space-y-4">
              {recentVideos.map((video) => (
                <div
                  key={video.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1 persian-text">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-600 persian-text mb-2">
                        {video.instructor} • {video.duration}
                      </p>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(video.status)}`}>
                          {getStatusText(video.status)}
                        </span>
                        
                        {video.accuracy > 0 && (
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                              <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${video.accuracy}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 persian-number">
                              {video.accuracy}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="text-xs text-primary-600 hover:text-primary-700">
                        مشاهده
                      </button>
                      <button className="text-xs text-gray-600 hover:text-gray-700">
                        دانلود
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 persian-text">
              هشدارها و اعلان‌ها
            </h3>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 ml-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 persian-text">
                      سرور پردازش در حال بارگذاری بالا
                    </h4>
                    <p className="text-xs text-yellow-700 persian-text mt-1">
                      زمان پردازش ممکن است افزایش یابد. زمان تخمینی: ۸-۱۰ دقیقه
                    </p>
                    <span className="text-xs text-yellow-600 persian-text">۲ دقیقه پیش</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AcademicCapIcon className="h-5 w-5 text-blue-600 mt-0.5 ml-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 persian-text">
                      به‌روزرسانی مدل ASR
                    </h4>
                    <p className="text-xs text-blue-700 persian-text mt-1">
                      نسخه جدید مدل تشخیص گفتار با دقت ۹۵٪ منتشر شد
                    </p>
                    <span className="text-xs text-blue-600 persian-text">۱ ساعت پیش</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ChartBarIcon className="h-5 w-5 text-green-600 mt-0.5 ml-3" />
                  <div>
                    <h4 className="text-sm font-medium text-green-800 persian-text">
                  رکورد جدید در پردازش
                    </h4>
                    <p className="text-xs text-green-700 persian-text mt-1">
                      ۲۲ ویدئو در یک روز با میانگین دقت ۹۴٪ پردازش شد
                    </p>
                    <span className="text-xs text-green-600 persian-text">۳ ساعت پیش</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start">
                  <UserIcon className="h-5 w-5 text-purple-600 mt-0.5 ml-3" />
                  <div>
                    <h4 className="text-sm font-medium text-purple-800 persian-text">
                      مؤسسه آموزشی جدید
                    </h4>
                    <p className="text-xs text-purple-700 persian-text mt-1">
                      دانشگاه صنعتی امیرکبیر به پلتفرم ملحق شد
                    </p>
                    <span className="text-xs text-purple-600 persian-text">۵ ساعت پیش</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}