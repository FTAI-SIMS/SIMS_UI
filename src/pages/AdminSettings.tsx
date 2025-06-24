import React, { useState } from 'react';

export default function AdminSettings() {
  const [maintenance, setMaintenance] = useState(false);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Admin Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Warehouse Management</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>FTAIC-SV (Main Warehouse)</li>
          <li>PFR-COM (Parts Freeport)</li>
          <li>AIR CAN-US (Canada Hub)</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">User Roles</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Admin: Full access</li>
          <li>Manager: Inventory & Receipts</li>
          <li>Viewer: Read-only</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
        <span className="text-lg font-semibold">Maintenance Mode</span>
        <button
          className={`w-14 h-8 flex items-center bg-gray-200 rounded-full p-1 duration-300 focus:outline-none ${maintenance ? 'bg-blue-600' : ''}`}
          onClick={() => setMaintenance((m) => !m)}
        >
          <span
            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${maintenance ? 'translate-x-6' : ''}`}
          />
        </button>
        <span className="ml-4 text-gray-600">{maintenance ? 'ON' : 'OFF'}</span>
      </div>
    </div>
  );
} 