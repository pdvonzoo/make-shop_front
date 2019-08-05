import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { list } from "./apiCore";
import Card from "./Card";

const SearchContainer = styled.div`
  padding-top: 1rem;
  height: 8rem;
  background-color: #fbebcd;
`;

const Form = styled.form`
  position: relative;
  padding: 1rem;
  display: flex;
`;

const Input = styled.input`
  width: 17rem;
  height: 4rem;
  padding-left: 1rem;
  font-size: 1.1rem;
  border: 1px solid #000;
  background-color: unset;
  outline: none;
`;

const Btn = styled.button`
  transform: translateX(-110%);
  background-color: unset;
  border: 0;
  font-size: 1.1rem;
`;

const Search = ({ history }) => {
  const [data, setData] = useState({
    search: "",
    results: [],
    searched: false
  });

  const { search, results, searched } = data;

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: "All" }).then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
    history.push(`/shop/${search}`);
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  // const searchedProducts = (results = []) => {
  //   return (
  //     <div>
  //       <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
  //       <div className="row">
  //         {results.map((product, i) => (
  //           <Card key={product._id} product={product} />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };
  const searchForm = () => (
    <Form onSubmit={searchSubmit}>
      <Input
        type="search"
        onChange={handleChange("search")}
        placeholder="Search by name"
      />
      <Btn>
        <FontAwesomeIcon icon={faSearch} />
      </Btn>
    </Form>
  );

  return (
    <div>
      <SearchContainer>{searchForm()}</SearchContainer>
      {/* <div>{searchedProducts(results)}</div> */}
    </div>
  );
};

export default withRouter(Search);
