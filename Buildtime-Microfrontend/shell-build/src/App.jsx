import { useState } from "react";
import { Products } from "@buildmfa/products-build";
import { Header } from "@buildmfa/header-build";
import { Cart } from "@buildmfa/cart-build";
import "@buildmfa/header-build/index.css";
import "@buildmfa/products-build/index.css";
import "@buildmfa/cart-build/index.css";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Products />
      <Cart />
    </>
  );
}

export default App;
