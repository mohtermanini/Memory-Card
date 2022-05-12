import React, { useState } from "react";
import "./game-card.css";

export default function GameCard(props) {
    const [isClicked, setClicked] = useState(false);
    function onCardClick() {
        if (props.status !== "running") {
            return;
        }
        if (!isClicked) {
            setClicked(true);
            props.successCardClick();
        } else {
            props.failedCardClick();
        }
    }

    function onImageLoad() {
        props.imageLoaded();
    }

    return (
        <div
            onClick={onCardClick}
            className={`game-card-container ${
                props.status === "new" || !props.allImagesLoaded ? "" : "active"
            }`}
        >
            <img
                src={require(`../../img/decks/${props.deck}/back.png`)}
                alt=""
                className={props.status === "new" || !props.allImagesLoaded ? "" : "d-none"}
            />

            {props.status !== "new" && (
                <img
                    src={require(`../../img/decks/${props.deck}/${props.card}.png`)}
                    alt=""
                    onLoad={onImageLoad}
                    className={props.allImagesLoaded ? "" : "d-none"}
                />
            )}
        </div>
    );
}
