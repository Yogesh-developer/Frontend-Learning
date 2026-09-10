import React, { useState } from "react";
import "./product.css";

const Product = ({ product }) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      window.dispatchEvent(
        new CustomEvent("cart:add-item", {
          detail: product,
        })
      );
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <div className="product-card__image-box">
        <img
          src={product?.image}
          alt={product?.name}
          className="product-card__image"
          loading="lazy"
        />
        {product?.category && (
          <span className="product-card__badge">{product.category}</span>
        )}
      </div>

      <div className="product-card__body">
        {product?.brand && (
          <span className="product-card__brand">{product.brand}</span>
        )}
        <h3 className="product-card__title" title={product?.name}>
          {product?.name}
        </h3>

        {product?.rating && (
          <div className="product-card__rating">
            <span className="product-card__stars">★ {product.rating}</span>
            {product?.reviews && (
              <span className="product-card__reviews">
                ({product.reviews.toLocaleString("en-IN")})
              </span>
            )}
          </div>
        )}

        <div className="product-card__footer">
          <div className="product-card__price-box">
            <span className="product-card__price">
              ₹{product?.price ? product.price.toLocaleString("en-IN") : "0"}
            </span>
          </div>

          <button
            className={`product-card__btn ${
              added ? "product-card__btn--added" : ""
            }`}
            onClick={handleAddToCart}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
