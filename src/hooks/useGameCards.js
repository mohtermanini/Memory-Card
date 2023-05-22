import { useEffect, useState } from "react";
import {
  GAME_STATUS,
  GAME_TYPES,
  LEVEL_NUMBER_OF_CARDS,
} from "../data/constants";
import { shuffle } from "../helpers/arrays";
import Decks from "../helpers/decks";

export default function useGameCards(activeGame, gameOptions) {
  const [gameCards, setGameCards] = useState([]);
  const [backSideOfCards, setBackSideOfCards] = useState(null);

  useEffect(() => {
    import(`../assets/images/decks/cards_backs/01.png`).then((image) => {
      setBackSideOfCards(image.default);
    });
  }, []);

  useEffect(() => {
    if (activeGame.status === GAME_STATUS.NEW_GAME) {
      let numOfCards = getCurrentRoundNumOfCards();
      const allCards = getAllDecksCards();
      const newCards = getRandomCardsFromCardsArray(allCards, numOfCards);
      setGameCards(newCards);
    }
  }, [
    activeGame.status,
    gameOptions
  ]);

  function getCurrentRoundNumOfCards() {
    if (gameOptions.gameType === GAME_TYPES.LEVELS) {
      return LEVEL_NUMBER_OF_CARDS[activeGame.level];
    }
    return gameOptions["freePlayNumberOfCards"];
  }

  function getAllDecksCards() {
    const allCards = [];
    gameOptions.chosenDecks.forEach((deck) => {
      for (let i = 1; i <= Decks.CARDS_NUMBER[deck]; i++) {
        const cardPath = deck + "/" + (i < 10 ? "0" : "") + i + ".png";
        allCards.push(cardPath);
      }
    });
    return allCards;
  }

  function getRandomCardsFromCardsArray(cardsArray, num) {
    if (num > cardsArray.length) {
      throw new Error("Number is greater than array length.");
    }
    shuffle(cardsArray);
    const randomCards = [];
    for (let i = 0; i < num; i++) {
      randomCards.push(cardsArray[i]);
    }
    return randomCards;
  }

  function shuffleGameCards() {
    const newGameCards = [...gameCards];
    shuffle(newGameCards);
    setGameCards(newGameCards);
  }

  return { gameCards, shuffleGameCards, backSideOfCards };
}
