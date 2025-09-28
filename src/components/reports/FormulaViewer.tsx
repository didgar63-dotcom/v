import { useState } from 'react';
import { AcademicCapIcon, EyeIcon, DownloadIcon, CopyIcon } from '@heroicons/react/24/outline';

interface Formula {
  id: string;
  latex: string;
  description: string;
  timestamp: number;
  confidence: number;
  context: string;
}

const mockFormulas: Formula[] = [
  {
    id: '1',
    latex: 'f\'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}',
    description: 'تعریف مشتق با استفاده از حد',
    timestamp: 85,
    confidence: 94,
    context: 'در این قسمت مدرس تعریف رسمی مشتق را ارائه می‌دهد',
  },
  {
    id: '2',
    latex: '\frac{d}{dx}[x^n] = nx^{n-1}',
    description: 'قانون توان برای مشتق‌گیری',
    timestamp: 156,
    confidence: 98,
    context: 'قانون کلی برای مشتق تابع توان‌دار',
  },
  {
    id: '3',
    latex: '\int x^n dx = \frac{x^{n+1}}{n+1} + C',
    description: 'انتگرال تابع توان‌دار',
    timestamp: 234,
    confidence: 91,
    context: 'فرمول انتگرال‌گیری برای تابع توان‌دار',
  },
  {
    id: '4',
    latex: 'e^{i\pi} + 1 = 0',
    description: 'هویت اویلر',
    timestamp: 312,
    confidence: 89,
    context: 'یکی از زیباترین فرمول‌های ریاضیات',
  },
];

export default function FormulaViewer() {
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = async (formula: Formula) => {
    try {
      await navigator.clipboard.writeText(formula.latex);
      setCopiedId(formula.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 persian-text">
          فرمول‌های استخراج‌شده
        </h3>
        <div className="text-sm text-gray-600 persian-text">
          {mockFormulas.length} فرمول شناسایی‌شده
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockFormulas.map((formula) => {
          const isSelected = selectedFormula?.id === formula.id;
          
          return (
            <div
              key={formula.id}
              onClick={() => setSelectedFormula(formula)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {/* Formula Display */}
              <div className="bg-white rounded-lg p-4 mb-3 text-center border">
                <div className="text-lg font-mono" dir="ltr">
                  {formula.latex}
                </div>
              </div>
              
              {/* Formula Info */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 persian-text">
                  {formula.description}
                </h4>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <AcademicCapIcon className="h-4 w-4 ml-1" />
                    <span className="persian-text">زمان: {formatTime(formula.timestamp)}</span>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    formula.confidence >= 90
                      ? 'bg-green-100 text-green-800'
                      : formula.confidence >= 80
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {formula.confidence}% دقت
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-3 flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(formula);
                  }}
                  className={`text-sm inline-flex items-center px-3 py-1 rounded transition-colors ${
                    copiedId === formula.id
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <CopyIcon className="ml-1 h-4 w-4" />
                  {copiedId === formula.id ? 'کپی شد!' : 'کپی LaTeX'}
                </button>
                
                <button className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center">
                  <EyeIcon className="ml-1 h-4 w-4" />
                  مشاهده در ویدئو
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Formula Details */}
      {selectedFormula && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 persian-text">
            جزئیات فرمول انتخاب‌شده
          </h3>
          
          <div className="space-y-4">
            {/* Large Formula Display */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-mono" dir="ltr">
                {selectedFormula.latex}
              </div>
            </div>
            
            {/* Formula Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 persian-text">توضیحات</h4>
                <p className="text-sm text-gray-600 persian-text">
                  {selectedFormula.description}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 persian-text">زمان در ویدئو</h4>
                <p className="text-sm text-gray-600 persian-number">
                  {formatTime(selectedFormula.timestamp)}
                </p>
                <p className="text-xs text-gray-500 persian-text mt-1">
                  زمان ظاهر شدن در ویدئو
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 persian-text">دقت تشخیص</h4>
                <p className="text-sm text-gray-600 persian-number">
                  {selectedFormula.confidence}%
                </p>
                <p className="text-xs text-gray-500 persian-text mt-1">
                  اعتماد به نفس AI در تشخیص
                </p>
              </div>
            </div>
            
            {/* Context */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2 persian-text">
                زمینه و توضیحات
              </h4>
              <p className="text-sm text-gray-600 persian-text leading-relaxed">
                {selectedFormula.context}
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-4 pt-4 border-t">
              <button className="btn-primary inline-flex items-center">
                <EyeIcon className="ml-2 h-4 w-4" />
                مشاهده در ویدئو
              </button>
              
              <button
                onClick={() => copyToClipboard(selectedFormula)}
                className={`btn-secondary inline-flex items-center ${
                  copiedId === selectedFormula.id ? 'bg-green-100 text-green-800' : ''
                }`}
              >
                <CopyIcon className="ml-2 h-4 w-4" />
                {copiedId === selectedFormula.id ? 'کپی شد!' : 'کپی LaTeX'}
              </button>
              
              <button className="btn-secondary inline-flex items-center">
                <DownloadIcon className="ml-2 h-4 w-4" />
                دانلود تصویر
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}