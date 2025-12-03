import React from "react";
import products from "../products.json";
import { usePlaceOrderMutation } from "../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../style.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

export default function Products() {
  const navigate = useNavigate();
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const handleOrder = async (id) => {
    try {
      await placeOrder(id).unwrap();
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate('/orders');
    } catch (error) {
      toast.error("Failed to place order", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="products-container">
      <h2>Available Products</h2>
      <Link to="/orders" className="back-btn">
        My Orders
      </Link>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      <div className="products-grid">
        {products.map((p) => (
          <div className="card-product" key={p.id}>
            <img src={p.image} alt={p.name} />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description}</p>
              <div className="card-footer">
                <b>₹{p.price}</b>
                <button
                  className="btn-order"
                  disabled={isLoading}
                  onClick={() => handleOrder(p.id)}
                >
                  {isLoading ? "Placing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
