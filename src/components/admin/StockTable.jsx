const StockTable = ({ stock }) => {
    if (stock.length === 0) {
      return <p className="text-sm text-gray-500">No stock records found.</p>;
    }
  
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Product</th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">SKU</th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Store</th>
              <th className="text-right px-4 py-2 font-medium text-gray-600">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item._id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-2 text-gray-900">{item.product?.name}</td>
                <td className="px-4 py-2 text-gray-500">{item.product?.sku}</td>
                <td className="px-4 py-2 text-gray-900">{item.store?.name}</td>
                <td className="px-4 py-2 text-right font-medium text-gray-900">
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default StockTable;