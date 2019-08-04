import React, { useState } from "react";
import styled from "styled-components";
import { isSelector } from "postcss-selector-parser";

const Container = styled.div``;
const Label = styled.label`
  padding: 0.2rem 0 0.3rem 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
`;

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = event => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };
  const isSelector = target =>
    +value === target ? { color: "#005b55" } : { color: "#000000" };
  return prices.map((p, i) => (
    <Container key={p._id} className="list-unstyled">
      <Label style={isSelector(p._id)}>
        <Input
          onChange={handleChange}
          value={`${p._id}`}
          name={p}
          type="radio"
          className="mr-2 ml-4"
        />
        {p.name}
      </Label>
    </Container>
  ));
};

export default RadioBox;
