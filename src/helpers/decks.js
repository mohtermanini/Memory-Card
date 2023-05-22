const Decks = (() => {
    const DECK_NAMES = {
      monsters_inc: "Monsters INC.",
      pokemon: "Pok\u00E9mon",
      digimon: "Digimon",
    };

    const DECKS_INNER_NAMES = ["monsters_inc", "pokemon", "digimon"];

    const CARDS_NUMBER = {
      monsters_inc: 30,
      pokemon: 30,
      digimon: 30
    };

    const MIN_CARDS_NUMBER = {
      monsters_inc: 8,
      pokemon: 8,
      digimon: 8
    };

    return {
        DECK_NAMES,
        DECKS_INNER_NAMES,
        MIN_CARDS_NUMBER,
        CARDS_NUMBER,
    };
})();

export default Decks;
