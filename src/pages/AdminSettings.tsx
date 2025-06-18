import { useState } from 'react';
import Layout from '../components/Layout';
import {
  UserIcon,
  ShieldCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const tabs = [
  { name: 'Users', icon: UserIcon },
  { name: 'Roles', icon: ShieldCheckIcon },
  { name: 'Audit Logs', icon: ClockIcon },
];

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@ftai.com',
    role: 'Admin',
    lastActive: '2024-03-18 14:30',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@ftai.com',
    role: 'Inventory Manager',
    lastActive: '2024-03-18 13:15',
  },
];

const roles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Full system access',
    permissions: ['Manage Users', 'Manage Roles', 'View Audit Logs', 'Manage Inventory'],
  },
  {
    id: 2,
    name: 'Inventory Manager',
    description: 'Inventory management access',
    permissions: ['Manage Inventory', 'View Reports'],
  },
];

const auditLogs = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Updated user role',
    details: 'Changed role for jane.smith@ftai.com to Inventory Manager',
    timestamp: '2024-03-18 14:30',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Updated inventory',
    details: 'Added 10 units of ABC123',
    timestamp: '2024-03-18 13:15',
  },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [isAddingRole, setIsAddingRole] = useState(false);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users, roles, and view audit logs
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

        {/* Content */}
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            {activeTab === 'Users' && (
              <div className="flow-root">
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-ftai-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ftai-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ftai-blue"
                  >
                    Add User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Email
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Role
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Last Active
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {user.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.lastActive}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-ftai-blue hover:text-ftai-blue">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'Roles' && (
              <div className="flow-root">
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingRole(true)}
                    className="inline-flex items-center rounded-md bg-ftai-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ftai-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ftai-blue"
                  >
                    Add Role
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {role.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {role.description}
                          </p>
                        </div>
                        <button className="text-ftai-blue hover:text-ftai-blue">
                          Edit
                        </button>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Permissions</h4>
                        <ul className="mt-2 space-y-1">
                          {role.permissions.map((permission) => (
                            <li key={permission} className="text-sm text-gray-500">
                              • {permission}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Audit Logs' && (
              <div className="flow-root">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          User
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Action
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Details
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Timestamp
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {log.user}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {log.action}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {log.details}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {log.timestamp}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 