'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'خانه', href: '/' },
  { name: 'آپلود ویدئو', href: '/upload' },
  { name: 'وضعیت پردازش', href: '/processing' },
  { name: 'گزارش‌ها', href: '/reports' },
  { name: 'داشبورد', href: '/dashboard' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-primary-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-primary-600 to-sky-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VA</span>
              </div>
              <span className="text-xl font-bold text-gray-900 persian-text">
                تحلیل ویدئو آموزشی
              </span>
            </Link>
          </div>
          
          <div className="ml-10 hidden space-x-8 lg:block">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="ml-6 hidden lg:flex items-center space-x-4">
            <button className="btn-secondary">
              ورود
            </button>
            <button className="btn-primary">
              ثبت‌نام
            </button>
          </div>
          
          <div className="ml-6 flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">باز کردن منو</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    pathname === link.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-5 space-x-4">
                <button className="btn-secondary flex-1">
                  ورود
                </button>
                <button className="btn-primary flex-1">
                  ثبت‌نام
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}