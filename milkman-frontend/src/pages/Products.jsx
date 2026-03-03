import { useEffect, useState } from "react";
import API from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount_percent: 0,
    category: "",
    image: null,
  });

  const loadProducts = async () => {
    const { data } = await API.get("/product/");
    setProducts(data);
  };

  const loadCategories = async () => {
    const { data } = await API.get("/category/");
    setCategories(data);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    await API.post("/product/", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      discount_percent: 0,
      category: "",
      image: null,
    });

    setPreview(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    await API.delete(`/product/${id}/`);
    loadProducts();
  };

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">Products</h1>

      {/* ADD PRODUCT FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />

        <input
          name="discount_percent"
          type="number"
          placeholder="Discount %"
          value={formData.discount_percent}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* 🔥 CATEGORY DROPDOWN */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          name="image"
          type="file"
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />

        {/* 🔥 IMAGE PREVIEW */}
        {preview && (
         <img
         src={`http://127.0.0.1:8000${product.image}`}
         alt={product.name}
         className="h-32 w-full object-cover rounded"
       />
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded shadow space-y-2"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-32 w-full object-cover rounded"
            />

            <h2 className="font-bold">{p.name}</h2>
            <p>₹{p.price}</p>
            <p className="text-sm text-gray-500">
              Stock: {p.stock}
            </p>

            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}