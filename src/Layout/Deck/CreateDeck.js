import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
    const [deck, setDeck] = useState({
      name: "",
      description: ""
    });
  const history = useHistory();
  
  const changeHandler = (event) => {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await createDeck(deck);
    history.push("/");
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
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
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
              placeholder="Deck Name"
              value={deck.name}
              onChange={changeHandler}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description
            <br />
            <textarea
              className="form-control"
              style={{ width: "400px" }}
              type="text"
              id="description"
              name="description"
              placeholder="Brief description of the deck"
              value={deck.description}
              onChange={changeHandler}
            />
          </label>
        </div>
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="m-2 btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
