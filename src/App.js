import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Signup from "./pages/Signup";
import AuthRoute from "./routes/AuthRoute";
import GuestRoute from "./routes/GuestRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        <Route
          path="/products"
          element={
            <AuthRoute>
              <Products />
            </AuthRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <AuthRoute>
              <Orders />
            </AuthRoute>
          }
        />

      </Routes>
    </BrowserRouter>

  );
}
