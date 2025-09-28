'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  CloudArrowUpIcon,
  DocumentArrowUpIcon,
  LinkIcon,
  XMarkIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface UploadFormData {
  courseName: string;
  instructor: string;
  language: string;
  description: string;
  useForTraining: boolean;
}

export default function UploadPage() {
  const router = useRouter();
  const [uploadMethod, setUploadMethod] = useState<'file' | 'link'>('file');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    courseName: '',
    instructor: '',
    language: 'fa',
    description: '',
    useForTraining: false,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedFile(file);
      toast.success('فایل با موفقیت انتخاب شد');
    } else {
      toast.error('لطفاً یک فایل ویدئویی معتبر انتخاب کنید');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm'],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.courseName || !formData.instructor) {
      toast.error('لطفاً تمام فیلدهای الزامی را پر کنید');
      return;
    }

    if (uploadMethod === 'file' && !uploadedFile) {
      toast.error('لطفاً یک فایل ویدئویی انتخاب کنید');
      return;
    }

    if (uploadMethod === 'link' && !videoLink) {
      toast.error('لطفاً لینک ویدئو را وارد کنید');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate a mock job ID
      const jobId = `job-${Date.now()}`;
      
      toast.success('ویدئو با موفقیت آپلود شد و در صف پردازش قرار گرفت');
      router.push(`/processing?jobId=${jobId}`);
    } catch (error) {
      toast.error('خطا در آپلود ویدئو. لطفاً دوباره تلاش کنید');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 persian-text">آپلود ویدئوی آموزشی</h1>
          <p className="mt-2 text-gray-600 persian-text">
            ویدئوی آموزشی خود را آپلود کرده و تحلیل هوشمند دریافت کنید
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Upload Method Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 persian-text">
                روش آپلود ویدئو
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`relative rounded-lg border-2 p-4 text-center transition-colors ${
                    uploadMethod === 'file'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <DocumentArrowUpIcon className="mx-auto h-8 w-8 text-gray-600 mb-2" />
                  <span className="block font-medium text-gray-900 persian-text">آپلود فایل</span>
                  <span className="block text-sm text-gray-500 persian-text">فایل ویدئو از دستگاه شما</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setUploadMethod('link')}
                  className={`relative rounded-lg border-2 p-4 text-center transition-colors ${
                    uploadMethod === 'link'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <LinkIcon className="mx-auto h-8 w-8 text-gray-600 mb-2" />
                  <span className="block font-medium text-gray-900 persian-text">لینک ویدئو</span>
                  <span className="block text-sm text-gray-500 persian-text">لینک از یوتیوب یا سایر منابع</span>
                </button>
              </div>
            </div>

            {/* File Upload Area */}
            {uploadMethod === 'file' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 persian-text">
                  انتخاب فایل ویدئو
                </label>
                
                {!uploadedFile ? (
                  <div
                    {...getRootProps()}
                    className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer ${
                      isDragActive
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-900 persian-text">
                      {isDragActive ? 'فایل را اینجا رها کنید' : 'فایل ویدئو را اینجا بکشید یا کلیک کنید'}
                    </p>
                    <p className="text-sm text-gray-500 persian-text mt-2">
                      فرمت‌های پشتیبانی‌شده: MP4, AVI, MOV, MKV, WebM (حداکثر 2GB)
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircleIcon className="h-6 w-6 text-green-600 ml-2" />
                        <div>
                          <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-600">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video Link Input */}
            {uploadMethod === 'link' && (
              <div>
                <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 mb-2 persian-text">
                  لینک ویدئو
                </label>
                <input
                  type="url"
                  id="videoLink"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="input-field"
                />
                <p className="mt-1 text-sm text-gray-500 persian-text">
                  لینک ویدئو از یوتیوب، Vimeo یا سایر پلتفرم‌های پشتیبانی‌شده
                </p>
              </div>
            )}

            {/* Video Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-2 persian-text">
                  نام دوره/جلسه *
                </label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="مثلاً: محاسبات دیفرانسیل - جلسه ۱"
                />
              </div>
              
              <div>
                <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-2 persian-text">
                  نام مدرس *
                </label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="دکتر احمدی"
                />
              </div>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2 persian-text">
                  زبان ویدئو
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="fa">فارسی</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 persian-text">
                  توضیحات (اختیاری)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field"
                  placeholder="توضیحات تکمیلی درباره محتوای این جلسه..."
                />
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start">
                <input
                  id="useForTraining"
                  name="useForTraining"
                  type="checkbox"
                  checked={formData.useForTraining}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                />
                <div className="mr-3">
                  <label htmlFor="useForTraining" className="text-sm text-gray-700 persian-text">
                    برای بهبود کیفیت سرویس، اجازه می‌دهم که محتوای ویدئو به‌صورت ناشناس برای آموزش مدل‌ها استفاده شود.
                    این اجازه اختیاری است و می‌توانم بعداً آن را لغو کنم.
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="btn-primary inline-flex items-center px-8 py-3 text-lg"
              >
                {isUploading ? (
                  <>
                    <ArrowPathIcon className="ml-2 h-5 w-5 animate-spin" />
                    در حال آپلود...
                  </>
                ) : (
                  <>
                    شروع تحلیل ویدئو
                    <CloudArrowUpIcon className="mr-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}