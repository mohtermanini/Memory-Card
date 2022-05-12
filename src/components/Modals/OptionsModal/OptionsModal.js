import React, { useState } from "react";
import Decks from "../../../helpers/decks";
import "../modals.css";
import "./options-modal.css";

export default function OptionsModal(props) {
    const [selectedDeck, setSelectedDeck] = useState(props.deck);
    const [selectedCardsCount, setSelectedCardsCount] = useState(props.cardsCount);

    function getAvailableCardsCount() {
        const availabeCardsCount = [];
        for (
            let i = Decks.MIN_CARDS_NUMBER[selectedDeck];
            i <= Decks.CARDS_NUMBER[selectedDeck];
            i++
        ) {
            availabeCardsCount.push(i);
        }
        return availabeCardsCount;
    }

    function onDeckChange(e) {
        const deck = e.target.value;
        if (
            selectedCardsCount < Decks.MIN_CARDS_NUMBER[deck] ||
            selectedCardsCount > Decks.CARDS_NUMBER[deck]
        ) {
            setSelectedCardsCount(Decks.MIN_CARDS_NUMBER[deck]);
        }
        setSelectedDeck(e.target.value);
    }

    function onCardsCountChange(e) {
        setSelectedCardsCount(parseInt(e.target.value, 10));
    }

    function onSubmit() {
        props.setOptions(selectedDeck, selectedCardsCount);
        props.closeOptionsModal();
    }

    return (
        <div className="modal-container" id="options-modal">
            <div className="modal">
                <div className="modal-header">
                    <h2>Game Options</h2>
                </div>
                <div className="modal-body">
                    <section className="game-options">
                        <div className="option">
                            <p className="option-title">Deck</p>
                            <select
                                name="deck"
                                id="deck"
                                onChange={onDeckChange}
                                value={selectedDeck}
                            >
                                {Decks.DECKS_INNER_NAMES.map((deck) => (
                                    <option key={deck} value={deck}>
                                        {Decks.DECK_NAMES[deck]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="option">
                            <p className="option-title">Number of cards</p>
                            <select
                                name="cards-count"
                                id="cards-count"
                                onChange={onCardsCountChange}
                                value={selectedCardsCount}
                            >
                                {getAvailableCardsCount().map((card) => (
                                    <option key={card} value={card}>
                                        {card}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </section>
                </div>
                <div className="modal-footer">
                    <div className="options">
                        {props.deck && <button onClick={props.closeOptionsModal}>Close</button>}
                        <button onClick={onSubmit}>Play</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
