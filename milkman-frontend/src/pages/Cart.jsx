import API from "../services/api";
import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
} from "../utils/cart";
export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const refreshCart = () => {
    setCart(getCart());
  };

  const handleQuantity = (id, change) => {
    const item = cart.find((i) => i.id === id);
    const newQty = item.quantity + change;

    if (newQty < 1) return;

    updateQuantity(id, newQty);
    refreshCart();
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    refreshCart();
  };
  const handleCheckout = async () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      alert("Please login to place order");
      return;
    }
  
    try {
      for (let item of cart) {
        await API.post("/order/buy/", {
          product: item.id,
          quantity: item.quantity,
        });
      }
  
      localStorage.removeItem("cart");
      setCart([]);
  
      alert("Order placed successfully 🎉");
    } catch (err) {
      console.log("Checkout error:", err);
      alert("Error placing order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center text-xl mt-20">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">🛒 Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-xl p-6 mb-6 flex justify-between items-center"
        >
          <div>
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-gray-500">
              ₹{item.discounted_price}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => handleQuantity(item.id, -1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <span className="font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => handleQuantity(item.id, 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold text-lg">
              ₹{item.discounted_price * item.quantity}
            </p>

            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 mt-3"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right text-2xl font-bold mt-8">
        Total: ₹{getCartTotal()}
      </div>

      <button
  onClick={handleCheckout}
  className="bg-green-600 text-white px-8 py-3 rounded-lg mt-6 float-right"
>
  Checkout
</button>
    </div>
  );
}