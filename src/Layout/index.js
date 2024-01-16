import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "../screens/Home";
import Study from "../screens/Study";
import CreateDeck from "../screens/CreateDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
      <Switch>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
