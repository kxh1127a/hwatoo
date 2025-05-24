import React, { useState } from "react";
import HwatooCard from "./components/HwatooCard";
import "./HwatooPage.css";

const cards = [
    /* 기존 카드 배열 */
];

export default function HwatooPage() {
    const [mixCards, setMixCards] = useState([]);
    const [pickCards, setPickCards] = useState([]);

    const handleMixCards = () => {
        const shuffled = [...cards]
            .map(card => ({ ...card, selected: false }))
            .sort(() => Math.random() - 0.5);
        setMixCards(shuffled);
        setPickCards([]);
    };

    const handlePickCard = (cardName) => {
        if (pickCards.length >= 2) {
            alert("최대 두 장만 선택 가능합니다.");
            return;
        }
        const updatedCards = mixCards.map(card =>
            card.name === cardName ? { ...card, selected: true } : card
        );
        setMixCards(updatedCards);
        setPickCards([...pickCards, updatedCards.find(card => card.name === cardName)]);
    };

    const handleReset = () => {
        setMixCards([]);
        setPickCards([]);
    };

    return (
        <div className="hwatoo-page">
            {mixCards.length === 0 ? (
                <button className="hwatoo-button" onClick={handleMixCards}>
                    카드 섞기
                </button>
            ) : (
                <>
                    <div className="cards-wrapper">
                        {mixCards.map(card => (
                            <HwatooCard key={card.name} card={card} onClickFunc={handlePickCard} />
                        ))}
                    </div>

                    {pickCards.length > 0 && (
                        <>
                            <h3>선택한 카드</h3>
                            <div className="cards-wrapper selected">
                                {pickCards.map(card => (
                                    <HwatooCard key={card.name} card={{ ...card, selected: true }} onClickFunc={() => {}} />
                                ))}
                            </div>
                        </>
                    )}

                    <button className="hwatoo-button" onClick={handleReset}>
                        다시하기
                    </button>
                </>
            )}
        </div>
    );
}
