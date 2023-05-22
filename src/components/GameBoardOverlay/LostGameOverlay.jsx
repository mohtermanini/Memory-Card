import { GAME_TYPES } from "../../data/constants";
import { useGameOptions } from "../../contexts/GameOptionsProvider";
import { useActiveGame } from "../../contexts/ActiveGameProvider";

export default function LostGameOverlay() {
  const { gameOptions } = useGameOptions();
  const { activeGame, gameTimer, clickedGameCards, updateStartRound } =
    useActiveGame();
  
  return (
    <div className="overlay-content">
      {gameTimer === 0 ? (
        <p>Timeout ⏱️</p>
      ) : (
        <p>💀 You selected the same card twice. 💀</p>
      )}

      {gameOptions.gameType === GAME_TYPES.LEVELS ? (
        <p>You have reached level {activeGame.level}</p>
      ) : (
        <p>
          Your score is {clickedGameCards.length} in {gameTimer} seconds
        </p>
      )}

      <div className="options">
        <button onClick={() => {updateStartRound(true)}} className="btn-danger">Restart</button>
      </div>
    </div>
  );
}
