export default function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500">{title}</h3>
        {icon ? <span className="text-2xl">{icon}</span> : null}
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
