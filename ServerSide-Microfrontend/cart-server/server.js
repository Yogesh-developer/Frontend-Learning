import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import RenderCart from "./dist/server-entry.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Enable CORS for cross-origin client scripts and stylesheets
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "dist/client")));

app.get("/", (req, res) => {
  const htmlCart = RenderCart();
  res.send(`
    <section id="cart-root">
     ${htmlCart}
    </section>
  `);
});

app.listen(4003, () => {
  console.log("Cart server running on http://localhost:4003");
});
