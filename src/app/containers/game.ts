import { connect } from 'react-redux';
import GameComponent from '../components/game/game';
import * as TetrisAction from '../actions/tetris';
import { Dispatch } from 'redux';

const mapState = (state: any, ownProps: any) => ({
    board: state.board,
    score: state.score,
    settings: state.settings,
  });

  function mapDispatch(dispatch: Dispatch<TetrisAction.actions>) {
      return {
          onStart: () => dispatch(TetrisAction.onStart()),
          onPause: () => dispatch(TetrisAction.onPause()),
          onRefresh: () => dispatch(TetrisAction.onRefresh()),
          onKeyDown: (code: number) => dispatch(TetrisAction.onKeyDown(code)),
      };
  }

const Game = connect(mapState, mapDispatch)(GameComponent);
export default Game;