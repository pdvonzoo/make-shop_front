import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import styled from "styled-components";

const Container = styled.div`
  padding: 0.5rem 0;
  background-color: #fce9cd;
`;

const Nav = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  & a {
    font-weight: bold;
    color: #005b55;
  }
`;

const Menu = ({ history }) => (
  <Container>
    <Nav className="nav">
      <NavItem className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </NavItem>
      <NavItem className="nav-item">
        <Link className="nav-link" to="/shop">
          Shop
        </Link>
      </NavItem>
      <NavItem className="nav-item">
        <Link className="nav-link" to="/cart">
          Cart
          <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup>
        </Link>
      </NavItem>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <NavItem className="nav-item">
          <Link className="nav-link" to="/user/dashboard">
            Dashboard
          </Link>
        </NavItem>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <NavItem className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link>
        </NavItem>
      )}

      {!isAuthenticated() && (
        <div>
          <NavItem className="nav-item">
            <Link className="nav-link" to="/signin">
              Signin
            </Link>
          </NavItem>
          {/* <NavItem className="nav-item">
            <Link
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </NavItem> */}
        </div>
      )}
      {isAuthenticated() && (
        <NavItem className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
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
