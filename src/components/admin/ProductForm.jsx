import { useState } from "react";

const ProductForm = ({ onSubmit, loading, error }) => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, sku });
    setName("");
    setSku("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">Add Product</h3>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-md mb-3">
          {error}
        </div>
      )}

      <div className="flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;