import React from "react";
import "./Burger.css";
import { slide as Menu } from "react-burger-menu";

function Burger() {
  return (
    <Menu>
      <a id="home" className="menu-item" href="http://localhost:3000/">
        Home
      </a>
      <a id="about" className="menu-item" href="http://localhost:3000/about">
        Über Mich
      </a>
      <a id="contact" className="menu-item" href="http://localhost:3000/reisen">
        Reisen
      </a>
      <a id="contact" className="menu-item" href="http://localhost:3000/figuren">
        Figuren
      </a>
      <a id="contact" className="menu-item" href="http://localhost:3000/tiere">
        Tiere
      </a>
      <a id="contact" className="menu-item" href="http://localhost:3000/diverses">
        Diverses
      </a>
      <a id="contact" className="menu-item" href="https://www.instagram.com/kajiji/?hl=en">
        Instagram
      </a>
      <a className="menu-item--small" href="">
      </a>
    </Menu>
  );
}

export default Burger;
