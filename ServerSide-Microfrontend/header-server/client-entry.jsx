import React from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./src/Header.jsx";

function hydrate() {
  const root = document.getElementById("header-root");
  if (root) {
    hydrateRoot(root, <Header />);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hydrate);
} else {
  hydrate();
}

