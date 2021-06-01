import * as React from 'react';
import './tetris-controller-panel.scss';

interface Props {
  onKeyDown?:(code: number) => void;
}

const TetrisControllerPanel: React.FC<Props> = (props: Props) => (
  <table className="tetris-button-panel">
    <tbody>
      <tr>
        <td></td>
        <td id="tetris-rotate-button" className="tetris-button" onMouseDown={()=>props.onKeyDown(38)}>↻</td>
        <td></td>
      </tr>
      <tr>
        <td id="tetris-move-left-button" className="tetris-button" onMouseDown={()=>props.onKeyDown(37)}>←</td>
        <td id="tetris-fall-button" className="tetris-button" onMouseDown={()=>props.onKeyDown(40)}>↓</td>
        <td id="tetris-move-right-button" className="tetris-button" onMouseDown={()=>props.onKeyDown(39)}>→</td>
      </tr>
      <tr>
        <td id="tetris-pause-button" className="tetris-button" onMouseDown={()=>props.onKeyDown(9990)}>Pause</td>
      </tr>
    </tbody>
  </table>
);

export default TetrisControllerPanel;
