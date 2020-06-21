import React from "react";
import Main from "./Content/Main";
import Photopage from "./Content/Photopage";
import { Switch, Route } from "react-router-dom";
import './Content.css'
import About from "./Content/About";

function Content() {
  return (
    <div className="content">
      <Switch>
        <Route path="/about">
          <About name="about" />
        </Route>
        <Route path="/users"></Route>
        <Route path="/reisen">
          <Photopage name="reisen" />
        </Route>
        <Route path="/figuren">
          <Photopage name="figuren" />
        </Route>
        <Route path="/tiere">
          <Photopage name="tiere" />
        </Route>
        <Route path="/diverses">
          <Photopage name="diverses" />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default Content;
