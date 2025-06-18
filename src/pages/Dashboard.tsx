import { useState } from 'react';
import Layout from '../components/Layout';
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total SKUs', value: '12,345', icon: ChartBarIcon },
  { name: 'Items Below Min', value: '23', icon: ExclamationTriangleIcon },
  { name: 'Incoming Repairs', value: '45', icon: ArrowPathIcon },
  { name: 'Upload Failures', value: '3', icon: XCircleIcon },
];

const recentActivity = [
  {
    id: 1,
    type: 'Stock Update',
    description: 'Updated stock level for SKU ABC123',
    timestamp: '2024-03-18 14:30',
  },
  {
    id: 2,
    type: 'New Item',
    description: 'Added new item XYZ789 to inventory',
    timestamp: '2024-03-18 13:15',
  },
  {
    id: 3,
    type: 'Alert',
    description: 'Low stock alert for SKU DEF456',
    timestamp: '2024-03-18 12:00',
  },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your inventory system
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-ftai-blue p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Inventory by Category
            </h3>
            <div className="mt-6 h-96 bg-gray-50 flex items-center justify-center">
              <p className="text-gray-500">Chart will be implemented here</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {activity.type}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {activity.description}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 