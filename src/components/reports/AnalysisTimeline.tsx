import { useState } from 'react';
import {
  PlayIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface TimelineSegment {
  id: string;
  startTime: number;
  endTime: number;
  type: 'formula' | 'concept' | 'example' | 'warning';
  title: string;
  description: string;
  confidence: number;
}

const mockSegments: TimelineSegment[] = [
  {
    id: '1',
    startTime: 0,
    endTime: 45,
    type: 'concept',
    title: 'معرفی مفهوم مشتق',
    description: 'تعریف اولیه مشتق و کاربردهای آن',
    confidence: 95,
  },
  {
    id: '2',
    startTime: 45,
    endTime: 120,
    type: 'formula',
    title: 'فرمول مشتق',
    description: 'f\'(x) = lim(h→0) [f(x+h) - f(x)]/h',
    confidence: 92,
  },
  {
    id: '3',
    startTime: 120,
    endTime: 180,
    type: 'example',
    title: 'مثال عملی',
    description: 'محاسبه مشتق تابع f(x) = x²',
    confidence: 88,
  },
  {
    id: '4',
    startTime: 180,
    endTime: 240,
    type: 'warning',
    title: 'نکته مهم',
    description: 'توجه به شرایط وجود مشتق',
    confidence: 90,
  },
];

export default function AnalysisTimeline() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const getSegmentIcon = (type: string) => {
    switch (type) {
      case 'formula':
        return AcademicCapIcon;
      case 'concept':
        return DocumentTextIcon;
      case 'example':
        return PlayIcon;
      case 'warning':
        return ExclamationCircleIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const getSegmentColor = (type: string) => {
    switch (type) {
      case 'formula':
        return 'bg-purple-100 border-purple-200 text-purple-800';
      case 'concept':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'example':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSegmentClick = (segment: TimelineSegment) => {
    setSelectedSegment(segment.id);
    setCurrentTime(segment.startTime);
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 persian-text">
          تایم‌لاین تحلیلی
        </h3>
        <div className="text-sm text-gray-600 persian-text">
          {mockSegments.length} بخش تحلیل‌شده
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="relative">
        <div className="bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / 240) * 100}%` }}
          ></div>
        </div>
        
        {/* Timeline Segments */}
        <div className="relative">
          {mockSegments.map((segment, index) => {
            const IconComponent = getSegmentIcon(segment.type);
            const isSelected = selectedSegment === segment.id;
            
            return (
              <div
                key={segment.id}
                className={`absolute flex flex-col items-center cursor-pointer transition-all duration-200 ${
                  isSelected ? 'scale-110' : 'hover:scale-105'
                }`}
                style={{
                  left: `${(segment.startTime / 240) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
                onClick={() => handleSegmentClick(segment)}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 ${getSegmentColor(segment.type)} ${
                    isSelected ? 'ring-4 ring-primary-200' : ''
                  }`}
                ></div>
                
                <div className="mt-2 text-xs text-gray-600 font-mono persian-number">
                  {formatTime(segment.startTime)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Segments List */}
      <div className="space-y-3">
        {mockSegments.map((segment) => {
          const IconComponent = getSegmentIcon(segment.type);
          const isSelected = selectedSegment === segment.id;
          
          return (
            <div
              key={segment.id}
              onClick={() => handleSegmentClick(segment)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-1">
                  <div className={`p-2 rounded-lg ${getSegmentColor(segment.type)} mr-3`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 persian-text">
                        {segment.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 font-mono persian-number">
                          {formatTime(segment.startTime)} - {formatTime(segment.endTime)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          segment.confidence >= 90
                            ? 'bg-green-100 text-green-800'
                            : segment.confidence >= 80
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {segment.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 persian-text mb-2">
                      {segment.description}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <button className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center">
                        <PlayIcon className="ml-1 h-4 w-4" />
                        پخش این بخش
                      </button>
                      
                      {segment.type === 'formula' && (
                        <button className="text-sm text-purple-600 hover:text-purple-700 inline-flex items-center">
                          مشاهده فرمول
                        </button>
                      )}
                      
                      <button className="text-sm text-gray-600 hover:text-gray-700 inline-flex items-center">
                        ویرایش
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Segment Details */}
      {selectedSegment && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 persian-text">
            جزئیات بخش انتخاب‌شده
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 persian-text">زمان‌بندی</h4>
                <p className="text-sm text-gray-600 persian-number">
                  از {formatTime(mockSegments.find(s => s.id === selectedSegment)?.startTime || 0)} تا 
                  {formatTime(mockSegments.find(s => s.id === selectedSegment)?.endTime || 0)}
                </p>
                <p className="text-xs text-gray-500 persian-text mt-1">
                  مدت: {formatTime((mockSegments.find(s => s.id === selectedSegment)?.endTime || 0) - 
                  (mockSegments.find(s => s.id === selectedSegment)?.startTime || 0))}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 persian-text">اعتماد به نفس</h4>
                <p className="text-sm text-gray-600 persian-number">
                  {mockSegments.find(s => s.id === selectedSegment)?.confidence}%
                </p>
                <p className="text-xs text-gray-500 persian-text mt-1">
                  دقت تشخیص AI
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 persian-text">نوع محتوا</h4>
                <p className="text-sm text-gray-600 persian-text">
                  {mockSegments.find(s => s.id === selectedSegment)?.type === 'formula' && 'فرمول ریاضی'}
                  {mockSegments.find(s => s.id === selectedSegment)?.type === 'concept' && 'مفهوم آموزشی'}
                  {mockSegments.find(s => s.id === selectedSegment)?.type === 'example' && 'مثال کاربردی'}
                  {mockSegments.find(s => s.id === selectedSegment)?.type === 'warning' && 'نکته مهم'}
                </p>
                <p className="text-xs text-gray-500 persian-text mt-1">
                  دسته‌بندی خودکار
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2 persian-text">
                محتوای استخراج‌شده
              </h4>
              <p className="text-sm text-gray-600 persian-text leading-relaxed">
                {mockSegments.find(s => s.id === selectedSegment)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}