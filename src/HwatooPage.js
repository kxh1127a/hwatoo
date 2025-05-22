import React, {useEffect, useState} from "react";
import axios from "axios";
import HwatooCard from "./components/HwatooCard";

const cards = [
    { name: '1월', imgName: '1.jpg', means: ['소식', '손님', '남자'] },
    { name: '2월', imgName: '2.jpg', means: ['님', '여자'] },
    { name: '3월', imgName: '3.jpg', means: ['외출', '혼란', '만남'] },
    { name: '4월', imgName: '4.jpg', means: ['싸움', '무관심'] },
    { name: '5월', imgName: '5.jpg', means: ['결혼', '이성'] },
    { name: '6월', imgName: '6.jpg', means: ['기쁨', '호감'] },
    { name: '7월', imgName: '7.jpg', means: ['행운', '돈'] },
    { name: '8월', imgName: '8.jpg', means: ['어둠', '저녁'] },
    { name: '9월', imgName: '9.jpg', means: ['술'] },
    { name: '10월', imgName: '10.jpg', means: ['근심', '풍파', '바람'] },
    { name: '11월', imgName: '11.jpg', means: ['돈', '복'] },
    { name: '12월', imgName: '12.jpg', means: ['손님', '눈물'] },
];

export default function HwatooPage() {
    const [mixCards, setMixCards] = useState([]);
    const [pickCards, setPickCards] = useState([]);
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('page created!');
        return () => console.log('page dead!');
    }, []);

    // 카드 섞기
    const handleMixCards = () => {
        const shuffled = [...cards]
            .map(card => ({ ...card, selected: false }))
            .sort(() => Math.random() - 0.5);
        setMixCards(shuffled);
        setPickCards([]);
        setResponse("");
    };

    // 카드 선택
    const handlePickCard = (cardName) => {
        if (pickCards.length >= 2) {
            alert("최대 두 장의 카드만 선택할 수 있습니다.");
            return;
        }
        const updatedCards = mixCards.map(card =>
            card.name === cardName ? { ...card, selected: true } : card
        );
        setMixCards(updatedCards);
        setPickCards([...pickCards, updatedCards.find(card => card.name === cardName)]);
    };

    // 다시하기 (초기화)
    const handleReset = () => {
        setMixCards([]);
        setPickCards([]);
        setResponse("");
    };

    // AI 운세 요청
    const handleConfirm = async () => {
        if (pickCards.length === 2) {
            setIsLoading(true);
            const means = pickCards.flatMap(card => card.means).join(", ");
            const command = `${means} 이라는 단어들을 가지고 5줄 정도의 문장을 만들어줘`;

            const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
            const apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + apiKey;
            const data = { "contents": [{ "parts": [{ "text": command }] }] };

            try {
                const res = await axios.post(apiUrl, data);
                const generatedText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "응답을 가져올 수 없습니다.";
                setResponse(generatedText);
            } catch (err) {
                setResponse("API 콜 실패");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            {mixCards.length === 0 ? (
                <button onClick={handleMixCards}>카드섞기</button>
            ) : (
                <div>
                    <h1>카드를 선택하세요</h1>
                    {mixCards.map((card) => (
                        <HwatooCard key={card.name} card={card} onClickFunc={handlePickCard}/>
                    ))}
                    {pickCards.length === 2 && (
                        <div>
                            <button onClick={handleConfirm}>운세보기</button>
                            <button onClick={handleReset}>다시하기</button>
                            {isLoading && <p>운세를 가져오는 중...</p>}
                            {response && <p>{response}</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
