import { useEffect, useState } from "react";
import { GAME_STATUS, GAME_TYPES } from "../data/constants";
import useLocalStorage from "./useLocalStorage";

export default function useGameScore(
  activeGame,
  gameCards,
  shuffleGameCards,
  changeGameStatusAction,
  gameOptions,
  gameTimer
) {
  const [clickedGameCards, setClickedGameCards] = useState([]);
  const [maxLevelReached, setMaxLevelReached] = useLocalStorage(
    "max_level_reached",
    1
  );
  const [freePlayMaxScoreReached, setFreePlayMaxScoreReached] = useLocalStorage(
    "free_play_max_score_reached",
    { score: 0, time: 0 }
  );

  useEffect(() => {
    if (activeGame.startNewRound) {
      setClickedGameCards([]);
    }
    if (activeGame.status === GAME_STATUS.WON) {
      if (gameOptions.gameType === GAME_TYPES.LEVELS) {
        const nextLevel = activeGame.level + 1;
        if (nextLevel > maxLevelReached) {
          setMaxLevelReached(nextLevel);
        }
        return;
      }
    }
    if (
      activeGame.status === GAME_STATUS.WON ||
      activeGame.status === GAME_STATUS.LOST
    ) {
      if (gameOptions.gameType === GAME_TYPES.FREE_PLAY) {
        if (
          clickedGameCards.length > freePlayMaxScoreReached.score ||
          (clickedGameCards.length === freePlayMaxScoreReached.score &&
            gameTimer < freePlayMaxScoreReached.time)
        ) {
          setFreePlayMaxScoreReached({
            score: clickedGameCards.length,
            time: gameTimer,
          });
        }
      }
    }
  }, [activeGame.status, activeGame.startNewRound]);

  useEffect(() => {
    if (activeGame.status === GAME_STATUS.RUNNING) {
      if (clickedGameCards.length === gameCards.length) {
        changeGameStatusAction(GAME_STATUS.WON);
        return;
      }
      if (clickedGameCards.length > 0) {
        shuffleGameCards();
      }
    }
  }, [clickedGameCards, activeGame.status, gameCards.length]);

  function clickCard(card) {
    if (
      clickedGameCards.find((clickedCard) => clickedCard === card) !== undefined
    ) {
      changeGameStatusAction(GAME_STATUS.LOST);
      return;
    }
    setClickedGameCards([...clickedGameCards, card]);
  }

  return {
    clickedGameCards,
    clickCard,
    maxLevelReached,
    freePlayMaxScoreReached,
  };
}
