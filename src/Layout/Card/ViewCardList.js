import React from "react";
import ViewCard from "./ViewCard";

function ViewCardList({ cards = [] }) {

  const viewCards = cards.map((card) => <ViewCard key={card.id} card={card} />);

  return (
    <div>
        <h1>Cards</h1>
        <div className="row pt-2 col-12">{viewCards}</div>
    </div>
  );
}

export default ViewCardList;
