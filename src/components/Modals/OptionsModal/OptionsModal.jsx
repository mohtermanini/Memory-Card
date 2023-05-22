import { useEffect, useState } from "react";
import Decks from "../../../helpers/decks";
import { useGameOptions } from "../../../contexts/GameOptionsProvider";
import { useForm } from "react-hook-form";
import { useActiveGame } from "../../../contexts/ActiveGameProvider";
import { GAME_STATUS, GAME_TYPES } from "../../../data/constants";
import "../modals.css";
import "./options-modal.css";

const MIN_ALLOWED_NUMBER_OF_CARDS = 4;

export default function OptionsModal({ closeOptionsModal }) {
  const {
    gameOptions,
    changeGameType,
    changeDecks,
    changeFreePlayNumberOfCards,
  } = useGameOptions();
  const { updateStartRound } = useActiveGame();
  const { register, handleSubmit, getValues, watch, setValue } = useForm({
    defaultValues: {
      "game-type": gameOptions.gameType,
      decks: [],
      "free-play-number-of-cards": gameOptions["freePlayNumberOfCards"],
    },
  });
  const [availableCardsCount, setAvailableCardsCount] = useState([]);
  const formData = watch();

  useEffect(() => {
    let count = 0;
    const selectedDecks = getValues("decks[]");
    selectedDecks.forEach((deck) => {
      count += Decks.CARDS_NUMBER[deck];
    });
    const availableCardsCount = [];
    if (count === 0) {
      availableCardsCount.push(0);
    } else {
      for (let i = MIN_ALLOWED_NUMBER_OF_CARDS; i <= count; i++) {
        availableCardsCount.push(i);
      }
    }
    let newNumberOfCards = Math.min(
      formData["free-play-number-of-cards"],
      count
    );
    if (formData["free-play-number-of-cards"] === 0) {
      newNumberOfCards = Math.min(count, MIN_ALLOWED_NUMBER_OF_CARDS);
    }
    setValue("free-play-number-of-cards", newNumberOfCards);
    setAvailableCardsCount(availableCardsCount);
  }, [formData.decks]);

  function onSubmitOptionsForm(data) {
    changeGameType(data["game-type"]);
    changeDecks(data["decks"]);
    changeFreePlayNumberOfCards(data["free-play-number-of-cards"]);
    updateStartRound(true);

    closeOptionsModal();
  }

  return (
    <div className="modal-container" id="options-modal">
      <div className="modal">
        <div className="modal-header">
          <h2>Game Options</h2>
        </div>
        <div className="modal-body">
          <section className="game-options">
            <form
              id="form-game-options"
              onSubmit={handleSubmit(onSubmitOptionsForm)}
            >
              <div className="option">
                <div className="game-type">
                  <div className="radio-button">
                    <input
                      type="radio"
                      id="btn-radio-levels"
                      value={GAME_TYPES.LEVELS}
                      {...register("game-type")}
                    />
                    <label htmlFor="btn-radio-levels">Levels</label>
                  </div>
                  <div className="radio-button">
                    <input
                      type="radio"
                      id="btn-radio-free-play"
                      value={GAME_TYPES.FREE_PLAY}
                      {...register("game-type")}
                    />
                    <label htmlFor="btn-radio-free-play">Free Play</label>
                  </div>
                </div>
              </div>
            </form>
            <hr className="separator" />
            <div className="option  l-flex l-flex--column l-flex--gap-7">
              <p className="option-title">Decks</p>
              <div className="decks ">
                {Decks.DECKS_INNER_NAMES.map((deck) => (
                  <div className="radio-button" key={deck}>
                    <input
                      type="checkbox"
                      id={deck}
                      value={deck}
                      defaultChecked={gameOptions.chosenDecks.find(
                        (chosenDeck) => chosenDeck === deck
                      )}
                      {...register("decks[]")}
                    />
                    <label htmlFor={deck}>{Decks.DECK_NAMES[deck]}</label>
                  </div>
                ))}
              </div>
            </div>
            {formData["game-type"] === GAME_TYPES.FREE_PLAY && (
              <>
                <hr className="separator" />
                <div className="option l-flex l-flex--justify-between">
                  <p className="option-title option-title-sm">
                    Number of cards
                  </p>
                  <select
                    name="cards-count"
                    id="cards-count"
                    {...register("free-play-number-of-cards")}
                    value={formData["free-play-number-of-cards"]}
                  >
                    {availableCardsCount.map((card) => (
                      <option key={card} value={card}>
                        {card}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </section>
        </div>
        <div className="modal-footer">
          <div className="options">
            <button onClick={closeOptionsModal}>Close</button>
            <button
              form="form-game-options"
              type="submit"
              disabled={formData.decks.length === 0}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
