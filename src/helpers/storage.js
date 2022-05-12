const AppStorage = (() => {
    function getHighestScore(deck) {
        const highestScores = JSON.parse(localStorage.getItem("highestScores"));
        if (!highestScores || !highestScores[deck]) {
            return 0;
        }
        return highestScores[deck];
    }
    function setHighestScore(deck, value) {
        const highestScores = JSON.parse(localStorage.getItem("highestScores")) ?? {};
        highestScores[deck] = value;
        localStorage.setItem("highestScores", JSON.stringify(highestScores));
    }

    function getHighestScoreTime(deck) {
        const highestScoreTime = JSON.parse(localStorage.getItem("highestScoresTime"));
        if (!highestScoreTime || !highestScoreTime[deck]) {
            return 0;
        }
        return highestScoreTime[deck];
    }
    function setHighestScoreTime(deck, value) {
        const highestScoresTime = JSON.parse(localStorage.getItem("highestScoresTime")) ?? {};
        highestScoresTime[deck] = value;
        localStorage.setItem("highestScoresTime", JSON.stringify(highestScoresTime));
    }

    return {
        getHighestScore,
        getHighestScoreTime,
        setHighestScore,
        setHighestScoreTime,
    };
})();

export default AppStorage;
