
import Table from '../../components/Table';
import { Eye, Trash2 } from 'lucide-react';

const salesData = [
  { id: 1, customer: 'Customer A', amount: 1500, status: 'Shipped' },
  { id: 2, customer: 'Customer B', amount: 2500, status: 'Pending' },
  { id: 3, customer: 'Customer C', amount: 500, status: 'Shipped' },
  { id: 4, customer: 'Customer D', amount: 3500, status: 'Delivered' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Shipped':
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{status}</span>;
    case 'Pending':
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">{status}</span>;
    case 'Delivered':
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{status}</span>;
    default:
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
  }
};

export default function SalesPage() {
  const headers = ['Order ID', 'Customer', 'Amount', 'Status', 'Actions'];

  const renderRow = (order) => (
    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${order.amount}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(order.status)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 mr-4"><Eye size={20} /></button>
        <button className="text-red-600 hover:text-red-900"><Trash2 size={20} /></button>
      </td>
    </tr>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Sales Orders</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Add New Order</button>
      </div>
      <Table headers={headers} data={salesData} renderRow={renderRow} />
    </div>
  );
}
