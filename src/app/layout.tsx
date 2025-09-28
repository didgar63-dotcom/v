import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'پلتفرم تحلیل ویدئوهای آموزشی',
  description: 'سامانهٔ مولتی‌مدال تحلیل و اعتبارسنجی ویدئوهای آموزشی با هوش مصنوعی',
  keywords: ['تحلیل ویدئو', 'آموزش', 'هوش مصنوعی', 'اعتبارسنجی'],
  authors: [{ name: 'تیم تحلیل ویدئو آموزشی' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-left"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}