import * as React from 'react';
import TetrisInformationPanel from '../parts/tetris-information-panel/tetris-information-panel';
import TetrisControllerPanel from '../parts/tetris-controller-panel/tetris-controller-panel';

import './game.scss';
import TetrisMainBoardComponent from '../parts/tetris-main-board/tetris-main-board';
import TetrisSubBoardComponent from '../parts/tetris-sub-board/tetris-sub-board';

interface Props {
  board: any;
  score: any;
  settings: any;
  onStart?: () => void;
  onPause?: () => void;
  onRefresh?: () => void;
  onKeyDown?: (code: number) => void;
}

const GameComponent: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    props.onStart();
    window.onkeydown = (e: any) => {
      props.onKeyDown(e.keyCode);
    }
  }, []);
  return (
    <div className="game-container">
      <div className="main-screen">
        <TetrisMainBoardComponent
          table={props.board.boardTable}
        />
      </div>
      <div className="side-board">
        <p>Next:</p>
        <TetrisSubBoardComponent
          table={props.board.nextTable}
        />
        <TetrisInformationPanel
          lines={props.score.deletedLineNumber}
          score={props.score.point}
          message={props.score.message}
        />
        <div className="controller">
          <TetrisControllerPanel
            onKeyDown={props.onKeyDown}
          />
        </div>

      </div>
    </div>
  );
}

export default GameComponent;
