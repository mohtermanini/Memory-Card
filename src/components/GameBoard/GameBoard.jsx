import { useEffect, useLayoutEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import GameBoardOverlay from "../GameBoardOverlay/GameBoardOverlay";
import GameCard from "../GameCard/GameCard";
import { useGameOptions } from "../../contexts/GameOptionsProvider";
import { useActiveGame } from "../../contexts/ActiveGameProvider";
import { GAME_STATUS, GAME_TYPES } from "../../data/constants";
import "./game-board.css";

export default function GameBoard() {
  const { gameOptions } = useGameOptions();
  const {
    activeGame,
    changeGameStatusAction,
    gameTimer,
    gameCards,
    clickedGameCards,
  } = useActiveGame();
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [lastClickedCard, setLastClickedCard] = useState(null);
  const [showScorePoint, setShowScorePoint] = useState(null);

  useEffect(() => {
    if (
      activeGame.status === GAME_STATUS.LOADING &&
      loadedImagesCount === gameCards.length
    ) {
      changeGameStatusAction(GAME_STATUS.RUNNING);
    }
  }, [gameOptions.chosenDecks, activeGame.status, loadedImagesCount]);

  useEffect(() => {
    if (activeGame.status === GAME_STATUS.RUNNING) {
      setShowScorePoint(lastClickedCard);
    }
  }, [clickedGameCards, activeGame.status]);

  useEffect(() => {
    if (activeGame.startNewRound) {
      setLoadedImagesCount(0);
      setLastClickedCard(null);
      setShowScorePoint(null);
      setCurrentRound(currentRound + 1);
    }
  }, [activeGame.startNewRound]);

  function imageLoaded() {
    setLoadedImagesCount((previousLoadedImages) => previousLoadedImages + 1);
  }

  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    if (activeGame.status === GAME_STATUS.RUNNING) {
      window.scrollTo({ top: scrollPosition });
    }
  }, [gameCards]);

  return (
    <>
      <div className="board">
        <CSSTransition
          in={activeGame.status !== GAME_STATUS.RUNNING}
          timeout={200}
          classNames="board-fade"
          unmountOnExit
        >
          <GameBoardOverlay loadedImagesCount={loadedImagesCount} />
        </CSSTransition>
        <div className="board-details">
          <div className="col-left">
            {gameOptions.gameType === GAME_TYPES.LEVELS ? (
              <p>Level {activeGame.level}</p>
            ) : (
              <p>Free Play</p>
            )}
          </div>
          <div className="col-right">
            <p>Score: {clickedGameCards.length}</p>/
            <p>
              Time: <span className="time">{gameTimer}</span>{" "}
            </p>
          </div>
        </div>
        <div className="board-cards">
          {gameCards.map((card) => {
            return (
              <GameCard
                key={currentRound + "/" + card}
                card={card}
                imageLoaded={imageLoaded}
                setLastClickedCard={setLastClickedCard}
                setScrollPosition={setScrollPosition}
                showScorePoint={
                  card === showScorePoint &&
                  activeGame.status === GAME_STATUS.RUNNING
                }
                allImagesLoaded={loadedImagesCount === gameCards.length}
                lastClickedCard={lastClickedCard}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
