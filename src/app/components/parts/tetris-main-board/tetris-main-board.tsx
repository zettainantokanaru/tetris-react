import * as React from 'react';
import './tetris-main-board.scss';

interface Props {
  table: any;
}

const TetrisMainBoardComponent: React.FC<Props> = (props: Props) => {
  return (
    <table className='main-board-table'>
      <tbody>
        {props.table.map((row: any, index: any) => {
          return (
            <tr key={index}>
              {row.map((td: any, index: any) => <td key={index} className={"block-type-" + td}></td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TetrisMainBoardComponent;