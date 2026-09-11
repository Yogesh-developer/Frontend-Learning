import React from "react";
import Products from "./src/Products";
import { renderToString } from "react-dom/server";

export function RenderProducts() {
  return renderToString(<Products />);
}

export default RenderProducts;
