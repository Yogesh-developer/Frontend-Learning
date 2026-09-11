import products from "../utils/product";
import Product from "./Product";
import "./product.css";

const Products = () => {
  return (
    <div className="productList">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
