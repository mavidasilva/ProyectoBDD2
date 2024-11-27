import { FaTrash } from "react-icons/fa";
import QuantitySelector from "./QuantitySelector";

const CartProductCard = ({ product, onRemove, onQuantityChange }) => {
  const handleRemove = () => {
    onRemove(product.id);
  };

  return (
    <div className="cart-product-card flex items-center justify-between p-4 bg-white rounded-lg shadow-md relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <QuantitySelector
          product={product}
          quantity={product.quantity}
          setQuantity={(newQuantity) =>
            onQuantityChange(product.id, newQuantity)
          }
        />
      </div>
      <div className="text-lg font-semibold text-right">
        {(product.price * product.quantity).toFixed(2)}$
      </div>
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartProductCard;
