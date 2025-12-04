
import Table from '../../components/Table';
import { Eye, Edit } from 'lucide-react';

const customerData = [
  { id: 1, name: 'Customer A', email: 'customera@example.com' },
  { id: 2, name: 'Customer B', email: 'customerb@example.com' },
  { id: 3, name: 'Customer C', email: 'customerc@example.com' },
  { id: 4, name: 'Customer D', email: 'customerd@example.com' },
];

export default function CustomersPage() {
  const headers = ['Customer ID', 'Name', 'Email', 'Actions'];

  const renderRow = (customer) => (
    <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{customer.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 mr-4"><Eye size={20} /></button>
        <button className="text-gray-600 hover:text-gray-900"><Edit size={20} /></button>
      </td>
    </tr>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Customers</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Add New Customer</button>
      </div>
      <Table headers={headers} data={customerData} renderRow={renderRow} />
    </div>
  );
}
