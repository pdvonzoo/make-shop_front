import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Card from "./Card";
import { list } from "./apiCore";
import Layout from "./Layout";

const Searched = ({ match }) => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    searchData();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (match.params.searched) {
      list({
        search: match.params.searched || undefined,
        category: "All"
      }).then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          setResults(response);
        }
      });
    }
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };
  return (
    <Layout
      title="Searched Page"
      description="Search and find products of your choice"
    >
      {/* <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2> */}
      <div className="row">
        {!results.length ||
          results.map((product, i) => (
            <div className="col-4">
              <Card key={product._id} product={product} />
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default withRouter(Searched);
