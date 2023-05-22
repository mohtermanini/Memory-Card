import { createContext, useContext, useReducer } from "react";
import { GAME_TYPES } from "../data/constants";
import Decks from "../helpers/decks";

const GameOptionsContext = createContext();

const initialState = {
  gameType: GAME_TYPES.LEVELS,
  chosenDecks: [Decks.DECKS_INNER_NAMES[0]],
  freePlayNumberOfCards: 4,
};

export const GAME_OPTIONS_ACTIONS = {
  CHANGE_GAME_TYPE: "Change Game Type",
  CHANGE_DECKS: "Change Decks",
  CHOOSE_FREE_PLAY_NUMBER_OF_CARDS: "Choose Number of Cards",
};

function reducer(state, action) {
  switch (action.type) {
    case GAME_OPTIONS_ACTIONS.CHANGE_GAME_TYPE: {
      return { ...state, gameType: action.payload };
    }
    case GAME_OPTIONS_ACTIONS.CHANGE_DECKS: {
      return { ...state, chosenDecks: action.payload };
    }
    case GAME_OPTIONS_ACTIONS.CHOOSE_FREE_PLAY_NUMBER_OF_CARDS: {
      return { ...state, freePlayNumberOfCards: action.payload };
    }
  }
  return state;
}

export default function GameOptionsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function changeGameType(type) {
    dispatch({ type: GAME_OPTIONS_ACTIONS.CHANGE_GAME_TYPE, payload: type });
  }
  function changeDecks(decks) {
    dispatch({ type: GAME_OPTIONS_ACTIONS.CHANGE_DECKS, payload: decks });
  }
  function changeFreePlayNumberOfCards(num) {
    dispatch({
      type: GAME_OPTIONS_ACTIONS.CHOOSE_FREE_PLAY_NUMBER_OF_CARDS,
      payload: num,
    });
  }

  return (
    <GameOptionsContext.Provider
      value={{
        gameOptions: state,
        changeGameType,
        changeDecks,
        changeFreePlayNumberOfCards,
      }}
    >
      {children}
    </GameOptionsContext.Provider>
  );
}

export function useGameOptions() {
  return useContext(GameOptionsContext);
}
