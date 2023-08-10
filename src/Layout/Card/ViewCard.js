import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";


function ViewCard ({ card }) {
    const params = useParams();
    const history = useHistory();
    
    const clickHandler = async () => {
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
            await deleteCard(card.id);
            history.go(0);
        }
    }

    return (
        <div className="card col-12">
            <div className="card-body">
                <div className="row">
                    <div className="col">{card.front}</div>
                    <div className="col">{card.back}</div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to={`/decks/${params.deckId}/cards/${card.id}/edit`} className="btn btn-secondary mx-1"><span className="bi bi-pencil-fill"></span>Edit</Link>
                    <button type="button" onClick={clickHandler} className="btn btn-danger mx-1"><span className="bi bi-trash"></span></button>
                </div>     
            </div>
        </div>
    )
}

export default ViewCard;