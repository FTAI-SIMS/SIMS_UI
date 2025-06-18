import { useState } from 'react';
import Layout from '../components/Layout';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const categories = [
  'All Categories',
  'Aircraft Parts',
  'Tools',
  'Consumables',
  'Electronics',
];

const locations = [
  'All Locations',
  'Main Warehouse',
  'Hangar A',
  'Hangar B',
  'Remote Storage',
];

const items = [
  {
    id: 1,
    sku: 'ABC123',
    description: 'Boeing 737 Landing Gear',
    category: 'Aircraft Parts',
    location: 'Main Warehouse',
    quantity: 5,
    minQuantity: 3,
    status: 'In Stock',
  },
  {
    id: 2,
    sku: 'DEF456',
    description: 'Aviation Tool Kit',
    category: 'Tools',
    location: 'Hangar A',
    quantity: 2,
    minQuantity: 5,
    status: 'Low Stock',
  },
  {
    id: 3,
    sku: 'GHI789',
    description: 'Aircraft Paint',
    category: 'Consumables',
    location: 'Main Warehouse',
    quantity: 15,
    minQuantity: 10,
    status: 'In Stock',
  },
];

export default function ItemMaster() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || item.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Item Master</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your inventory items
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ftai-blue sm:text-sm sm:leading-6"
              placeholder="Search by SKU or description"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ftai-blue sm:text-sm sm:leading-6"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ftai-blue sm:text-sm sm:leading-6"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Items Table */}
        <div className="rounded-lg bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    SKU
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Quantity
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedItem(item)}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {item.sku}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          item.status === 'Low Stock'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-green-50 text-green-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Item Details
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">SKU</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.sku}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Category</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Quantity</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Minimum Quantity</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.minQuantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedItem.status}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-ftai-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ftai-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ftai-blue"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 