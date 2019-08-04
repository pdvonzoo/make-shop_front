import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Container = styled.div``;

const Card = ({
  product,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showCartButton = showAddToCartButton => {
    return (
      showAddToCartButton && <button onClick={addToCart}>Add to Card</button>
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? <span>In Stock</span> : <span>Out of Stock</span>;
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      )
    );
  };

  return (
    <Link to={`/product/${product._id}`} className="mb-2">
      <Container>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <h3>{product.name}</h3>
        {showStock(product.quantity)}
        <p>${product.price}</p>
        <br />
        {showCartButton(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </Container>
    </Link>
  );
};
export default Card;
