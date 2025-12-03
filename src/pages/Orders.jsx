import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { connectSocket } from "../services/pusher";
import { useGetOrdersQuery } from "../services/api";
import products from "../products.json";
import './../style.css';
import { Link } from "react-router-dom";

export default function Orders() {
  const { data: orders = [], refetch } = useGetOrdersQuery();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;
    const userId = JSON.parse(atob(token.split(".")[1])).sub;

    const echo = connectSocket(token, userId, (updatedOrder) => {
      refetch();
    });

    return () => {
      echo.disconnect();
    };
  }, [token]);

  const getStatusClass = (status = "") => {
    const s = status.toLowerCase();

    if (["pending"].includes(s)) return "status-pending";
    if (["completed", "complete", "confirmed"].includes(s)) return "status-completed";
    if (["cancelled", "canceled", "cancel"].includes(s)) return "status-cancelled";

    return "";
  };

  const getProductName = (product_id) => {
    const product = products.find((p) => p.id === product_id);
    return product ? product.name : product_id;
  };

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <Link to="/products" className="back-btn">
        ← Back to Product Listing
      </Link>

      {orders.length === 0 && (
        <p className="no-orders">No orders yet.</p>
      )}

      {orders.map((o) => (
        <div key={o.id} className="order-card">
          <div>
            <b>Product:</b> {getProductName(o.product_id)}
          </div>
          <div>
            <b>Status:</b>{" "}
            <span className={`order-status ${getStatusClass(o.status)}`}>
              {o.status}
            </span>
          </div>
          <div>
            <b>Created At:</b> {new Date(o.created_at).toLocaleString()}
          </div>
          <div>
            <b>Updated At:</b> {new Date(o.updated_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
