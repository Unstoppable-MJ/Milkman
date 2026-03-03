export default function ImageCard({ image, title, subtitle, onDelete }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
      <div className="h-32 w-full bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="font-semibold">{title}</div>
        {subtitle ? <div className="text-sm text-gray-500 mt-1">{subtitle}</div> : null}
        {onDelete ? (
          <button
            onClick={onDelete}
            className="mt-3 text-red-600 hover:underline"
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
