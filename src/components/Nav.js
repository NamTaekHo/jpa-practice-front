import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div id="nav-body">
      <span id="title">
        <img id="logo" src="../logo.png" alt="logo" />
        <span id="name">Cafe</span>
      </span>
      <div id="menu">
        <Link to="/coffees">커피목록</Link>
        <Link to="/members">회원목록</Link>
        <Link to="/orders">주문목록</Link>
      </div>
    </div>
  );
}

export default Nav;
