import { useEffect, useState } from "react";
import API from "../services/api";

export default function Shop() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const { data } = await API.get("/product/");
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = existingCart.findIndex(
      (i) => i.id === product.id
    );

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 p-10">

      <h1 className="text-4xl font-bold mb-12 text-gray-800">
        🛒 Shop Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {products.map((product) => {

const price = Number(product.price);

const finalPrice =
  product.discount_percent > 0
    ? price - (price * Number(product.discount_percent)) / 100
    : price;
          return (
            <div
              key={product.id}
              className="group relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-white/40"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={
                    product.image
                      ? `http://127.0.0.1:8000${product.image}`
                      : "https://via.placeholder.com/400x300"
                  }
                  alt={product.name}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Discount Badge */}
                {product.discount_percent > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {product.discount_percent}% OFF
                  </div>
                )}

                {/* Stock Badge */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-1 rounded-full text-sm font-semibold shadow">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-4">

                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {product.name}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.description}
                </p>

                {/* PRICE */}
                <div className="flex items-center justify-between">
                  <div>
                    {product.discount_percent > 0 && (
                      <p className="text-gray-400 line-through text-sm">
                        ₹{product.price}
                      </p>
                    )}
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{finalPrice.toFixed(2)}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500">
                    {product.stock} pcs
                  </span>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl disabled:bg-gray-400"
                >
                  {product.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart 🛒"}
                </button>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}