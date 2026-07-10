import { useState, useEffect, useCallback } from "react";
import { getProductsRequest } from "../../api/product.api";
import { getStockRequest } from "../../api/stock.api";
import StockTable from "../../components/admin/StockTable";
import Navbar from "../../components/common/Navbar";
import LowStockFilter from "../../components/shopper/LowStockFilter";



const ShopperDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState([]);
  const [error, setError] = useState("");

  const loadAll = useCallback(async (threshold) => {
    try {
      const [productsData, stockData] = await Promise.all([
        getProductsRequest(),
        getStockRequest({ threshold }),
      ]);
      setProducts(productsData);
      setStock(stockData);
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to load data");
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleFilter = (threshold) => loadAll(threshold);
  const handleClearFilter = () => loadAll();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Products</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
            {products.map((p) => (
              <div key={p._id} className="px-4 py-3 flex justify-between text-sm">
                <span className="text-gray-900">{p.name}</span>
                <span className="text-gray-500">{p.sku}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Stock by Store</h3>
          <LowStockFilter onFilter={handleFilter} onClear={handleClearFilter} />
          <StockTable stock={stock} />
        </div>
      </div>
    </div>
  );
};

export default ShopperDashboardPage;