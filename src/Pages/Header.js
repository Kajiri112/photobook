import React from 'react';
import './Header.css';
import lg from '../assets/LG.png';

function Header() {
  return (
    <div className="header">
        <div className="headerLink"><a href="https://www.instagram.com/kajiji/?hl=en">Instagram</a></div>
        <div><a href="http://localhost:3000/"><img className="logo" src={lg} /></a></div>
        <div className="headerLink"><a href="#">Über Mich</a></div>
    </div>
  );
}

export default Header;
