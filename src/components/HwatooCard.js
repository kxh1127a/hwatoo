import React, { useEffect } from "react";

export default function HwatooCard({ card, onClickFunc }) {

    useEffect(() => {
        console.log(`${card.name} created!`);
        return () => console.log(`${card.name} deleted!`);
    }, [card.name]);

    return (
        <div
            key={card.name}
            onClick={() => onClickFunc(card.name)}
            style={{
                border: card.selected ? "2px solid red" : "none",
                display: "inline-block",
                margin: "5px",
                cursor: "pointer"
            }}
        >
            {card.selected ? (
                <div>
                    <img src={`/images/${card.imgName}`} alt={card.name}/>
                    <p>{card.name}</p>
                </div>
            ) : (
                <div>
                    <img src={`/images/back.jpg`} alt="back"/>
                </div>
            )}
        </div>
    )
}