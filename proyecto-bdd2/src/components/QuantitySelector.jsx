
const QuantitySelector = ({ quantity, setQuantity }) => {
  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center border rounded-full bg-gray-100 px-3 py-1">
      <button
        onClick={handleRemove}
        className="px-2 py-1 text-gray-700 text-xl"
        disabled={quantity === 0}
      >
        -
      </button>
      <span className="px-4 text-xl">{quantity}</span>
      <button onClick={handleAdd} className="px-2 py-1 text-blue-600 text-xl">
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
