import React from 'react';
import './Header.css';
import lg from '../assets/LG.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
        <div><Link to="/"><img className="logo" src={lg} /></Link></div>
    </div>
  );
}

export default Header;
