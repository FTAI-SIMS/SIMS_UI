import { useState } from 'react';
import Layout from '../components/Layout';

const suppliers = [
  'Select Supplier',
  'Boeing',
  'Airbus',
  'GE Aviation',
  'Pratt & Whitney',
  'Other',
];

const items = [
  { id: 'ABC123', description: 'Boeing 737 Landing Gear' },
  { id: 'DEF456', description: 'Aviation Tool Kit' },
  { id: 'GHI789', description: 'Aircraft Paint' },
];

export default function GoodsReceipt() {
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState(suppliers[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement actual submission logic
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setSelectedItem('');
      setQuantity('');
      setSupplier(suppliers[0]);
      setNotes('');
    }, 1000);
  };

  const selectedItemDetails = items.find((item) => item.id === selectedItem);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Goods Receipt</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add new inventory manually
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-lg bg-white shadow">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="item" className="block text-sm font-medium text-gray-700">
                    Part Number
                  </label>
                  <select
                    id="item"
                    name="item"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-ftai-blue focus:outline-none focus:ring-ftai-blue sm:text-sm"
                    required
                  >
                    <option value="">Select Part Number</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.id} - {item.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ftai-blue focus:ring-ftai-blue sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                    Supplier/Source
                  </label>
                  <select
                    id="supplier"
                    name="supplier"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-ftai-blue focus:outline-none focus:ring-ftai-blue sm:text-sm"
                    required
                  >
                    {suppliers.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ftai-blue focus:ring-ftai-blue sm:text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem('');
                      setQuantity('');
                      setSupplier(suppliers[0]);
                      setNotes('');
                    }}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md bg-ftai-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ftai-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ftai-blue disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Item Preview */}
          <div className="rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Item Preview
              </h3>
              {selectedItemDetails ? (
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Part Number</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedItemDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedItemDetails.description}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 text-center text-sm text-gray-500">
                  Select a part number to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 