'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const stats = [
  { name: 'ویدئو تحلیل‌شده', value: 0, target: 1250, suffix: '+' },
  { name: 'دقت تحلیل', value: 0, target: 94, suffix: '%' },
  { name: 'زمان پردازش', value: 0, target: 3.2, suffix: ' دقیقه' },
  { name: 'مؤسسه آموزشی', value: 0, target: 85, suffix: '+' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = target / 100;
      const counter = setInterval(() => {
        setCount(prev => {
          if (prev >= target) {
            clearInterval(counter);
            return target;
          }
          return prev + increment;
        });
      }, 20);

      return () => clearInterval(counter);
    }, 500);

    return () => clearTimeout(timer);
  }, [target]);

  return (
    <span className="persian-number">
      {Math.floor(count).toLocaleString('fa-IR')}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl persian-text">
              آمار و دستاوردها
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 persian-text">
              نتایج چشمگیر ما در تحلیل ویدئوهای آموزشی
            </p>
          </div>
          
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col bg-gray-400/5 p-8"
              >
                <dt className="text-sm font-semibold leading-6 text-gray-600 persian-text">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}