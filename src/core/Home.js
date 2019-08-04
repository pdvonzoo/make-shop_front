import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Heading2 = styled.h2`
  padding-left: 1rem;
  margin: 4rem 0 2rem;
  font-size: 1.4rem;
`;

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    getProducts({ sortBy: "sold", limit: 4 }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts({ sortBy: "createdAt", limit: 4 }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);
  return (
    <Layout
      title="Home Page"
      description="Node React E-commnerce App"
      className="container-fluid"
    >
      <Heading2>Recently Added</Heading2>
      <CardList>
        {productsByArrival.map((product, i) => (
          <div className="col-3">
            <Card
              key={product._id}
              product={product}
              showAddToCartButton={false}
              showQuantity={false}
            />
          </div>
        ))}
      </CardList>
      <Heading2>Best Sellers</Heading2>
      <CardList>
        {productsBySell.map(product => (
          <div className="col-3">
            <Card
              key={product._id}
              product={product}
              showAddToCartButton={false}
              showQuantity={false}
            />
          </div>
        ))}
      </CardList>
    </Layout>
  );
};
export default Home;
