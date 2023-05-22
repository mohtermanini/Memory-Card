import { useEffect, useRef, useState } from "react";
import { GAME_STATUS, GAME_TYPES, LEVEL_TIMER } from "../data/constants";

export default function GameTimerProvider(
  game,
  gameOptions,
  changeGameStatusAction
) {
  const [timer, setTimer] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    resetTimer();
  }, [game.startNewRound, gameOptions.gameType, game.level]);

  function resetTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (gameOptions.gameType === GAME_TYPES.FREE_PLAY) {
      setTimer(0);
    }
    if (gameOptions.gameType === GAME_TYPES.LEVELS) {
      setTimer(LEVEL_TIMER[game.level]);
    }
  }

  useEffect(() => {
    if (game.status === GAME_STATUS.RUNNING) {
      if (gameOptions.gameType === GAME_TYPES.LEVELS && timer === 0) {
        changeGameStatusAction(GAME_STATUS.LOST);
        return;
      }
      const changeInTime =
        gameOptions.gameType === GAME_TYPES.LEVELS ? -0.01 : +0.01;

      const newTime =
        Math.round((timer + changeInTime + Number.EPSILON) * 100) / 100;

      timeoutRef.current = setTimeout(() => {
        setTimer(newTime);
      }, 10);
    }
  }, [timer, game.status, gameOptions.gameType]);

  useEffect(() => {
    if (game.status !== GAME_STATUS.RUNNING) {
      clearTimeout(timeoutRef.current);
    }
  }, [game.status]);

  return timer;
}
