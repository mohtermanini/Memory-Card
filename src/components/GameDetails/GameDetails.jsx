import { useActiveGame } from "../../contexts/ActiveGameProvider";
import { GAME_TYPES, MAX_LEVEL } from "../../data/constants";
import { useGameOptions } from "../../contexts/GameOptionsProvider";
import "./game-details.css";

export default function GameDetails(props) {
  const { maxLevelReached, freePlayMaxScoreReached } = useActiveGame();
  const { gameOptions } = useGameOptions();
  return (
    <>
      <div className="game-details">
        <h2> Highest score</h2>
        <p>
          &nbsp;
          {gameOptions.gameType === GAME_TYPES.LEVELS ? (
            maxLevelReached > MAX_LEVEL ? (
              <span>You have won all {MAX_LEVEL} levels</span>
            ) : (
              <span>level {maxLevelReached}</span>
            )
          ) : freePlayMaxScoreReached.score === 0 ? (
            <span>No high score</span>
          ) : (
            <span>
              {freePlayMaxScoreReached.score} in {freePlayMaxScoreReached.time}{" "}
              seconds
            </span>
          )}
        </p>
        <div className="options">
          <button onClick={props.openOptionsModal}>Change options</button>
        </div>
      </div>
    </>
  );
}
