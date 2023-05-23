import { useEffect, useRef, useState } from "react";
import { useActiveGame } from "../../contexts/ActiveGameProvider";
import { GAME_STATUS } from "../../data/constants";
import "./game-card.css";

export default function GameCard({
  card,
  allImagesLoaded,
  imageLoaded,
  showScorePoint,
  setLastClickedCard,
  setScrollPosition,
  lastClickedCard,
}) {
  const { activeGame, backSideOfCards, clickCard, clickedGameCards } =
    useActiveGame();

  const [frontSideImgSrc, setFrontSideImgSrc] = useState(null);
  const showImageFront =
    activeGame.status !== GAME_STATUS.NEW_GAME && allImagesLoaded;
  const cardContainerRef = useRef();

  useEffect(() => {
    setFrontSideImgSrc(`/images/decks/${card}`);
  }, [card]);

  useEffect(() => {
    if (activeGame.status === GAME_STATUS.LOST) {
      if (card === lastClickedCard) {
        cardContainerRef.current.classList.add("red-border");
      } else if (
        clickedGameCards.findIndex((clickedCard) => clickedCard === card) !== -1
      ) {
        cardContainerRef.current.classList.add("green-border");
      }
    }
  }, [activeGame.status, lastClickedCard]);

  function onCardClick() {
    clickCard(card);
    setLastClickedCard(card);
    setScrollPosition(window.pageYOffset);
  }

  function onImageLoad() {
    imageLoaded();
  }

  return (
    <div
      onClick={onCardClick}
      className={`game-card-container ${showImageFront ? "active" : ""}`}
      ref={cardContainerRef}
    >
      {showScorePoint && <span className="score-point">+1</span>}
      <img src={backSideOfCards} className={showImageFront ? "d-none" : ""} />
      <img
        src={frontSideImgSrc}
        onLoad={onImageLoad}
        className={!showImageFront ? "d-none" : ""}
      />
    </div>
  );
}
