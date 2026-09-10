import "./App.css";
import Products from "products/Products";
import Header from "header/Header";
import Cart from "cart/Cart";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="shell-layout">
        <section className="shell-products-section">
          <div className="shell-section-header">
            <h2 className="shell-section-title">Featured Products</h2>
            <p className="shell-section-subtitle">Browse premium gadgets and study essentials</p>
          </div>
          <Products />
        </section>

        <aside className="shell-cart-section">
          <Cart />
        </aside>
      </main>
    </div>
  );
}

export default App;
