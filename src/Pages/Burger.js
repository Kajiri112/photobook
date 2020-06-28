import React from "react";
import "./Burger.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

function Burger() {
  return (
    <Menu>
      <Link id="home" className="menu-item" to="/">
        Home
      </Link>
      <Link id="about" className="menu-item" to="/about">
        Über Mich
      </Link>
      <Link id="contact" className="menu-item" to="/reisen">
        Reisen
      </Link>
      <Link id="contact" className="menu-item" to="/figuren">
        Figuren
      </Link>
      <Link id="contact" className="menu-item" to="/tiere">
        Tiere
      </Link>
      <Link id="contact" className="menu-item" to="/diverses">
        Diverses
      </Link>
      <a id="contact" className="menu-item" href="https://www.instagram.com/kajiji/?hl=en">
        Instagram
      </a>
    </Menu>
  );
}

export default Burger;
