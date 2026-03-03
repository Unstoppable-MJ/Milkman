import { useEffect, useState } from "react";
import API from "../services/api";

export default function Customers() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await API.get("/customer/customer/");
      setItems(data);
    } catch {
      setError("Failed to load customers");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await API.post("/customer/customer/", form);
      setForm({ name: "", email: "", phone: "", address: "", password: "" });
      load();
    } catch {
      setError("Failed to add customer");
    }
  };

  const remove = async (id) => {
    try {
      await API.delete(`/customer/customer/${id}/`);
      load();
    } catch {
      setError("Failed to delete customer");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">{error}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded shadow">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="table-head text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id} className="table-row">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">
                    <button onClick={() => remove(c.id)} className="text-red-600 hover:underline">
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
          <h2 className="font-semibold mb-2">Add Customer</h2>
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="w-full btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
