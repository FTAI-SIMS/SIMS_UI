import Layout from './Layout';

interface InventoryItem {
  PN: string;
  DESCRIPTION: string;
  STOCK_LINE: string;
  CTRL_NUMBER: string;
  CTRL_ID: string;
  RECEIVER_NUMBER: string;
  QTY_OH: number;
  QTY_AVAILABLE: number;
  QTY_RESERVED: number;
  UNIT_COST: number;
  EXT_COST: number;
  STOCK_CATEGORY_CODE: string;
  CONDITION_CODE: string;
  SERIAL_NUMBER: string;
  SHELF_LIFE: string;
  LOCATION_CODE: string;
  WAREHOUSE_CODE: string;
  RESERVED: string;
  DAYS_SINCE_REC: number;
  REC_DATE: string;
  GEO_CODE: string;
  RO_NUMBER: string;
  PO_NUMBER: string;
  WORK_ORDER: string;
  RESERVE_DATE: string;
  PT_PRINT_DATE: string;
  MAT_GROUP: string;
  TYPE: string;
  MAT_SUB_GROUP: string;
  MAT_SUB_GROUP_DESCR: string;
  COUNTRY_OF_ANUFACTURER: string;
  ATA_POS_REF: string;
  MANUFACTURER: string;
  ATA_REF: string;
  ATA_DESC: string;
  PN_GROUP: string;
  PRICE_DATE: string;
  HOME_LP: number;
  MFG_LP_USD: number;
  NSN_NUM: string;
  MAT_GROUP_1: string;
  STOCK_UNIT: string;
}

export default function InventoryData({ data }: { data: InventoryItem[] }) {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Data</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search inventory..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Export Data
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PN</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Line</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control #</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver #</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty OH</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserved</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ext Cost</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial #</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rec Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material Group</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={`${item.CTRL_NUMBER}-${index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.PN}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.DESCRIPTION}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.STOCK_LINE}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.CTRL_NUMBER}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.RECEIVER_NUMBER}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.QTY_OH}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.QTY_AVAILABLE}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.QTY_RESERVED}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${item.UNIT_COST.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${item.EXT_COST.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.STOCK_CATEGORY_CODE}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.CONDITION_CODE === 'NEW' ? 'bg-green-100 text-green-800' :
                      item.CONDITION_CODE === 'US' ? 'bg-blue-100 text-blue-800' :
                      item.CONDITION_CODE === 'AR' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.CONDITION_CODE}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.SERIAL_NUMBER}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.LOCATION_CODE}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.WAREHOUSE_CODE}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.REC_DATE}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.MAT_GROUP}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.TYPE}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.MANUFACTURER}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
} 