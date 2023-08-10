import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard() {
    const [deck, setDeck] = useState({
        name: "",
        description: "",
      });
      const [card, setCard] = useState({
        front: "",
        back: "",
      });
      const params = useParams();

    useEffect(() => {
        async function loadElements() {
          const deckResponse = await readDeck(params.deckId);
          const deckFromAPI = await deckResponse;
          setDeck(deckFromAPI);
          if (params.cardId) {
            const cardResponse = await readCard(params.cardId);
            const cardFromAPI = await cardResponse;
            setCard(cardFromAPI);
          }
        }
        loadElements();
      }, [params.deckId, params.cardId]);

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
                    Edit Card {card.id}
                </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <CardForm />
        </div>
    );
}

export default EditCard;