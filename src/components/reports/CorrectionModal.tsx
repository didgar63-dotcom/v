'use client';

import { useState } from 'react';
import { XMarkIcon, CheckIcon, PencilIcon } from '@heroicons/react/24/outline';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  segment: {
    id: string;
    originalText: string;
    timestamp: number;
    type: 'text' | 'formula';
  };
  onSave: (correction: { id: string; correctedText: string; notes: string }) => void;
}

export default function CorrectionModal({
  isOpen,
  onClose,
  segment,
  onSave,
}: CorrectionModalProps) {
  const [correctedText, setCorrectedText] = useState(segment.originalText);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      id: segment.id,
      correctedText,
      notes,
    });
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 persian-text">
            تصحیح محتوا
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Video Preview */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900 persian-text">
                پیش‌نمایش ویدئو
              </h3>
              <span className="text-sm text-gray-600 font-mono persian-number">
                {formatTime(segment.timestamp)}
              </span>
            </div>
            <div className="bg-black rounded aspect-video flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm">ویدئو در حال پخش</div>
              </div>
            </div>
          </div>

          {/* Original Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 persian-text">
              محتوای اصلی
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-900 persian-text">
                {segment.originalText}
              </p>
            </div>
          </div>

          {/* Correction Form */}
          <div>
            <label htmlFor="correctedText" className="block text-sm font-medium text-gray-700 mb-2 persian-text">
              متن تصحیح‌شده *
            </label>
            <textarea
              id="correctedText"
              value={correctedText}
              onChange={(e) => setCorrectedText(e.target.value)}
              rows={4}
              className="input-field"
              placeholder="متن تصحیح‌شده را اینجا وارد کنید..."
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2 persian-text">
              یادداشت‌ها (اختیاری)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="input-field"
              placeholder="توضیحات تکمیلی درباره تصحیح انجام‌شده..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="btn-primary inline-flex items-center"
              >
                <CheckIcon className="ml-2 h-4 w-4" />
                ذخیره تغییرات
              </button>
              
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                انصراف
              </button>
            </div>
            
            <div className="text-sm text-gray-500 persian-text">
              زمان تصحیح: {formatTime(segment.timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}