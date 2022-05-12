import React from "react";
import Decks from "../../helpers/decks";
import "./game-details.css";

export default function GameDetails(props) {
    return (
        <>
            <div className="game-details">
                <h2>{Decks.DECK_NAMES[props.deck]}</h2>
                <p>
                    Highest score: {props.highestScore} in {props.highestScoreTime} seconds
                </p>
                <div className="options">
                    <button onClick={props.openOptionsModal}>Change options</button>
                </div>
            </div>
        </>
    );
}
