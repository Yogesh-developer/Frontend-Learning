import React from "react";
import { hydrateRoot } from "react-dom/client";
import Products from "./src/Products.jsx";

function hydrate() {
  const root = document.getElementById("products-root");
  if (root) {
    hydrateRoot(root, <Products />);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hydrate);
} else {
  hydrate();
}

