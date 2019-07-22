import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`}</h2>
        <hr />
        {items.map((product, i) => (
          <Card key={i} product={product} showAddToCartButton={false} />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Conticue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shoping Cart"
      description="Manege your cart items. Add remove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <p>show checkout options/shipping address/total/update quantity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
