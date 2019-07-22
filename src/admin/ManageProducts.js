import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const ManageProducts = () => {
  return (
    <Layout
      title="Manage Product"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <div className="row">
        <div>...</div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
