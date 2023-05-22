import { useActiveGame } from "../../contexts/ActiveGameProvider";
import { useGameOptions } from "../../contexts/GameOptionsProvider";
import { GAME_STATUS, GAME_TYPES } from "../../data/constants";

export default function NewGameOverlay() {
  const { gameOptions } = useGameOptions();
  const { activeGame, changeGameStatusAction } = useActiveGame();
  return (
    <div
      className="overlay-content start-overlay"
      onClick={() => {
        changeGameStatusAction(GAME_STATUS.LOADING);
      }}
    >
      {gameOptions.gameType === GAME_TYPES.LEVELS && (
        <p>➡️ Level {activeGame.level}</p>
      )}
      <p>Press anywhere to start</p>
    </div>
  );
}
