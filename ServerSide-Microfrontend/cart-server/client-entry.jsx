import React from "react";
import { hydrateRoot } from "react-dom/client";
import Cart from "./src/Cart.jsx";

function hydrate() {
  const root = document.getElementById("cart-root");
  if (root) {
    hydrateRoot(root, <Cart />);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hydrate);
} else {
  hydrate();
}

