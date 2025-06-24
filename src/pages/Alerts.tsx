const sampleAlerts = [
  {
    type: 'Low Stock',
    message: 'PN 336-024-704-0 (COVER ASSY-OIL INLET) is low on stock.',
    date: '2024-07-10',
    severity: 'warning',
  },
  {
    type: 'Shelf Life Expiring',
    message: 'PN 336-002-006-0 (DISK-LPT STG 3) shelf life expires soon.',
    date: '2024-07-08',
    severity: 'danger',
  },
  {
    type: 'New Receipt',
    message: 'Goods receipt added for PN 338-077-502-0 (SUPPORT-RTR LPT).',
    date: '2024-07-07',
    severity: 'info',
  },
];

const severityColor = {
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  danger: 'bg-red-100 text-red-800 border-red-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
};

export default function Alerts() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
      <div className="space-y-4">
        {sampleAlerts.map((alert, idx) => (
          <div
            key={idx}
            className={`border-l-4 p-4 rounded ${severityColor[alert.severity]} bg-opacity-60`}
          >
            <div className="font-bold">{alert.type}</div>
            <div>{alert.message}</div>
            <div className="text-xs text-gray-500 mt-1">{alert.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 