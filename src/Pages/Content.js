import React from "react";
import Main from "./Content/Main";
import Photopage from "./Content/Photopage";
import { Switch, Route } from "react-router-dom";
import "./Content.css";
import About from "./Content/About";

function Content() {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="/">
          <Photopage />
        </Route>
      </Switch>
    </div>
  );
}

export default Content;
