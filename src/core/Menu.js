import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import styled from "styled-components";

const Container = styled.div`
  padding: 0.5rem 0;
  background-color: #fbebcd;
`;

const Nav = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  & a {
    font-weight: bold;
    color: #005b55;
  }
  & span {
    font-weight: bold;
    color: #005b55;
  }
`;

const CartNum = styled.small`
  font-size: 0.8rem;
  font-weight: bold;
`;

const Menu = ({ history }) => (
  <Container>
    <Nav>
      <NavItem>
        <Link to="/">Home</Link>
      </NavItem>
      <NavItem>
        <Link to="/shop">Shop</Link>
      </NavItem>
      <NavItem>
        <Link to="/cart">
          Cart
          <sup>
            <CartNum>{itemTotal()}</CartNum>
          </sup>
        </Link>
      </NavItem>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <NavItem>
          <Link to="/user/dashboard">Dashboard</Link>
        </NavItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <NavItem>
          <Link to="/admin/dashboard">Dashboard</Link>
        </NavItem>
      )}

      {!isAuthenticated() && (
        <div>
          <NavItem>
            <Link to="/signin">Signin</Link>
          </NavItem>
          {/* <NavItem>
            <Link
             
              to="/signup"
            >
              Signup
            </Link>
          </NavItem> */}
        </div>
      )}
      {isAuthenticated() && (
        <NavItem>
          <span
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </span>
        </NavItem>
      )}
    </Nav>
  </Container>
);

export default withRouter(Menu);
