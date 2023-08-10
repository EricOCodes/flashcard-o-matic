import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../../utils/api";
import DeckCard from "./DeckCard";


function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const decksFromAPI = await listDecks();
      setDecks(decksFromAPI);
    }
    loadDecks();
  }, []);


  const cards = decks.map((deck) => <DeckCard key={deck.id} deck={deck} />);
  return (
    <div className="container">
        <Link to="/decks/new" type="button" className="btn btn-secondary"><span className="bi bi-plus-lg"></span>Create Deck</Link>
      <div className="row pt-2">{cards}</div>
    </div>
  );
}

export default DeckList;
