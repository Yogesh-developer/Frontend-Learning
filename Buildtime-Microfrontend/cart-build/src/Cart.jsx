import React, { useState, useEffect } from "react";
import "./cart.css";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Sony WH-1000XM5",
      price: 29999,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
    },
  ]);

  useEffect(() => {
    const handleAddItem = (event) => {
      const product = event.detail;
      if (!product || !product.id) return;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === product.id);
        if (existingIndex > -1) {
          return prevItems.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [
            ...prevItems,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            },
          ];
        }
      });
    };

    window.addEventListener("cart:add-item", handleAddItem);
    return () => window.removeEventListener("cart:add-item", handleAddItem);
  }, []);

  // Broadcast cart count for other microfrontends (e.g. Header)
  useEffect(() => {
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    window.dispatchEvent(
      new CustomEvent("cart:count-changed", { detail: count })
    );
  }, [items]);

  const updateQuantity = (id, delta) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? (subtotal > 20000 ? 0 : 499) : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">
          Shopping Cart <span className="cart-badge">{totalItemsCount} items</span>
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty__icon">🛒</div>
          <p>Your cart is empty</p>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>
            Click "Add to Cart" on any product to add it here
          </span>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item__img"
                />
                <div className="cart-item__info">
                  <h4 className="cart-item__name">{item.name}</h4>
                  <p className="cart-item__price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="cart-item__actions">
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="cart-qty-text">{item.quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button
              className="cart-checkout-btn"
              onClick={() => alert(`Proceeding to checkout with ${totalItemsCount} items!`)}
            >
              Checkout (₹{total.toLocaleString("en-IN")})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
