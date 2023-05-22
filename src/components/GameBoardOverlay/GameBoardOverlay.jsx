import "./game-board-overlay.css";
import { useActiveGame } from "../../contexts/ActiveGameProvider";
import { GAME_STATUS } from "../../data/constants";
import NewGameOverlay from "./NewGameOverlay";
import LoadingGameOverlay from "./LoadingGameOverlay";
import LostGameOverlay from "./LostGameOverlay";
import WonGameOverlay from "./WonGameOverlay";

export default function GameBoardOverlay({ loadedImagesCount }) {
  const { activeGame } = useActiveGame();

  if (activeGame.status === GAME_STATUS.RUNNING) {
    return;
  }

  return (
    <div className="game-board-overlay">
      {activeGame.status === GAME_STATUS.NEW_GAME && <NewGameOverlay />}
      {activeGame.status === GAME_STATUS.LOADING && (
        <LoadingGameOverlay loadedImagesCount={loadedImagesCount} />
      )}
      {activeGame.status === GAME_STATUS.LOST && <LostGameOverlay />}
      {activeGame.status === GAME_STATUS.WON && <WonGameOverlay />}
    </div>
  );
}
