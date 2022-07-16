import React from "react";
import "./game-board-overlay.css";
export default function GameBoardOverlay(props) {
  
    return (
        <div className="game-board-overlay">
            {props.status === "new" && (
                <div className="overlay-content start-overlay" onClick={props.runGame}>
                    <p>Press anywhere to start</p>
                </div>
            )}
            {(props.status === "loading" || props.status==="running") && (
                <div className="overlay-content loading-overlay">
                    <div className="spinner"></div>
                    <p>Loading Images {"("}{props.loadedImages}/{props.cardsCount}{")"}</p>
                </div>
            )}
            {props.status === "lose" && (
                <div className="overlay-content">
                    <p>You selected the same card twice.</p>
                    <p>
                        Your score is {props.score} in {props.time} seconds
                    </p>
                    <div className="options">
                        <button onClick={props.startNewGame}>Restart</button>
                    </div>
                </div>
            )}
            {props.status === "win" && (
                <div className="overlay-content">
                    <p>Congratulations You have selected all cards.</p>
                    <p>
                        Your score is {props.score} in {props.time} seconds
                    </p>
                    <div className="options">
                        <button onClick={props.startNewGame}>Restart</button>
                    </div>
                </div>
            )}
        </div>
    );
}
