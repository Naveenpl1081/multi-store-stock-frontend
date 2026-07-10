import { useState, useEffect, useCallback } from "react";
import { createProductRequest, getProductsRequest } from "../../api/product.api";
import { adjustStockRequest, getStockRequest, transferStockRequest } from "../../api/stock.api";
import { createStoreRequest, getStoresRequest } from "../../api/store.api";
import AdjustStockForm from "../../components/admin/AdjustStockForm";
import ProductForm from "../../components/admin/ProductForm";
import StockTable from "../../components/admin/StockTable";
import StoreForm from "../../components/admin/StoreForm";
import TransferStockForm from "../../components/admin/TransferStockForm";
import Navbar from "../../components/common/Navbar";
import LowStockFilter from "../../components/shopper/LowStockFilter";


const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [stock, setStock] = useState([]);

  const [productError, setProductError] = useState("");
  const [storeError, setStoreError] = useState("");
  const [adjustError, setAdjustError] = useState("");
  const [transferError, setTransferError] = useState("");

  const [productLoading, setProductLoading] = useState(false);
  const [storeLoading, setStoreLoading] = useState(false);
  const [adjustLoading, setAdjustLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);

  const loadAll = useCallback(async (threshold) => {
    const [productsData, storesData, stockData] = await Promise.all([
      getProductsRequest(),
      getStoresRequest(),
      getStockRequest({ threshold }),
    ]);
    setProducts(productsData);
    setStores(storesData);
    setStock(stockData);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleCreateProduct = async ({ name, sku }) => {
    setProductError("");
    setProductLoading(true);
    try {
      await createProductRequest({ name, sku });
      await loadAll();
    } catch (err) {
      setProductError(err.response?.data?.error?.message || "Failed to create product");
    } finally {
      setProductLoading(false);
    }
  };

  const handleCreateStore = async ({ name }) => {
    setStoreError("");
    setStoreLoading(true);
    try {
      await createStoreRequest({ name });
      await loadAll();
    } catch (err) {
      setStoreError(err.response?.data?.error?.message || "Failed to create store");
    } finally {
      setStoreLoading(false);
    }
  };

  const handleAdjustStock = async ({ productId, storeId, delta }) => {
    setAdjustError("");
    setAdjustLoading(true);
    try {
      await adjustStockRequest({ productId, storeId, delta });
      await loadAll();
    } catch (err) {
      setAdjustError(err.response?.data?.error?.message || "Failed to adjust stock");
    } finally {
      setAdjustLoading(false);
    }
  };

  const handleTransferStock = async ({ productId, fromStoreId, toStoreId, quantity }) => {
    setTransferError("");
    setTransferLoading(true);
    try {
      await transferStockRequest({ productId, fromStoreId, toStoreId, quantity });
      await loadAll();
    } catch (err) {
      setTransferError(err.response?.data?.error?.message || "Failed to transfer stock");
    } finally {
      setTransferLoading(false);
    }
  };

  const handleFilter = (threshold) => loadAll(threshold);
  const handleClearFilter = () => loadAll();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <ProductForm onSubmit={handleCreateProduct} loading={productLoading} error={productError} />
          <StoreForm onSubmit={handleCreateStore} loading={storeLoading} error={storeError} />
        </div>

        <AdjustStockForm
          products={products}
          stores={stores}
          onSubmit={handleAdjustStock}
          loading={adjustLoading}
          error={adjustError}
        />

        <TransferStockForm
          products={products}
          stores={stores}
          onSubmit={handleTransferStock}
          loading={transferLoading}
          error={transferError}
        />

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Stock Levels</h3>
          <LowStockFilter onFilter={handleFilter} onClear={handleClearFilter} />
          <StockTable stock={stock} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;