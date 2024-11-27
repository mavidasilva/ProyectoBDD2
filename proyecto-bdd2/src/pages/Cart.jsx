import { useState, useEffect } from "react";
import CartList from "../components/CartList";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartProducts(cart);
  }, []);

  const handleRemoveProduct = (productId) => {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setCartProducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleOrder = () => {
    const baseUrl = "https://api.whatsapp.com/send?phone=584242524333&text=";
    let orderText = "Hola, quisiera ordenar lo siguiente:\n\n";

    cartProducts.forEach((product, index) => {
      if (product.description == "") {
        orderText += `${index + 1}. ${product.name} - ${
          product.quantity
        } unidades - ${(product.price * product.quantity).toFixed(2)}\n\n`;
      } else {
        orderText += `${index + 1}. ${product.name} - ${
          product.quantity
        } unidades - ${(product.price * product.quantity).toFixed(
          2
        )}\nDetalle: ${product.description}\n\n`;
      }
    });
    orderText += `Total: ${totalAmount.toFixed(2)}$`;
    window.location.href = `${baseUrl}${encodeURIComponent(orderText)}`;
  };

  if (cartProducts.length === 0) {
    return (
      <p className="text-center text-lg mt-10">
        No hay productos en el carrito
      </p>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <CartList
        products={cartProducts}
        onRemoveProduct={handleRemoveProduct}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <div className="mt-8 text-right">
        <p className="text-2xl font-semibold mb-4">
          Total: {totalAmount.toFixed(2)}$
        </p>
        <button
          onClick={handleOrder}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Hacer pedido
        </button>
      </div>
    </div>
  );
};

export default Cart;
