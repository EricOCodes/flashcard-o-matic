import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function DeckEdit() {
  const [deck, setDeck] = useState({
    name: "",
    description: ""
  });
  const params = useParams();
  const history = useHistory();


  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(params.deckId);
      const deckFromAPI = await response;
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  const changeHandler = (event) => {
    setDeck({ ...deck, [event.target.name]: event.target.value})
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`/decks/${params.deckId}`)

  }

  return (
    <div className="container">
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
          <li className="breadcrumb-item text-secondary">Edit</li>
        </ol>
      </nav>
      <div>
        <h2>Edit Deck</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">
              Name
              <br />
              <input
                className="form-control"
                style={{ width: "400px" }}
                type="text"
                id="name"
                name="name"
                onChange={changeHandler}
                value={deck.name}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
              <br />
              <textarea
                className="form-control"
                style={{ width: "400px" }}
                rows="5"
                type="text"
                id="description"
                name="description"
                onChange={changeHandler}
                value={deck.description}
              />
            </label>
          </div>
          <Link to={`/decks/${params.deckId}`} className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="m-2 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeckEdit;
