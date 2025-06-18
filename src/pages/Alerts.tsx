import { useState } from 'react';
import Layout from '../components/Layout';
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const tabs = [
  { name: 'Low Stock', icon: ExclamationTriangleIcon },
  { name: 'Upload Errors', icon: XCircleIcon },
  { name: 'System Warnings', icon: BellIcon },
];

const alerts = {
  'Low Stock': [
    {
      id: 1,
      sku: 'ABC123',
      description: 'Boeing 737 Landing Gear',
      currentQuantity: 2,
      minQuantity: 3,
      timestamp: '2024-03-18 14:30',
    },
    {
      id: 2,
      sku: 'DEF456',
      description: 'Aviation Tool Kit',
      currentQuantity: 1,
      minQuantity: 5,
      timestamp: '2024-03-18 13:15',
    },
  ],
  'Upload Errors': [
    {
      id: 1,
      fileName: 'inventory_update.csv',
      errorCode: 'MSG-VALID-4001',
      description: 'Invalid column format in row 5',
      timestamp: '2024-03-18 14:30',
    },
    {
      id: 2,
      fileName: 'stock_levels.xlsx',
      errorCode: 'MSG-VALID-4002',
      description: 'Missing required fields',
      timestamp: '2024-03-18 13:15',
    },
  ],
  'System Warnings': [
    {
      id: 1,
      type: 'Database Connection',
      description: 'High latency detected in database connection',
      timestamp: '2024-03-18 14:30',
    },
    {
      id: 2,
      type: 'Backup Status',
      description: 'Last backup completed with warnings',
      timestamp: '2024-03-18 13:15',
    },
  ],
};

export default function Alerts() {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Alerts & Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage system alerts
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium
                  ${
                    activeTab === tab.name
                      ? 'border-ftai-blue text-ftai-blue'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }
                `}
              >
                <tab.icon
                  className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${
                      activeTab === tab.name
                        ? 'text-ftai-blue'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }
                  `}
                  aria-hidden="true"
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Alerts List */}
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {alerts[activeTab as keyof typeof alerts].map((alert) => (
                  <li key={alert.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        {activeTab === 'Low Stock' && (
                          <>
                            <p className="truncate text-sm font-medium text-gray-900">
                              {alert.sku} - {alert.description}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              Current: {alert.currentQuantity} | Minimum: {alert.minQuantity}
                            </p>
                          </>
                        )}
                        {activeTab === 'Upload Errors' && (
                          <>
                            <p className="truncate text-sm font-medium text-gray-900">
                              {alert.fileName}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {alert.errorCode} - {alert.description}
                            </p>
                          </>
                        )}
                        {activeTab === 'System Warnings' && (
                          <>
                            <p className="truncate text-sm font-medium text-gray-900">
                              {alert.type}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {alert.description}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="inline-flex items-center text-sm text-gray-500">
                        {alert.timestamp}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Acknowledge
                        </button>
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