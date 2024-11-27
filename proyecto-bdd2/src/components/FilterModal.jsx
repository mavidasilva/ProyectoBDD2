import { useState, useEffect } from "react";

const FilterModal = ({ show, onClose, onApply }) => {
  const [filterType, setFilterType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [minPrice, maxPrice, filterType]);

  const handleApply = () => {
    const min = minPrice === "" ? 0 : parseFloat(minPrice);
    const max = maxPrice === "" ? Number.MAX_VALUE : parseFloat(maxPrice);

    if (isNaN(min) || isNaN(max)) {
      setError("Por favor, ingrese valores numéricos válidos.");
      return;
    }

    if (max < min) {
      setError("El precio máximo debe ser mayor o igual al precio mínimo.");
      return;
    }

    onApply({ filterType, minPrice: min, maxPrice: max });
    onClose();
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setMinPrice(value);
    } else {
      setError("Por favor, ingrese valores numéricos válidos.");
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setMaxPrice(value);
    } else {
      setError("Por favor, ingrese valores numéricos válidos.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Filtros</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Filtrar por tipo</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccione un Producto</option>
            <option value="Hamburguesa">Hamburguesa</option>
            <option value="Pollo">Pollo</option>
            <option value="Combo">Combo</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Rango de precio</label>
          <input
            type="text"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleApply}
          className="w-full bg-red-600 text-white p-2 rounded"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
