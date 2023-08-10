import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard() {
    const [deck, setDeck] = useState({
        name: "",
        description: "",
      });
      const params = useParams();

    useEffect(() => {
        async function loadElements() {
          const deckResponse = await readDeck(params.deckId);
          const deckFromAPI = await deckResponse;
          setDeck(deckFromAPI);
        }
        loadElements();
      }, [params.deckId]);

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                    <Link to="/">
                    <span className="bi bi-house-door-fill"></span>Home
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/decks/${params.deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Add Card
                </li>
                </ol>
            </nav>
            <h2>Add Card</h2>
            <CardForm />
        </div>
    );
}

export default AddCard;