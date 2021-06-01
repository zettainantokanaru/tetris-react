import * as React from 'react';
import './tetris-sub-board.scss';

interface Props {
  table: any;
}

const TetrisSubBoardComponent: React.FC<Props> = (props: Props) => {
  return (
    <table className='sub-board-table'>
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

export default TetrisSubBoardComponent;