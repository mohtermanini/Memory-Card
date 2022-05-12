import React, { useState } from "react";
import AppStorage from "../../helpers/storage";
import Footer from "../Footer/Footer";
import GameBoard from "../GameBoard/GameBoard";
import GameDetails from "../GameDetails/GameDetails";
import OptionsModal from "../Modals/OptionsModal/OptionsModal";
import { CSSTransition } from "react-transition-group";
import "./app.css";
import Decks from "../../helpers/decks";

export default function App() {
    const [deck, setDeck] = useState(Decks.DECKS_INNER_NAMES[0]);
    const [cardsCount, setCardsCount] = useState(
        Decks.MIN_CARDS_NUMBER[Decks.DECKS_INNER_NAMES[0]],
    );
    const [highestScore, setHighestScore] = useState(AppStorage.getHighestScore(deck));
    const [highestScoreTime, setHighestScoreTime] = useState(AppStorage.getHighestScoreTime(deck));
    const [showOptionsModal, setShowOptionsModal] = useState(true);
    const [showRules, setShowRules] = useState(true);
    const [gameNumber, setGameNumber] = useState(1);

    function openOptionsModal() {
        setShowOptionsModal(true);
    }

    function closeOptionsModal() {
        setShowOptionsModal(false);
    }

    function setOptions(selectedDeck, selectedCardsCount) {
        if (selectedDeck === deck && selectedCardsCount === cardsCount) {
            return;
        }
        setDeck(selectedDeck);
        setCardsCount(selectedCardsCount);
        setHighestScore(AppStorage.getHighestScore(selectedDeck));
        setHighestScoreTime(AppStorage.getHighestScoreTime(selectedDeck));
        startNewGame();
    }

    function gameEnded(score, time) {
        if (
            score > highestScore ||
            (score === parseFloat(highestScore) && time < highestScoreTime)
        ) {
            AppStorage.setHighestScore(deck, score);
            AppStorage.setHighestScoreTime(deck, time);
            setHighestScore(score);
            setHighestScoreTime(time);
        }
    }

    function startNewGame() {
        setGameNumber(gameNumber + 1);
    }

    function hideRules() {
        setShowRules(false);
    }

    return (
        <>
            <CSSTransition
                in={showOptionsModal}
                timeout={300}
                classNames="modal-fade"
                unmountOnExit
            >
                <OptionsModal
                    closeOptionsModal={closeOptionsModal}
                    deck={deck}
                    cardsCount={cardsCount}
                    setOptions={setOptions}
                />
            </CSSTransition>
            <header className="app-header">
                <h1>Memory Card</h1>
            </header>
            <GameDetails
                deck={deck}
                highestScore={highestScore}
                highestScoreTime={highestScoreTime}
                openOptionsModal={openOptionsModal}
            />
            <CSSTransition in={showRules} timeout={500} classNames="fade" unmountOnExit>
                <div className="rules-alert">
                    <div className="rules">
                        Rules: Click on all cards without clicking any card more than once.
                    </div>
                    <button className="btn-close" onClick={hideRules}>
                        X
                    </button>
                </div>
            </CSSTransition>
            <main>
                <section id="section-board">
                    <GameBoard
                        key={gameNumber}
                        deck={deck}
                        cardsCount={cardsCount}
                        gameEnded={gameEnded}
                        startNewGame={startNewGame}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
}
