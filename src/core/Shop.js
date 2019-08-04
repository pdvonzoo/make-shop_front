import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./apiCore";
import Card from "./Card";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";
import Search from "./Search";

const CategoryFilter = styled.ul`
  display: flex;
  height: 5rem;
  align-items: center;
`;

const PriceFilter = styled.div`
  width: 70%;
  margin: 6rem auto 0;
  padding: 2rem 0;
  border: 1px solid #000;
`;

const Shop = ({ match }) => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = newFilters => {
    getFilteredProducts(skip, limit, newFilters).then(data => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = newFilters => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(data.size);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
    >
      <Search />
      <div className="row">
        <div className="col-3">
          <PriceFilter>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </PriceFilter>
        </div>
        <div className="col-9">
          <CategoryFilter>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </CategoryFilter>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div className="col-4">
                <Card key={product._id} product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Shop);
