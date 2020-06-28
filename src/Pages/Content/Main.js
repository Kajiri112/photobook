import React, { useRef } from 'react';
import './Main.css';
import Header from '../Header';
import reisen from '../../assets/Reisen.jpg';
import figuren from '../../assets/Figuren.jpg';
import tiere from '../../assets/Tiere.jpg';
import diverses from '../../assets/Diverses.jpg';
import { Link } from 'react-router-dom';

function Main() {
    const myRef = useRef(null)

  return (
    <div className="main">
        <div className="titleImage">
            <Header/>
            <button className="scrollButton" onClick={() => window.scrollTo(0, myRef.current.offsetTop)}>Scroll</button>
        </div>
        <div className="panelContainer" ref={myRef}>
            <div className="column"><Link to="/reisen"><img className="panel" src={reisen} /></Link></div>
            <div className="column"><Link to="/figuren"><img className="panel" src={figuren} /></Link></div>
            <div className="column"><Link to="/tiere"><img className="panel" src={tiere} /></Link></div>
            <div className="column"><Link to="/diverses"><img className="panel" src={diverses} /></Link></div>
        </div>
    </div>
  );
}

export default Main;
