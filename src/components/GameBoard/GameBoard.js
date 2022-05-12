import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Decks from "../../helpers/decks";
import GameBoardOverlay from "../GameBoardOverlay/GameBoardOverlay";
import GameCard from "../GameCard/GameCard";
import "./game-board.css";

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export default function GameBoard(props) {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [cards, setCards] = useState(createCards);
    const [status, setStatus] = useState("new");
    const [loadedImages, setLoadedImages] = useState(0);

    useEffect(() => {
        if (status === "running") {
            const collapsedTimeInterval = setInterval(() => {
                setTime(
                    (previousTime) =>
                        Math.round((previousTime + 0.01 + Number.EPSILON) * 100) / 100,
                );
            }, 10);
            return () => {
                clearInterval(collapsedTimeInterval);
            };
        }
    }, [status]);

    function createCards() {
        const allCards = [];
        for (let i = 1; i <= Decks.CARDS_NUMBER[props.deck]; i++) {
            const num = (i < 10 ? "0" : "") + i;
            allCards.push(num);
        }
        shuffle(allCards);
        const newCards = [];
        for (let i = 0; i < props.cardsCount; i++) {
            newCards.push(allCards[i]);
        }
        return newCards;
    }

    function shuffleCards() {
        shuffle(cards);
        setCards([...cards]);
    }

    useEffect(() => {
        if (score === props.cardsCount) {
            setStatus("win");
            endGame();
            return;
        }
        shuffleCards();
    }, [score]);

    function cardClick() {
        const scrollPosition = window.scrollY;
        setTimeout(() => {
            window.scrollTo({
                top: scrollPosition,
            });
        }, 0);
    }

    function successCardClick() {
        cardClick();
        setScore((previousScore) => previousScore + 1);
    }

    function failedCardClick() {
        cardClick();
        setStatus("lose");
        endGame();
    }

    function runGame() {
        setStatus("loading");
    }

    function endGame() {
        props.gameEnded(score, time);
    }

    useEffect(() => {
        if (loadedImages === props.cardsCount) {
            setStatus("running");
        }
    }, [loadedImages]);

    function imageLoaded() {
        setLoadedImages((previousLoadedImages) => previousLoadedImages + 1);
    }

    return (
        <>
            <div className="board">
                <CSSTransition
                    in={status !== "running"}
                    timeout={200}
                    classNames="board-fade"
                    unmountOnExit
                >
                    <GameBoardOverlay
                        runGame={runGame}
                        status={status}
                        score={score}
                        time={time}
                        cardsCount={props.cardsCount}
                        loadedImages={loadedImages}
                        startNewGame={props.startNewGame}
                    />
                </CSSTransition>
                <div className="board-details">
                    <p>Score: {score}</p>/
                    <p>
                        Time: <span className="time">{time}</span>{" "}
                    </p>
                </div>
                <div className="board-cards">
                    {cards.map((card) => {
                        return (
                            <GameCard
                                key={card}
                                deck={props.deck}
                                card={card}
                                status={status}
                                successCardClick={successCardClick}
                                failedCardClick={failedCardClick}
                                imageLoaded={imageLoaded}
                                allImagesLoaded={loadedImages === props.cardsCount}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
