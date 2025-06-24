import React, { useState, useMemo } from 'react';
import PageAIChat from '../components/PageAIChat';

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

// 10 dummy items for demonstration
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
  },
  {
    PN: "336-024-705-0",
    DESCRIPTION: "COVER ASSY-OIL OUTLET",
    STOCK_LINE: "28",
    QTY_OH: 4,
    UNIT_COST: 130.042,
    EXT_COST: 520.168,
    CONDITION_CODE: "NEW",
    LOCATION_CODE: "PUT AWAY",
    WAREHOUSE_CODE: "FTAIC-SV",
    REC_DATE: "04/07/2018",
    STOCK_UNIT: "EA"
  },
  {
    PN: "338-010-004-0",
    DESCRIPTION: "SHAFT-HPT",
    STOCK_LINE: "4",
    QTY_OH: 2,
    UNIT_COST: 200.00,
    EXT_COST: 400.00,
    CONDITION_CODE: "OH",
    LOCATION_CODE: "HPT-RACK-US",
    WAREHOUSE_CODE: "PFR-COM",
    REC_DATE: "07/07/2016",
    STOCK_UNIT: "EA"
  },
  {
    PN: "340-074-723-0",
    DESCRIPTION: "SHAFT-HPT",
    STOCK_LINE: "2",
    QTY_OH: 1,
    UNIT_COST: 150.00,
    EXT_COST: 150.00,
    CONDITION_CODE: "INS",
    LOCATION_CODE: "US-M14-1",
    WAREHOUSE_CODE: "PFR-COM",
    REC_DATE: "20/08/2016",
    STOCK_UNIT: "EA"
  }
];

const conditionColors: Record<string, string> = {
  INS: 'bg-green-100 text-green-800',
  AR: 'bg-yellow-100 text-yellow-800',
  US: 'bg-blue-100 text-blue-800',
  OH: 'bg-purple-100 text-purple-800',
};

function goodsReceiptDataContextBuilder(data: typeof sampleData) {
  if (!data.length) return 'No goods receipt data available.';
  let summary = `Total Receipts: ${data.length}\n`;
  summary += 'Sample Receipts:';
  data.slice(0, 5).forEach((item) => {
    summary += `\n- ${item.PN}: ${item.DESCRIPTION} (${item.QTY_OH}) in ${item.LOCATION_CODE}`;
  });
  return summary;
}

export default function GoodsReceipt() {
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
        <h1 className="text-3xl font-bold text-gray-900">Goods Receipt</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by PN, Description, Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
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
        data={sampleData}
        contextPrompt="You are an AI assistant for the Goods Receipt page. Help the user analyze, summarize, and answer questions about the goods receipts data."
        dataContextBuilder={goodsReceiptDataContextBuilder}
      />
    </div>
  );
} 