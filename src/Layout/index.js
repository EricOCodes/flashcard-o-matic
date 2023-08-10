import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Deck/DeckList";
import Study from "./Study/Study";
import Deck from "./Deck/Deck";
import CreateDeck from "./Deck/CreateDeck";
import DeckEdit from "./Deck/DeckEdit";
import CardForm from "./Card/CardForm";
function Layout() {
  return (
    <section>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <div>
              <DeckList />
            </div>
          </Route>
          <Route path="/decks/new">
            <div>
              <CreateDeck />
            </div>
          </Route>
          <Route path="/decks/:deckId/study">
            <div>
              <Study />
            </div>
          </Route>
          <Route path="/decks/:deckId/edit">
            <div>
              <DeckEdit />
            </div>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <div>
              <CardForm />
            </div>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <div>
              <CardForm />
            </div>
          </Route>
          <Route path="/decks/:deckId">
            <div>
              <Deck />
            </div>
          </Route>
          <Route>
            <div>
              <NotFound />
            </div>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default Layout;
