import React from "react";
import { renderToString } from "react-dom/server";
import Header from "./src/Header.jsx";

export function renderHeader() {
  return renderToString(<Header />);
}
