import React from 'react';
import './Header.css';
import lg from '../assets/LG.png';

function Header() {
  return (
    <div className="header">
        <div><a href="http://localhost:3000/"><img className="logo" src={lg} /></a></div>
    </div>
  );
}

export default Header;
