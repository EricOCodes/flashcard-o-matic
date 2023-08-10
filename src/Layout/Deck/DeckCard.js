import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function DeckCard({ deck }) {

  const history = useHistory();

  const clickHandler = async () => {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            await deleteDeck(deck.id);
            history.go(0);
        }
    }



  return (
    <div className="card col-12">
      <div className="card-body">
        <div className="row">
          <h5 className="card-title col">{deck.name}</h5>
          <p className="col-e">{deck.cards.length} cards</p>
        </div>
        
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
          <span className="bi bi-eye"></span>
          View
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-1">
          <span className="bi bi-journal-bookmark-fill"></span>
          Study
        </Link>
        <button type="button" className="btn btn-danger" onClick={clickHandler}>
          <span className="bi bi-trash"></span>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckCard;
