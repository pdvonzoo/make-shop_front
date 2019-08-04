import React from "react";
import { Helmet } from "react-helmet";
import Menu from "./Menu";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children
}) => (
  <div>
    <Menu />
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
