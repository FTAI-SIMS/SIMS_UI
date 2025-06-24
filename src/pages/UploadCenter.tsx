import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, FileSpreadsheet, File } from 'lucide-react';

const uploadedFiles = [
  { name: 'Inventory_July.csv', size: '24 KB', uploaded: '2024-07-01', status: 'Processed' },
  { name: 'PartsList.xlsx', size: '18 KB', uploaded: '2024-06-28', status: 'Processed' },
  { name: 'GoodsReceipt_May.pdf', size: '120 KB', uploaded: '2024-06-15', status: 'Pending' },
];

function getFileIcon(name: string) {
  if (name.endsWith('.csv') || name.endsWith('.xlsx')) return <FileSpreadsheet className="w-5 h-5 text-green-500 inline-block mr-2" />;
  if (name.endsWith('.pdf')) return <FileText className="w-5 h-5 text-red-500 inline-block mr-2" />;
  return <File className="w-5 h-5 text-gray-400 inline-block mr-2" />;
}

function getStatusBadge(status: string) {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";
  if (status === "Processed") return <span className={`${base} bg-green-100 text-green-800`}>{status}</span>;
  if (status === "Pending") return <span className={`${base} bg-yellow-100 text-yellow-800`}>{status}</span>;
  return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
}

export default function UploadCenter() {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Upload Center</h1>
      {/* Drag-and-drop area */}
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors duration-200 cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
        onDrop={e => { e.preventDefault(); setDragActive(false); /* handle file drop here */ }}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud className="w-12 h-12 text-blue-500 mb-2" />
        <p className="text-lg font-semibold text-gray-700 mb-1">Drag & drop files here</p>
        <p className="text-sm text-gray-500 mb-2">or click to browse</p>
        <input ref={fileInputRef} type="file" className="hidden" />
        <button
          type="button"
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
        >
          Upload File
        </button>
      </div>

      {/* Uploaded files table */}
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
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                  {getFileIcon(file.name)}
                  {file.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{file.uploaded}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{getStatusBadge(file.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 