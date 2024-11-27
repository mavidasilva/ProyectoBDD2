import CartProductCard from "./CartProductCard";

const CartList = ({ products, onRemoveProduct, onUpdateQuantity }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <CartProductCard
          key={product.id}
          product={product}
          onRemove={onRemoveProduct}
          onQuantityChange={onUpdateQuantity}
        />
      ))}
    </div>
  );
};

export default CartList;
