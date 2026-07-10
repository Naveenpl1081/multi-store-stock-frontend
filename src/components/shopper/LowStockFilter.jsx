import { useState } from "react";

const LowStockFilter = ({ onFilter, onClear }) => {
  const [threshold, setThreshold] = useState("");

  const handleApply = (e) => {
    e.preventDefault();
    onFilter(threshold);
  };

  const handleClear = () => {
    setThreshold("");
    onClear();
  };

  return (
    <form onSubmit={handleApply} className="flex items-center gap-3 mb-4">
      <input
        type="number"
        min="0"
        placeholder="Low-stock threshold"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500 w-48"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900"
      >
        Filter
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        Clear
      </button>
    </form>
  );
};

export default LowStockFilter;