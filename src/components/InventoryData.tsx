import Layout from './Layout';

const sampleInventory = [
  {
    id: 1,
    pn: 'SP9651',
    description: 'PRE-CUTTER',
    stockLine: 'A',
    minQty: 2,
    reorderQty: 5,
    qtyAvailable: 11,
    qtyReserved: 4,
    qtyRepair: 0,
    qtyService: 0,
    unitCost: 12.5,
    extCost: 137.5,
    stockCategoryCode: 'E10',
    conditionCode: 'NEW',
    serialNumber: 'SN12345',
    shelfLife: '2025-12-31',
    locationCode: 'FTL-FTG',
    warehouseCode: 'WH-A',
  },
  {
    id: 2,
    pn: 'AB1234',
    description: 'HYDRAULIC PUMP',
    stockLine: 'B',
    minQty: 1,
    reorderQty: 2,
    qtyAvailable: 3,
    qtyReserved: 1,
    qtyRepair: 1,
    qtyService: 0,
    unitCost: 250.0,
    extCost: 750.0,
    stockCategoryCode: 'M20',
    conditionCode: 'USED',
    serialNumber: 'SN67890',
    shelfLife: '2026-06-30',
    locationCode: 'FTL-FTG',
    warehouseCode: 'WH-B',
  },
  {
    id: 3,
    pn: 'CD5678',
    description: 'OIL FILTER',
    stockLine: 'C',
    minQty: 10,
    reorderQty: 20,
    qtyAvailable: 50,
    qtyReserved: 5,
    qtyRepair: 0,
    qtyService: 0,
    unitCost: 5.0,
    extCost: 250.0,
    stockCategoryCode: 'F30',
    conditionCode: 'NEW',
    serialNumber: 'SN24680',
    shelfLife: '2027-01-01',
    locationCode: 'FTL-FTG',
    warehouseCode: 'WH-C',
  },
];

export default function InventoryData() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Data</h1>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">PN</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock Line</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Min Qty</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reorder Qty</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty Available</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty Reserved</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty Repair</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty Service</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Cost</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ext Cost</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Serial Number</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Shelf Life</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleInventory.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.pn}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.stockLine}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.minQty}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.reorderQty}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.qtyAvailable}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.qtyReserved}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.qtyRepair}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.qtyService}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${item.unitCost.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${item.extCost.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.stockCategoryCode}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.conditionCode}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.serialNumber}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.shelfLife}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.locationCode}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.warehouseCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
} 