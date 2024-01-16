import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../screens/Home";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Home />
      </div>
    </>
  );
}

export default Layout;
