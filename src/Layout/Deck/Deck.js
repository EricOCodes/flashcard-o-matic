import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import ViewCardList from "../Card/ViewCardList";

function Deck() {
  const [deck, setDeck] = useState({});
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function studyData() {
      const response = await readDeck(params.deckId);
      const deckFromAPI = await response;
      setDeck(deckFromAPI);
    }
    studyData();
  }, [params.deckId]);

  const clickHandler = async () => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(params.deckId);
      history.push("/");
    }
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/">
              <span className="bi bi-house-door-fill"></span>Home
            </Link>
          </li>
          <li className="breadcrumb-item text-secondary" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>

        <Link
          to={`/decks/${params.deckId}/edit`}
          className="btn btn-secondary mx-1"
        >
          <span className="bi bi-pencil-fill"></span>
          Edit
        </Link>
        <Link
          to={`/decks/${params.deckId}/study`}
          className="btn btn-primary mx-1"
        >
          <span className="bi bi-journal-bookmark-fill"></span>
          Study
        </Link>
        <Link
          to={`/decks/${params.deckId}/cards/new`}
          className="btn btn-primary mx-1"
        >
          <span className="bi bi-plus-lg"></span>Add Cards
        </Link>
        <button className="btn btn-danger mx-1" onClick={clickHandler}>
          <span className="bi bi-trash"></span>
        </button>
      </div>
      <div>
        <ViewCardList cards={deck.cards} />
      </div>
    </div>
  );
}

export default Deck;
