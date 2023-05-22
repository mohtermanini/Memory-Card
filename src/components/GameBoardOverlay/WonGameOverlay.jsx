import { useGameOptions } from "../../contexts/GameOptionsProvider";
import { useActiveGame } from "../../contexts/ActiveGameProvider";
import { GAME_TYPES, MAX_LEVEL } from "../../data/constants";

export default function WonGameOverlay() {
  const { gameOptions } = useGameOptions();
  const { activeGame, gameTimer, clickedGameCards, updateStartRound } =
    useActiveGame();

  function renderText() {
    if (gameOptions.gameType === GAME_TYPES.FREE_PLAY) {
      return (
        <>
          <p>🎉 Congratulations You have selected all cards. 🎉</p>
          <p>
            Your score is {clickedGameCards.length} in {gameTimer} seconds
          </p>
        </>
      );
    } else if (gameOptions.gameType === GAME_TYPES.LEVELS) {
      if (activeGame.level === MAX_LEVEL) {
        return (
          <>
            <p>🎉 Congratulations 🎉</p>
            <p>🚀 You have won all {MAX_LEVEL} levels 🚀</p>
          </>
        );
      }
      return <p>Level Passed ✅</p>;
    }
  }

  function renderNextRoundButton() {
    if (gameOptions.gameType === GAME_TYPES.LEVELS) {
      if (activeGame.level !== MAX_LEVEL) {
        return <button onClick={() => {updateStartRound(true)}}>Next Level</button>;
      }
      return (
        <button onClick={() => {updateStartRound(true)}} className="btn-success">
          Start New Game
        </button>
      );
    }
    return <button onClick={() => {updateStartRound(true)}}>Restart</button>;
  }

  return (
    <div className="overlay-content">
      {renderText()}
      <div className="options">{renderNextRoundButton()}</div>
    </div>
  );
}
