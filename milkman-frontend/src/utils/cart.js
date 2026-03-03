export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  
  export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  export const addToCart = (product) => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);
  
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    saveCart(cart);
  };
  
  export const removeFromCart = (id) => {
    const cart = getCart().filter((item) => item.id !== id);
    saveCart(cart);
  };
  
  export const updateQuantity = (id, qty) => {
    const cart = getCart().map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    saveCart(cart);
  };
  
  export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce(
      (total, item) => total + item.discounted_price * item.quantity,
      0
    );
  };