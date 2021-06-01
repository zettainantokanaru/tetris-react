import * as React from 'react'
import { GameMode } from '../../constants/tetris';
import './home.scss';

export interface Props {
    onSelectMode?: (mode: string) => void;
}

const HomeComponent: React.FC<Props> = (props: Props) => (
    <div className="game-container">
        <div className="main-screen">
            <div className="menu">
                <button onClick={() => props.onSelectMode(GameMode.STACKED)}>GAME START</button>
            </div>
        </div>
    </div>
);


export default HomeComponent;