import { useState } from "react";

const AdjustStockForm = ({ products, stores, onSubmit, loading, error }) => {
  const [productId, setProductId] = useState("");
  const [storeId, setStoreId] = useState("");
  const [delta, setDelta] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ productId, storeId, delta: Number(delta) });
    setDelta("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">Adjust Stock</h3>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-md mb-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-3">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500"
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.sku})
            </option>
          ))}
        </select>

        <select
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          required
          className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500"
        >
          <option value="">Select store</option>
          {stores.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Delta (+/-)"
          value={delta}
          onChange={(e) => setDelta(e.target.value)}
          required
          className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {loading ? "Adjusting..." : "Adjust"}
      </button>
    </form>
  );
};

export default AdjustStockForm;