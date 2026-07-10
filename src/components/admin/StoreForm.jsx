import { useState } from "react";

const StoreForm = ({ onSubmit, loading, error }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">Add Store</h3>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-md mb-3">
          {error}
        </div>
      )}

      <div className="flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Store name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {loading ? "Adding..." : "Add Store"}
      </button>
    </form>
  );
};

export default StoreForm;