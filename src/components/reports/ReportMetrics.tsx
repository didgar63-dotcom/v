import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface ReportMetricsProps {
  metrics: {
    accuracy: number;
    clarity: number;
    engagement: number;
    overall: number;
  };
}

export default function ReportMetrics({ metrics }: ReportMetricsProps) {
  // Radar chart data
  const radarData = [
    { subject: 'دقت علمی', score: metrics.accuracy, fullMark: 100 },
    { subject: 'وضوح ارائه', score: metrics.clarity, fullMark: 100 },
    { subject: 'تعامل', score: metrics.engagement, fullMark: 100 },
    { subject: 'ساختار', score: 85, fullMark: 100 },
    { subject: 'پوشش محتوا', score: 90, fullMark: 100 },
  ];

  // Bar chart data for different aspects
  const barData = [
    { name: 'دقت فرمول‌ها', score: 92 },
    { name: 'وضوح توضیحات', score: 88 },
    { name: 'سرعت گفتار', score: 85 },
    { name: 'استفاده از مثال', score: 90 },
    { name: 'ساختار منطقی', score: 87 },
  ];

  const insights = [
    {
      type: 'success',
      icon: CheckCircleIcon,
      title: 'دقت علمی بالا',
      description: 'فرمول‌ها و محتوای علمی با ۹۲٪ دقت استخراج و اعتبارسنجی شده‌اند.',
    },
    {
      type: 'warning',
      icon: ExclamationTriangleIcon,
      title: 'سرعت گفتار مناسب',
      description: 'سرعت گفتار کمی سریع است. توصیه می‌شود برای درک بهتر، کندتر صحبت کنید.',
    },
    {
      type: 'info',
      icon: InformationCircleIcon,
      title: 'ساختار منسجم',
      description: 'محتوا به خوبی ساختاربندی شده و منطق ارائه قوی است.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overall Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 persian-text">دقت علمی</p>
              <p className="text-3xl font-bold text-green-900 persian-number">{metrics.accuracy}%</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 persian-text">وضوح ارائه</p>
              <p className="text-3xl font-bold text-blue-900 persian-number">{metrics.clarity}%</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800 persian-text">تعامل</p>
              <p className="text-3xl font-bold text-purple-900 persian-number">{metrics.engagement}%</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-800 persian-text">امتیاز کلی</p>
              <p className="text-3xl font-bold text-orange-900 persian-number">{metrics.overall}%</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 persian-text">
            تحلیل جامع عملکرد
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" className="text-sm persian-text" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                <Radar
                  name="امتیاز"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 persian-text">
            جزئیات عملکرد
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} className="text-xs" />
                <YAxis dataKey="name" type="category" width={100} className="text-xs persian-text" />
                <Tooltip formatter={(value) => [`${value}%`, 'امتیاز']} />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 persian-text">
          بینش‌ها و توصیه‌ها
        </h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon;
            let bgColor, borderColor, textColor;
            
            switch (insight.type) {
              case 'success':
                bgColor = 'bg-green-50';
                borderColor = 'border-green-200';
                textColor = 'text-green-800';
                break;
              case 'warning':
                bgColor = 'bg-yellow-50';
                borderColor = 'border-yellow-200';
                textColor = 'text-yellow-800';
                break;
              default:
                bgColor = 'bg-blue-50';
                borderColor = 'border-blue-200';
                textColor = 'text-blue-800';
            }
            
            return (
              <div
                key={index}
                className={`${bgColor} ${borderColor} border rounded-lg p-4`}
              >
                <div className="flex items-start">
                  <IconComponent className={`h-5 w-5 ${textColor} mt-0.5 ml-3 flex-shrink-0`} />
                  <div>
                    <h4 className={`font-medium ${textColor} persian-text mb-1`}>
                      {insight.title}
                    </h4>
                    <p className={`text-sm ${textColor} persian-text`}>
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}