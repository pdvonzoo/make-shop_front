import React from "react";
import styled from "styled-components";
import { API } from "../config";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 140%;
  margin-bottom: 1rem;
  overflow: hidden;
  background-color: #000;
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const ShowImage = ({ item, url }) => (
  <Container>
    <Image src={`${API}/${url}/photo/${item._id}`} alt={item.name} />
  </Container>
);

export default ShowImage;
