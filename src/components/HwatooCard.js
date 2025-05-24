import React from "react";
import "./HwatooCard.css";

export default function HwatooCard({ card, onClickFunc }) {
    return (
        <div
            onClick={() => onClickFunc(card.name)}
            className={`hwatoo-card ${card.selected ? "selected" : ""}`}
        >
            <img
                src={card.selected ? `/images/${card.imgName}` : `/images/back.jpg`}
                alt={card.name}
            />
            <p className={`card-text ${card.selected ? "visible" : ""}`}>
                {card.selected ? card.name : "\u00A0"}
            </p>
        </div>
    );
}
