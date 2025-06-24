import PageAIChat from '../components/PageAIChat';

const sampleReceipts = [
  {
    RECEIVER_NUMBER: '88534',
    PN: '336-024-704-0',
    DESCRIPTION: 'COVER ASSY-OIL INLET',
    QTY_OH: 1,
    CONDITION_CODE: 'INS',
    REC_DATE: '03/07/2018',
    LOCATION_CODE: 'PUT AWAY',
    WAREHOUSE_CODE: 'FTAIC-SV',
  },
  {
    RECEIVER_NUMBER: '33068',
    PN: '338-010-003-0',
    DESCRIPTION: 'SHAFT-LPT',
    QTY_OH: 1,
    CONDITION_CODE: 'AR',
    REC_DATE: '06/07/2016',
    LOCATION_CODE: 'LPT-RACK-US',
    WAREHOUSE_CODE: 'PFR-COM',
  },
  {
    RECEIVER_NUMBER: '239956',
    PN: '338-010-005-0',
    DESCRIPTION: 'SHAFT-LPT',
    QTY_OH: 1,
    CONDITION_CODE: 'US',
    REC_DATE: '30/11/2022',
    LOCATION_CODE: 'LPT-RACK-US',
    WAREHOUSE_CODE: 'PFR-COM',
  },
];

const conditionColors: Record<string, string> = {
  INS: 'bg-green-100 text-green-800',
  AR: 'bg-yellow-100 text-yellow-800',
  US: 'bg-blue-100 text-blue-800',
  OH: 'bg-purple-100 text-purple-800',
};

function goodsReceiptDataContextBuilder(data: typeof sampleReceipts) {
  if (!data.length) return 'No goods receipt data available.';
  let summary = `Total Receipts: ${data.length}\n`;
  summary += 'Sample Receipts:';
  data.slice(0, 5).forEach((item) => {
    summary += `\n- ${item.RECEIVER_NUMBER}: ${item.DESCRIPTION} (${item.QTY_OH}) in ${item.LOCATION_CODE}`;
  });
  return summary;
}

export default function GoodsReceipt() {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="h-10 w-2 rounded bg-green-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Goods Receipt</h1>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Receipts</h2>
            <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-800 font-bold transition">+ Add Receipt</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">Receiver #</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">PN</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">Description</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">Qty</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">Condition</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">Rec Date</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase">Warehouse</th>
                </tr>
              </thead>
              <tbody>
                {sampleReceipts.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50 hover:bg-green-100'}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.RECEIVER_NUMBER}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.PN}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.DESCRIPTION}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.QTY_OH}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${conditionColors[item.CONDITION_CODE] || 'bg-gray-100 text-gray-800'}`}>
                        {item.CONDITION_CODE}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.REC_DATE}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.LOCATION_CODE}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.WAREHOUSE_CODE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PageAIChat
        data={sampleReceipts}
        contextPrompt="You are an AI assistant for the Goods Receipt page. Help the user analyze, summarize, and answer questions about the goods receipts data."
        dataContextBuilder={goodsReceiptDataContextBuilder}
      />
    </div>
  );
} 