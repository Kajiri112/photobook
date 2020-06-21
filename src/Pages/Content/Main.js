import React, { useRef } from 'react';
import './Main.css';
import Header from '../Header';
import reisen from '../../assets/Reisen.jpg';
import figuren from '../../assets/Figuren.jpg';
import tiere from '../../assets/Tiere.jpg';
import diverses from '../../assets/Diverses.jpg';

function Main() {
    const myRef = useRef(null)

  return (
    <div className="main">
        <div className="titleImage">
            <Header/>
            <button className="scrollButton" onClick={() => window.scrollTo(0, myRef.current.offsetTop)}>Scroll</button>
        </div>
        <div className="panelContainer" ref={myRef}>
            <div className="column"><a href="http://localhost:3000/reisen"><img className="panel" src={reisen} /></a></div>
            <div className="column"><a href="http://localhost:3000/figuren"><img className="panel" src={figuren} /></a></div>
            <div className="column"><a href="http://localhost:3000/tiere"><img className="panel" src={tiere} /></a></div>
            <div className="column"><a href="http://localhost:3000/diverses"><img className="panel" src={diverses} /></a></div>
        </div>
    </div>
  );
}

export default Main;
