import { connect } from 'react-redux';
import HomeComponent from '../components/home/home';
import * as SelectModeAction from '../actions/select-mode';
import { Dispatch } from 'redux';

const mapState = (state: any, ownProps: any) => ({
    gamenModeState: state.GameModeState,
  });

function mapDispatch(dispatch: Dispatch<SelectModeAction.actions>) {
    return {
        onSelectMode: (mode: string) => dispatch(SelectModeAction.onSelectMode(mode)),
    };
}

const Home = connect(mapState, mapDispatch)(HomeComponent);
export default Home;
