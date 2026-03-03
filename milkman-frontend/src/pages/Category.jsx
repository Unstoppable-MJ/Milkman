import { useEffect, useState } from "react";
import API from "../services/api";
import ImageCard from "../components/ImageCard";
import { imageForCategory, DEFAULT_MILK_CATEGORIES } from "../constants/categoryImages";

export default function Category() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await API.get("/category/category/");
      setItems(data);
    } catch {
      setError("Failed to load categories");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await API.post("/category/category/", { name, description, is_active: true });
      setName("");
      setDescription("");
      load();
    } catch {
      setError("Failed to add category");
    }
  };

  const remove = async (id) => {
    try {
      await API.delete(`/category/category/${id}/`);
      load();
    } catch {
      setError("Failed to delete category");
    }
  };

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500">Organize your products by type</p>
        </div>
        <button
          onClick={async () => {
            for (const c of DEFAULT_MILK_CATEGORIES) {
              try {
                await API.post("/category/category/", { ...c, is_active: true });
              } catch {}
            }
            load();
          }}
          className="btn-secondary"
        >
          <span>🚀</span> Quick Add Presets
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl">{error}</div>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((c) => (
          <ImageCard
            key={c.id}
            image={imageForCategory(c.name)}
            title={c.name}
            subtitle={c.description}
            onDelete={() => remove(c.id)}
          />
        ))}

        {/* Inline Add Card */}
        <div className="glass-card p-6 border-2 border-dashed border-slate-200 hover:border-brand-primary/40 transition-colors flex flex-col justify-center items-center min-h-[240px] group">
          <form onSubmit={add} className="w-full space-y-4">
            <div className="text-center mb-2">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform">➕</div>
              <h3 className="font-bold text-slate-900 mt-2">New Category</h3>
            </div>
            <input
              className="input text-sm"
              placeholder="Name (e.g. Cheese)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="input text-sm"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="w-full btn-primary py-2 text-sm">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
