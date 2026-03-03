const categoryImages = {
  "Cow Milk": "https://images.unsplash.com/photo-1515036551350-7ee49fa1f99c?q=80&w=1200&auto=format&fit=crop",
  "Buffalo Milk": "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
  "Goat Milk": "https://images.unsplash.com/photo-1559718052-33fd5d2a7eae?q=80&w=1200&auto=format&fit=crop",
  "Skimmed Milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop",
  "Toned Milk": "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=1200&auto=format&fit=crop",
  "Full Cream Milk": "https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=1200&auto=format&fit=crop",
};

export function imageForCategory(name) {
  return categoryImages[name] || "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=1200&auto=format&fit=crop";
}

export const DEFAULT_MILK_CATEGORIES = [
  { name: "Cow Milk", description: "Fresh and nutritious" },
  { name: "Buffalo Milk", description: "Rich and creamy" },
  { name: "Goat Milk", description: "Light and digestible" },
  { name: "Skimmed Milk", description: "Low fat daily milk" },
  { name: "Toned Milk", description: "Balanced fat and taste" },
  { name: "Full Cream Milk", description: "Extra creamy goodness" },
];
