import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Container = styled(Link)`
  width: 25%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 2rem;
  &:link {
    text-decoration: none;
  }
`;

const Heading3 = styled.h3`
  display: inline-block;
  font-size: 1.3rem;
  color: #000;
`;

const Price = styled.p`
  float: right;
  font-size: 1.3rem;
  color: #000;
`;

const Card = ({
  product,
  showAddToCartButton = true,
  showQuantity = true,
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
    <Container to={`/product/${product._id}`}>
      {shouldRedirect(redirect)}
      <ShowImage item={product} url="product" />
      {showQuantity && showStock(product.quantity)}
      <Heading3>{product.name}</Heading3>
      <Price>${product.price}</Price>
      <br />
      {showCartButton(showAddToCartButton)}
      {showRemoveButton(showRemoveProductButton)}
      {showCartUpdateOptions(cartUpdate)}
    </Container>
  );
};
export default Card;
