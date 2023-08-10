import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";


function StudyCardList({ cards = [] }) {
    const params = useParams();
    const history = useHistory();
    const [side, setSide] = useState(true);
    const [cardNum, setCardNum] = useState(0);


    let card = cards[cardNum]

    const flipHandler = () => {
        setSide(!side);
    }

    const nextHandler = () => {
        setCardNum(cardNum + 1);
        if (cardNum + 1 < cards.length) {
            setSide(true);
        } else {
            if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
                history.go(0);
            } else {
                history.push("/");
            }
        }
        
        
        
        
    }
    if (cards.length < 3) {
        return (
            <div>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link to={`/decks/${params.deckId}/cards/new`} type="btn" className="btn btn-primary"><span className="bi bi-plus-lg"></span>Add Cards</Link>
            </div>
        )
    }
    if (side === true) {
        return (
        <div>
            <div className="card col-12">
                <div className="card-body">
                    <h4 className="card-title">
                        Card {cards.indexOf(card) + 1} of {cards.length}
                    </h4>
                    <p className="card-text">{card.front}</p>
                    <button type="button" className="btn btn-secondary" onClick={flipHandler}>
                        Flip
                    </button>
                </div>
            </div>
        </div>
        );
    } else if (side === false) {
        return (
            <div>
                <div className="card col-12">
                    <div className="card-body">
                        <h4 className="card-title">
                            Card {cards.indexOf(card) + 1} of {cards.length}
                        </h4>
                        <p className="card-text">{card.back}</p>
                        <button type="button" className="btn btn-secondary" onClick={flipHandler}>
                            Flip
                        </button>
                        <button type="button" className="btn btn-primary mx-1" onClick={nextHandler}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            );
    } else if (side === "end") {
        return <p>Hi</p>
    }
    
}

export default StudyCardList;
