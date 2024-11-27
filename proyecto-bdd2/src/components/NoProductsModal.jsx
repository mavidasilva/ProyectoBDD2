const NoProductsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-bold mb-4">No se encontraron productos</h2>
        <p>No se encontraron productos con las características deseadas.</p>
        <button
          onClick={onClose}
          className="w-full mt-4 bg-red-600 text-white p-2 rounded"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default NoProductsModal;
