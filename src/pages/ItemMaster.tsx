const sampleItems = [
  {
    PN: '336-024-704-0',
    DESCRIPTION: 'COVER ASSY-OIL INLET',
    STOCK_LINE: '27',
    QTY_OH: 1,
    UNIT_COST: 120.042,
    EXT_COST: 120.042,
    CONDITION_CODE: 'INS',
    LOCATION_CODE: 'PUT AWAY',
    WAREHOUSE_CODE: 'FTAIC-SV',
    REC_DATE: '03/07/2018',
    STOCK_UNIT: 'EA',
  },
  {
    PN: '338-010-003-0',
    DESCRIPTION: 'SHAFT-LPT',
    STOCK_LINE: '3',
    QTY_OH: 1,
    UNIT_COST: 0,
    EXT_COST: 0,
    CONDITION_CODE: 'AR',
    LOCATION_CODE: 'LPT-RACK-US',
    WAREHOUSE_CODE: 'PFR-COM',
    REC_DATE: '06/07/2016',
    STOCK_UNIT: 'EA',
  },
  {
    PN: '340-074-722-0',
    DESCRIPTION: 'SHAFT-LPT',
    STOCK_LINE: '1',
    QTY_OH: 1,
    UNIT_COST: 0,
    EXT_COST: 0,
    CONDITION_CODE: 'US',
    LOCATION_CODE: 'US-M13-1',
    WAREHOUSE_CODE: 'PFR-COM',
    REC_DATE: '19/08/2016',
    STOCK_UNIT: 'EA',
  },
  {
    PN: '338-077-502-0',
    DESCRIPTION: 'SUPPORT-RTR LPT',
    STOCK_LINE: '152',
    QTY_OH: 1,
    UNIT_COST: 0,
    EXT_COST: 0,
    CONDITION_CODE: 'US',
    LOCATION_CODE: 'LM-COM-PFR-06',
    WAREHOUSE_CODE: 'PFR-COM',
    REC_DATE: '01/03/2023',
    STOCK_UNIT: 'EA',
  },
  {
    PN: '336-002-006-0',
    DESCRIPTION: 'DISK-LPT STG 3',
    STOCK_LINE: '38',
    QTY_OH: 1,
    UNIT_COST: 1002.26,
    EXT_COST: 1002.26,
    CONDITION_CODE: 'OH',
    LOCATION_CODE: 'T-2C',
    WAREHOUSE_CODE: 'FTAIC-SV',
    REC_DATE: '16/08/2016',
    STOCK_UNIT: 'EA',
  },
];

const conditionColors: Record<string, string> = {
  INS: 'bg-green-100 text-green-800',
  AR: 'bg-yellow-100 text-yellow-800',
  US: 'bg-blue-100 text-blue-800',
  OH: 'bg-purple-100 text-purple-800',
};

export default function ItemMaster() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="h-10 w-2 rounded bg-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Item Master</h1>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Parts List</h2>
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-800 font-bold transition">+ Add Item</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">PN</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Description</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Stock Line</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Qty OH</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Unit Cost</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Ext Cost</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Condition</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Warehouse</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Rec Date</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blue-700 uppercase">Unit</th>
                </tr>
              </thead>
              <tbody>
                {sampleItems.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50 hover:bg-blue-100'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.PN}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.DESCRIPTION}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.STOCK_LINE}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.QTY_OH}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.UNIT_COST}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.EXT_COST}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${conditionColors[item.CONDITION_CODE] || 'bg-gray-100 text-gray-800'}`}>
                        {item.CONDITION_CODE}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.LOCATION_CODE}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.WAREHOUSE_CODE}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.REC_DATE}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.STOCK_UNIT}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 