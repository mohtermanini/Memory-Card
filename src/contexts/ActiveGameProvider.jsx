import { createContext, useContext, useEffect, useReducer } from "react";
import { useGameOptions } from "./GameOptionsProvider";
import useGameTimer from "../hooks/useGameTimer";
import { GAME_STATUS, GAME_TYPES, MAX_LEVEL } from "../data/constants";
import useGameCards from "../hooks/useGameCards";
import useGameScore from "../hooks/useGameScore";

const ActiveGameContext = createContext();

const initialState = {
  level: 0,
  status: null,
  startNewRound: false,
};

const ACTIVE_GAME_ACTIONS = {
  CHANGE_LEVEL: "Change Level",
  CHANGE_CARDS: "Change Cards",
  SHUFFLE_CARDS: "Shuffle Cards",
  CHANGE_GAME_STATUS: "Change Game Status",
  UPDATE_START_ROUND: "Update Start Round",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIVE_GAME_ACTIONS.CHANGE_LEVEL: {
      return { ...state, level: action.payload };
    }
    case ACTIVE_GAME_ACTIONS.CHANGE_GAME_STATUS: {
      return { ...state, status: action.payload };
    }
    case ACTIVE_GAME_ACTIONS.UPDATE_START_ROUND: {
      return { ...state, startNewRound: action.payload };
    }
  }
  return state;
}

export default function ActiveGameProvider({ children }) {
  const { gameOptions } = useGameOptions();
  const [state, dispatch] = useReducer(reducer, initialState);
  const gameTimer = useGameTimer(state, gameOptions, changeGameStatusAction);
  const { gameCards, shuffleGameCards, backSideOfCards } = useGameCards(
    state,
    gameOptions
  );
  const {
    clickedGameCards,
    clickCard,
    maxLevelReached,
    freePlayMaxScoreReached,
  } = useGameScore(
    state,
    gameCards,
    shuffleGameCards,
    changeGameStatusAction,
    gameOptions,
    gameTimer
  );

  useEffect(() => {
    if (state.startNewRound) {
      startNextRound();
      updateStartRound(false);
    }
  }, [state.startNewRound]);

  useEffect(() => {
    updateStartRound(true);
  }, []);

  function updateStartRound(value) {
    dispatch({ type: ACTIVE_GAME_ACTIONS.UPDATE_START_ROUND, payload: value });
  }

  function changeLevelAction(level) {
    dispatch({ type: ACTIVE_GAME_ACTIONS.CHANGE_LEVEL, payload: level });
  }

  function changeGameStatusAction(newStatus) {
    dispatch({
      type: ACTIVE_GAME_ACTIONS.CHANGE_GAME_STATUS,
      payload: newStatus,
    });
  }

  function endRound(outcome) {
    if (outcome !== GAME_STATUS.WON && outcome !== GAME_STATUS.LOST) {
      throw new Error("Outcome should be either win or lose");
    }
    changeGameStatusAction(outcome);
  }

  function startNextRound() {
    if (gameOptions.gameType === GAME_TYPES.LEVELS) {
      if (state.status === GAME_STATUS.WON && state.level !== MAX_LEVEL) {
        changeLevelAction(state.level + 1);
      } else {
        changeLevelAction(1);
      }
    }
    changeGameStatusAction(GAME_STATUS.NEW_GAME);
  }

  return (
    <ActiveGameContext.Provider
      value={{
        activeGame: state,
        changeGameStatusAction,
        startNextRound,
        endRound,
        gameTimer,
        gameCards,
        clickedGameCards,
        clickCard,
        backSideOfCards,
        maxLevelReached,
        updateStartRound,
        freePlayMaxScoreReached,
      }}
    >
      {children}
    </ActiveGameContext.Provider>
  );
}

export function useActiveGame() {
  return useContext(ActiveGameContext);
}
