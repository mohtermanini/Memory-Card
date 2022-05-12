const Decks = (() => {
    const DECK_NAMES = {
        monsters_inc: "Monsters INC.",
        pokemon: "Pok\u00E9mon",
    };

    const DECKS_INNER_NAMES = ["monsters_inc", "pokemon"];

    const CARDS_NUMBER = {
        monsters_inc: 20,
        pokemon: 20,
    };

    const MIN_CARDS_NUMBER = {
        monsters_inc: 8,
        pokemon: 8,
    };

    return {
        DECK_NAMES,
        DECKS_INNER_NAMES,
        MIN_CARDS_NUMBER,
        CARDS_NUMBER,
    };
})();

export default Decks;
