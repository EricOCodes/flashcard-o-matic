import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCardList from "./StudyCardList";

function Study() {
    const [deck, setDeck] = useState({})
    const params = useParams();

    
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(params.deckId)
            const deckFromAPI = await response;
            setDeck(deckFromAPI)
        }
        loadDeck();
    }, [params.deckId])

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/"><span className="bi bi-house-door-fill"></span>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
          <Link to={`/decks/${params.deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item text-secondary">
              Study
          </li>
        </ol>
      </nav>
      <div>
        <h1>Study: {deck.name}</h1>
        <StudyCardList cards={deck.cards} />
      </div>
      <div>
        
      </div>
    </div>  
  );
}

export default Study;
