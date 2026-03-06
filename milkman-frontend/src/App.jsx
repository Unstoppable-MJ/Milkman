import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./hooks/useCart";

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;