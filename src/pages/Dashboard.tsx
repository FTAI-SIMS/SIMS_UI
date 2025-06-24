import React, { useEffect, useRef } from 'react';

const stats = [
  { label: 'Total Items', value: 128 },
  { label: 'Total Value', value: '$1,250,000' },
  { label: 'Low Stock', value: 7 },
  { label: 'Warehouses', value: 3 },
];

const stockByCategory = [
  { category: 'LLP', count: 40 },
  { category: 'EXPENDABLE', count: 30 },
  { category: 'CFM56-5B/7', count: 25 },
  { category: 'SUPPORT', count: 18 },
  { category: 'DISK', count: 15 },
];

const aiSummary = `
Inventory levels are stable overall. Notably, 7 items are flagged as low stock, primarily in the LLP and Expendable categories. No critical shortages detected, but consider restocking COVER ASSY-OIL INLET and DISK-LPT STG 3 soon. Recent receipts have improved stock in the main warehouse. No urgent alerts, but shelf life monitoring is recommended for older parts.`;

export default function Dashboard() {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    barRefs.current.forEach((bar, idx) => {
      if (bar) {
        bar.style.height = '0px';
        setTimeout(() => {
          bar.style.transition = 'height 1s cubic-bezier(0.4,0,0.2,1)';
          bar.style.height = `${stockByCategory[idx].count * 3}px`;
        }, 200 + idx * 120);
      }
    });
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      {/* AI Insights Card */}
      <div className="bg-brand-lightBlue border-l-8 border-brand-orange rounded-lg shadow p-6 mb-2 opacity-0 translate-y-4 animate-fadein">
        <div className="flex items-center mb-2">
          <span className="inline-block bg-brand-orange text-white rounded-full px-3 py-1 text-xs font-bold mr-2">AI Insights</span>
          <span className="text-sm text-brand-navy font-semibold">Powered by LLM</span>
        </div>
        <div className="text-brand-navy text-base leading-relaxed">
          {aiSummary}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-0 translate-y-4 animate-fadein delay-200">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center transform transition hover:scale-105 duration-300"
            style={{ transitionDelay: `${100 * i}ms` }}
          >
            <div className="text-2xl font-bold text-brand-blue">{stat.value}</div>
            <div className="text-gray-500 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Stock by Category</h2>
        <div className="flex items-end space-x-6 h-40">
          {stockByCategory.map((cat, idx) => (
            <div key={cat.category} className="flex flex-col items-center justify-end h-full">
              <div
                ref={el => (barRefs.current[idx] = el)}
                className="w-10 rounded-t bg-brand-blue bar-animate"
                style={{ height: 0 }}
                title={String(cat.count)}
              ></div>
              <div className="mt-2 text-xs text-gray-700">{cat.category}</div>
              <div className="text-xs text-gray-500">{cat.count}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadein {
          to { opacity: 1; transform: none; }
        }
        .animate-fadein {
          animation: fadein 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
} 