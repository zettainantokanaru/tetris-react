import * as React from 'react';
import './tetris-information-panel.scss';

interface Props {
  lines?: any;
  score?: any;
  message?: any;
}

const TetrisInformationPanel: React.FC<Props> = (props: Props) => (
  <div>
    <p>LINES:{props.lines}</p>
    <p>SCORE:{props.score}</p>
    <p>{props.message}</p>
  </div>
);

export default TetrisInformationPanel;
