import React from 'react';

const uploadedFiles = [
  { name: 'Inventory_July.csv', size: '24 KB', uploaded: '2024-07-01', status: 'Processed' },
  { name: 'PartsList.xlsx', size: '18 KB', uploaded: '2024-06-28', status: 'Processed' },
  { name: 'GoodsReceipt_May.pdf', size: '120 KB', uploaded: '2024-06-15', status: 'Pending' },
];

export default function UploadCenter() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Upload Center</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form className="flex items-center space-x-4">
          <input type="file" className="border border-gray-300 rounded px-3 py-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Upload</button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">File Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {uploadedFiles.map((file, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{file.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{file.uploaded}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{file.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 