import React from "react";
import Main from "./Content/Main";
import Photopage from "./Content/Photopage";
import { Switch, Route } from "react-router-dom";
import './Content.css'

function Content() {
  return (
    <div className="content">
      <Switch>
        <Route path="/about"></Route>
        <Route path="/users"></Route>
        <Route path="/reisen">
          <Photopage name="reisen" />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default Content;
