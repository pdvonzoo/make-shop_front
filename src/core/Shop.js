import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

const Shop = () => {
  return (
    <Layout
      title="Home Page"
      description="Node React E-commnerce App"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">left sidbar</div>
        <div className="col-8">right</div>
      </div>
    </Layout>
  );
};

export default Shop;
