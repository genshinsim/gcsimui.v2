import React from "react";
import "App.css";
import { Route, Switch } from "wouter";
import Sim from "features/sim/Sim";
import Nav from "features/nav/Nav";
import Team from "features/team/Team";
import Importer from "features/import/Importer";
import Result from "features/result/Results";

function App() {
  return (
    <div className=".bp3-dark text-white mx-auto h-full">
      <Nav />
      <Switch>
        <Route path="/" component={Team} />
        <Route path="/sim" component={Sim} />
        <Route path="/import" component={Importer} />
        <Route path="/result" component={Result} />
      </Switch>
    </div>
  );
}

export default App;
