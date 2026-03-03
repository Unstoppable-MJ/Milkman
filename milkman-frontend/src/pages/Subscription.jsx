import { useEffect, useState } from "react";
import API from "../services/api";

export default function Subscription() {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [{ data: subs }, { data: custs }, { data: prods }] = await Promise.all([
        API.get("/subscription/subscription/"),
        API.get("/customer/customer/"),
        API.get("/product/product/"),
      ]);
      setItems(subs);
      setCustomers(custs);
      setProducts(prods);
    } catch {
      setError("Failed to load subscriptions");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await API.post("/subscription/subscription/", {
        customer: Number(customerId),
        product: Number(productId),
        quantity: Number(quantity) || 1,
        is_active: true,
      });
      setCustomerId("");
      setProductId("");
      setQuantity(1);
      load();
    } catch {
      setError("Failed to add subscription");
    }
  };

  const remove = async (id) => {
    try {
      await API.delete(`/subscription/subscription/${id}/`);
      load();
    } catch {
      setError("Failed to delete subscription");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Subscriptions</h1>
      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">{error}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded shadow">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="table-head text-left">
                <th className="p-3">Customer</th>
                <th className="p-3">Product</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="table-row">
                  <td className="p-3">{s.customer}</td>
                  <td className="p-3">{s.product}</td>
                  <td className="p-3">{s.quantity}</td>
                  <td className="p-3">
                    <button onClick={() => remove(s.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <form onSubmit={add} className="bg-white rounded shadow p-4 space-y-3">
          <h2 className="font-semibold mb-2">Add Subscription</h2>
          <select
            className="input"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option value="" disabled>Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            className="input"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="" disabled>Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            className="input"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className="w-full btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
