import React, { useState, useEffect } from "react";
import "./header.css";

const Header = () => {
  const [cartCount, setCartCount] = useState(1);

  useEffect(() => {
    const handleCountChange = (event) => {
      if (typeof event.detail === "number") {
        setCartCount(event.detail);
      }
    };

    window.addEventListener("cart:count-changed", handleCountChange);
    return () => window.removeEventListener("cart:count-changed", handleCountChange);
  }, []);

  return (
    <nav className="header">
      <div style={{ fontWeight: "700", fontSize: "18px", color: "#111827" }}>
        🛍️ Modern Store
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ cursor: "pointer", padding: "8px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#f9fafb" }}>
          Products
        </button>
        <button style={{ cursor: "pointer", padding: "8px 16px", borderRadius: "8px", border: "1px solid #6366f1", background: "#6366f1", color: "#fff", fontWeight: "600" }}>
          Cart {cartCount > 0 ? `(${cartCount})` : ""}
        </button>
      </div>
    </nav>
  );
};

export default Header;
