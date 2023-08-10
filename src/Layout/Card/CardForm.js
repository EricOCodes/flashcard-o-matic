import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard, createCard } from "../../utils/api";

function CardForm() {
  const [deck, setDeck] = useState({
    name: "",
    description: "",
  });
  const [card, setCard] = useState({
    front: "",
    back: "",
  });
  const params = useParams();
  const history = useHistory();
  let title = "";
  let breadcrumbEnd = ""

  if (params.cardId) {
    title = "Edit Card";
    breadcrumbEnd = `Edit Card ${params.cardId}`;
  } else {
    title = "Add Card";
    breadcrumbEnd = "Add Card";
  }

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

  const changeHandler = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!params.cardId) {
      await createCard(params.deckId, card);
      setCard({
        front: "",
        back: "",
      });
    } else {
      await updateCard(card);
      history.push(`/decks/${params.deckId}`);
    }
  };
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
            {breadcrumbEnd}
          </li>
        </ol>
      </nav>
      <div>
        <h2>{title}</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="front">
              Front
              <br />
              <textarea
                className="form-control"
                style={{ width: "400px" }}
                rows="5"
                type="text"
                id="front"
                name="front"
                value={card.front}
                onChange={changeHandler}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="back">
              Back
              <br />
              <textarea
                className="form-control"
                style={{ width: "400px" }}
                rows="5"
                type="text"
                id="back"
                name="back"
                value={card.back}
                onChange={changeHandler}
              />
            </label>
          </div>
          <Link to={`/decks/${params.deckId}`} className="btn btn-secondary">
            Done
          </Link>
          <button type="submit" className="m-2 btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
