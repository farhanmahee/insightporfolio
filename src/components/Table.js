
export default function Table({ headers, data, renderRow }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => renderRow(item))}
        </tbody>
      </table>
    </div>
  );
}
