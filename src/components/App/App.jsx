import { useState } from "react";
import Footer from "../Footer/Footer";
import GameBoard from "../GameBoard/GameBoard";
import GameDetails from "../GameDetails/GameDetails";
import OptionsModal from "../Modals/OptionsModal/OptionsModal";
import { CSSTransition } from "react-transition-group";
import GameOptionsProvider from "../../contexts/GameOptionsProvider";
import ActiveGameProvider from "../../contexts/ActiveGameProvider";
import "./app.css";

export default function App() {
  const [showOptionsModal, setShowOptionsModal] = useState(true);
  const [showRules, setShowRules] = useState(true);

  function openOptionsModal() {
    setShowOptionsModal(true);
  }

  function closeOptionsModal() {
    setShowOptionsModal(false);
  }

  function hideRules() {
    setShowRules(false);
  }

  return (
    <>
      <GameOptionsProvider>
        <ActiveGameProvider>
          <CSSTransition
            in={showOptionsModal}
            timeout={300}
            classNames="modal-fade"
            unmountOnExit
          >
            <OptionsModal closeOptionsModal={closeOptionsModal} />
          </CSSTransition>
          <header className="app-header">
            <h1>Memory Card</h1>
          </header>
          <GameDetails openOptionsModal={openOptionsModal} />
          <CSSTransition
            in={showRules}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="rules-alert">
              <div className="rules">
                One rule: Click on all cards without clicking any card more than
                once.
              </div>
              <button className="btn-close" onClick={hideRules}>
                X
              </button>
            </div>
          </CSSTransition>
          <main>
            <section id="section-board">
              <GameBoard />
            </section>
          </main>
          <Footer />
        </ActiveGameProvider>
      </GameOptionsProvider>
    </>
  );
}
