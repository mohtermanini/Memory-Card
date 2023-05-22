import { useActiveGame } from "../../contexts/ActiveGameProvider";

export default function LoadingGameOverlay({ loadedImagesCount }) {
  const { gameCards } = useActiveGame();

  return (
    <div className="overlay-content loading-overlay">
      <div className="spinner"></div>
      <p>
        Loading Images {"("}
        {loadedImagesCount}/{gameCards.length}
        {")"}
      </p>
    </div>
  );
}
