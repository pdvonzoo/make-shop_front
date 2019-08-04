import React, { useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  min-width: 4rem;
  margin-right: 0.5rem;
  padding: 0.6rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  background-color: #000;
  color: #fff;
  text-align: center;
  cursor: pointer;
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;
`;

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  console.log(checked);
  const handleToggle = c => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  const isChecked = id => {
    return checked.includes(id)
      ? { color: "#000", backgroundColor: "#fff" }
      : { color: "#fff", backgroundColor: "#000" };
  };

  return categories.map((c, i) => (
    <li key={c._id} className="list-unstyled">
      <Label style={isChecked(c._id)}>
        <Input
          onChange={handleToggle(c._id)}
          value={checked.indexOf(c._id === -1)}
          type="checkbox"
        />
        {c.name}
      </Label>
    </li>
  ));
};

export default Checkbox;
