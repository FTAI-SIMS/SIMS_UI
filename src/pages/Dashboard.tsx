import React, { useEffect, useRef } from 'react';
import PageAIChat from '../components/PageAIChat';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const stats = [
  { label: 'Total Items', value: 128 },
  { label: 'Total Value', value: '$1,250,000' },
  { label: 'Low Stock', value: 7 },
  { label: 'Warehouses', value: 3 },
];

// Minimal dummy data for dashboard context
const dashboardData = [
  { label: 'Total Inventory Items', value: 120 },
  { label: 'Low Stock Items', value: 8 },
  { label: 'Open Receipts', value: 5 },
  { label: 'Warehouses', value: 3 },
];

function dashboardContextBuilder(data: typeof dashboardData) {
  return data.map(item => `${item.label}: ${item.value}`).join('\n');
}

// Sample data for Stock by Category
const stockByCategory = [
  { category: 'Expendable', stock: 40 },
  { category: 'LLP', stock: 25 },
  { category: 'Rotable', stock: 30 },
  { category: 'Consumable', stock: 15 },
];

const aiSummary = `Inventory levels are stable overall. Notably, 7 items are flagged as low stock, primarily in the LLP and Expendable categories. No critical shortages detected, but consider restocking COVER ASSY-OIL INLET and DISK-LPT STG 3 soon. Recent receipts have improved stock in the main warehouse. No urgent alerts, but shelf life monitoring is recommended for older parts.`;

export default function Dashboard() {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    barRefs.current.forEach((bar, idx) => {
      if (bar) {
        bar.style.height = '0px';
        setTimeout(() => {
          bar.style.transition = 'height 1s cubic-bezier(0.4,0,0.2,1)';
          bar.style.height = `${stockByCategory[idx].stock * 3}px`;
        }, 200 + idx * 120);
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
      {/* AI Insights Card */}
      <div className="bg-brand-lightBlue border-l-8 border-brand-orange rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold text-brand-navy mb-2">AI Insights</h2>
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
      {/* Animated & Interactive Bar Chart for Stock by Category */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Stock by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={stockByCategory} barCategoryGap={30}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} />
            <Legend />
            <Bar dataKey="stock" fill="#6366f1" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={1200} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <PageAIChat
        data={dashboardData}
        contextPrompt="You are an AI assistant for the inventory management dashboard. Help summarize key metrics, answer questions about overall inventory status, and provide insights."
        dataContextBuilder={dashboardContextBuilder}
      />
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