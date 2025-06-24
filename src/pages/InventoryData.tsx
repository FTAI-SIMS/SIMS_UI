import React, { useState, useMemo } from 'react';
import PageAIChat from '../components/PageAIChat';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface InventoryItem {
  PN: string;
  DESCRIPTION: string;
  STOCK_LINE: string;
  QTY_OH: number;
  UNIT_COST: number;
  EXT_COST: number;
  CONDITION_CODE: string;
  LOCATION_CODE: string;
  WAREHOUSE_CODE: string;
  REC_DATE: string;
  STOCK_UNIT: string;
}

const sampleData: InventoryItem[] = [
  {
    PN: "336-024-704-0",
    DESCRIPTION: "COVER ASSY-OIL INLET",
    STOCK_LINE: "27",
    QTY_OH: 1,
    UNIT_COST: 120.042,
    EXT_COST: 120.042,
    CONDITION_CODE: "INS",
    LOCATION_CODE: "PUT AWAY",
    WAREHOUSE_CODE: "FTAIC-SV",
    REC_DATE: "03/07/2018",
    STOCK_UNIT: "EA"
  },
  {
    PN: "338-010-003-0",
    DESCRIPTION: "SHAFT-LPT",
    STOCK_LINE: "3",
    QTY_OH: 1,
    UNIT_COST: 0,
    EXT_COST: 0,
    CONDITION_CODE: "AR",
    LOCATION_CODE: "LPT-RACK-US",
    WAREHOUSE_CODE: "PFR-COM",
    REC_DATE: "06/07/2016",
    STOCK_UNIT: "EA"
  },
  {
    PN: "340-074-722-0",
    DESCRIPTION: "SHAFT-LPT",
    STOCK_LINE: "1",
    QTY_OH: 1,
    UNIT_COST: 0,
    EXT_COST: 0,
    CONDITION_CODE: "US",
    LOCATION_CODE: "US-M13-1",
    WAREHOUSE_CODE: "PFR-COM",
    REC_DATE: "19/08/2016",
    STOCK_UNIT: "EA"
  },
  {
    PN: "336-002-006-0",
    DESCRIPTION: "DISK-LPT STG 3",
    STOCK_LINE: "38",
    QTY_OH: 2,
    UNIT_COST: 1002.26,
    EXT_COST: 2004.52,
    CONDITION_CODE: "NEW",
    LOCATION_CODE: "T-2C",
    WAREHOUSE_CODE: "FTAIC-SV",
    REC_DATE: "16/08/2016",
    STOCK_UNIT: "EA"
  },
  {
    PN: "336-002-105-0",
    DESCRIPTION: "DISK-LPT STG 4",
    STOCK_LINE: "140",
    QTY_OH: 0,
    UNIT_COST: 66519.05,
    EXT_COST: 0,
    CONDITION_CODE: "OH",
    LOCATION_CODE: "T-2A",
    WAREHOUSE_CODE: "FTAIC-SV",
    REC_DATE: "19/10/2021",
    STOCK_UNIT: "EA"
  },
  {
    PN: "338-077-502-0",
    DESCRIPTION: "SUPPORT-RTR LPT",
    STOCK_LINE: "152",
    QTY_OH: 5,
    UNIT_COST: 0,
    EXT_COST: 0,
    CONDITION_CODE: "AR",
    LOCATION_CODE: "LM-COM-PFR-06",
    WAREHOUSE_CODE: "PFR-COM",
    REC_DATE: "01/03/2023",
    STOCK_UNIT: "EA"
  },
  {
    PN: "338-010-005-0",
    DESCRIPTION: "SHAFT-LPT",
    STOCK_LINE: "99",
    QTY_OH: 3,
    UNIT_COST: 0,
    EXT_COST: 0,
    CONDITION_CODE: "US",
    LOCATION_CODE: "PA743527",
    WAREHOUSE_CODE: "PFR-COM",
    REC_DATE: "30/11/2022",
    STOCK_UNIT: "EA"
  }
];

function inventoryDataContextBuilder(data: InventoryItem[]) {
  if (!data.length) return 'No inventory data available.';

  const summary = {
    totalItems: data.length,
    uniqueParts: new Set(data.map(item => item.PN)).size,
    conditions: [...new Set(data.map(item => item.CONDITION_CODE))],
    warehouses: [...new Set(data.map(item => item.WAREHOUSE_CODE))],
    totalValue: data.reduce((sum, item) => sum + (item.EXT_COST || 0), 0),
    lowStockItems: data.filter(item => item.QTY_OH <= 1).length,
  };

  return `Current Inventory Status:\n- Total Line Items: ${summary.totalItems}\n- Unique Part Numbers: ${summary.uniqueParts}\n- Condition Distribution: ${summary.conditions.map(c => `${c}: ${data.filter(i => i.CONDITION_CODE === c).length}`).join(', ')}\n- Warehouse Distribution: ${summary.warehouses.map(w => `${w}: ${data.filter(i => i.WAREHOUSE_CODE === w).length}`).join(', ')}\n- Total Inventory Value: $${summary.totalValue.toFixed(2)}\n- Low Stock Items (QTY ≤ 1): ${summary.lowStockItems}`;
}

// Prepare data for the bar chart (items by CONDITION_CODE)
const conditionCounts = sampleData.reduce((acc, item) => {
  acc[item.CONDITION_CODE] = (acc[item.CONDITION_CODE] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(conditionCounts).map(([condition, count]) => ({
  condition,
  count,
}));

export default function InventoryData() {
  const data = sampleData;
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InventoryItem;
    direction: 'asc' | 'desc';
  }>({ key: 'PN', direction: 'asc' });

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = data.filter(item =>
        item.PN.toLowerCase().includes(searchLower) ||
        item.DESCRIPTION.toLowerCase().includes(searchLower) ||
        item.LOCATION_CODE.toLowerCase().includes(searchLower)
      );
    }
    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue === bValue) return 0;
      if (sortConfig.direction === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, searchTerm, sortConfig]);

  const handleSort = (key: keyof InventoryItem) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Data</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by PN, Description, Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Data
          </button>
        </div>
      </div>

      {/* Bar Chart for Condition Distribution */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Items by Condition</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="condition" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['PN', 'DESCRIPTION', 'STOCK_LINE', 'QTY_OH', 'UNIT_COST', 'CONDITION_CODE', 'LOCATION_CODE', 'WAREHOUSE_CODE'].map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key as keyof InventoryItem)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    {key.replace(/_/g, ' ')}
                    {sortConfig.key === key && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.PN}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.DESCRIPTION}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.STOCK_LINE}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.QTY_OH}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.UNIT_COST.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.CONDITION_CODE === 'NEW' ? 'bg-green-100 text-green-800' :
                      item.CONDITION_CODE === 'US' ? 'bg-blue-100 text-blue-800' :
                      item.CONDITION_CODE === 'AR' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.CONDITION_CODE}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.LOCATION_CODE}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.WAREHOUSE_CODE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PageAIChat
        data={data}
        contextPrompt="You are an AI assistant for aircraft parts inventory management. Help analyze the inventory data, identify critical parts, and provide insights about stock levels, conditions, and material groups."
        dataContextBuilder={inventoryDataContextBuilder}
      />
    </div>
  );
} 