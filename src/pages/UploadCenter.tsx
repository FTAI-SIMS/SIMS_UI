import { useState } from 'react';
import Layout from '../components/Layout';
import { ArrowUpTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const fileTypes = [
  { id: 'csv', name: 'CSV File' },
  { id: 'excel', name: 'Excel File' },
  { id: 'word', name: 'Word Document' },
];

const rejectedUploads = [
  {
    id: 1,
    fileName: 'inventory_update.csv',
    reason: 'Invalid column format',
    timestamp: '2024-03-18 14:30',
  },
  {
    id: 2,
    fileName: 'stock_levels.xlsx',
    reason: 'Missing required fields',
    timestamp: '2024-03-18 13:15',
  },
];

export default function UploadCenter() {
  const [selectedFileType, setSelectedFileType] = useState(fileTypes[0].id);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Upload Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload and manage your inventory files
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white shadow">
              <div className="p-6">
                <div className="space-y-6">
                  {/* File Type Selection */}
                  <div>
                    <label htmlFor="file-type" className="block text-sm font-medium text-gray-700">
                      File Type
                    </label>
                    <select
                      id="file-type"
                      name="file-type"
                      value={selectedFileType}
                      onChange={(e) => setSelectedFileType(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-ftai-blue focus:outline-none focus:ring-ftai-blue sm:text-sm"
                    >
                      {fileTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Drag and Drop Area */}
                  <div
                    className={`mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 ${
                      isDragging ? 'border-ftai-blue bg-ftai-light-blue' : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-center">
                      <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-ftai-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-ftai-blue focus-within:ring-offset-2 hover:text-ftai-blue"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        CSV, Excel, or Word files up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Logs */}
          <div>
            <div className="rounded-lg bg-white shadow">
              <div className="p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Rejected Uploads
                </h3>
                <div className="mt-6 flow-root">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {rejectedUploads.map((upload) => (
                      <li key={upload.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {upload.fileName}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {upload.reason}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-sm text-gray-500">
                            {upload.timestamp}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 