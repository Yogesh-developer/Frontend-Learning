import Cart from "./src/Cart";
import { renderToString } from "react-dom/server";
function RenderCart() {
  return renderToString(<Cart />);
}

export default RenderCart;
