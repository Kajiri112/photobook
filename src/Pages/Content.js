import React from "react";
import Main from "./Content/Main";
import { Switch, Route } from "react-router-dom";
import './Content.css'

function Content() {
  return (
    <div className="content">
      <Switch>
        <Route path="/about"></Route>
        <Route path="/users"></Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default Content;
