import * as ActionTypes from '../constants/action-types';
import { blocks } from '../constants/tetris-blocks';
import { Block } from '../model/block';
import { TetrisTableInfo } from '../model/tetris-table-info';
import { BoardSize, CustomKeyCode } from '../constants/tetris';


export const boardDrawer = (store: any) => (next: any) => (action: any) => {
    if (action.type === ActionTypes.ACTION_GAME_START) {
        startGame(store);
    } else if (action.type === ActionTypes.ACTION_GAME_PAUSE) {

    } else if (action.type === ActionTypes.ACTION_GAME_FINISH) {

    } else if (action.type === ActionTypes.ACTION_KEY_DOWN) {
        dispatchKeyAction(store, action.code);
    }
    next(action);
};

function startGame(store: any) {

    let tetris = new TetrisTableInfo();

    tetris.boardTable = create2DArray(BoardSize.STAGE_HEIGHT, BoardSize.STAGE_WIDTH);
    tetris.nextTable = create2DArray(BoardSize.NEXTAREA_WIDTH, BoardSize.NEXTAREA_HEIGHT);
    tetris.virtualStage = create2DArray(BoardSize.STAGE_WIDTH, BoardSize.STAGE_HEIGHT);
    tetris.currentBlock = null;
    tetris.nextBlock = new Block();
    tetris.nextBlock.type = getRandom();

    mainLoop(store, { ...tetris });
}

function mainLoop(store: any, tableInfo: TetrisTableInfo) {

    const isPlaying = store.getState().status.playing;
    if (isPlaying) {
        if (tableInfo.currentBlock == null) {
            if (!createNewBlock(tableInfo)) {
                return;
            }
        } else {
            fallBlock(store, tableInfo);
        }
        drawStage(tableInfo);
        if (tableInfo.currentBlock != null) {
            drawBlock(tableInfo.currentBlock.x, tableInfo.currentBlock.y,
                tableInfo.currentBlock.type, tableInfo.currentBlock.angle, tableInfo.boardTable);
        }
        store.dispatch({ type: ActionTypes.ACTION_UPDATE, value: { ...tableInfo } });
    }
    const currentLevel = store.getState().settings.speed;
    setTimeout(() => mainLoop(store, tableInfo), currentLevel);
}

function drawStage(tableInfo: TetrisTableInfo) {
    clear(tableInfo.boardTable);

    for (let x = 0; x < tableInfo.virtualStage.length; x++) {
        for (let y = 0; y < tableInfo.virtualStage[x].length; y++) {
            if (tableInfo.virtualStage[x][y] != null) {
                drawCell(tableInfo.boardTable,
                    x, y, tableInfo.virtualStage[x][y]);
            }
        }
    }
}
function createNewBlock(tableInfo: TetrisTableInfo) {
    tableInfo.currentBlock = new Block();
    tableInfo.currentBlock.type = tableInfo.nextBlock.type;
    if (!tableInfo.nextBlock) {
        tableInfo.nextBlock = new Block();
    }
    tableInfo.nextBlock.type = getRandom();
    tableInfo.currentBlock.x = Math.floor(BoardSize.STAGE_WIDTH / 2 - 1);
    tableInfo.currentBlock.y = 0;
    tableInfo.currentBlock.angle = 0;
    drawNextBlock(tableInfo);
    if (!checkBlockMove(tableInfo.currentBlock.x, tableInfo.currentBlock.y, tableInfo.currentBlock.type, tableInfo.currentBlock.angle, tableInfo.virtualStage)) {
        return false;
    }
    return true;
}

function drawNextBlock(tableInfo: TetrisTableInfo) {
    clear(tableInfo.nextTable);
    drawBlock(2, 2, tableInfo.nextBlock.type, 0, tableInfo.nextTable);
}

function clear(table: any) {
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            table[y][x] = null;
        }
    }
}

function checkBlockMove(x: any, y: any, type: any, angle: any, virtualStage: any) {
    for (let i = 0; i < blocks[type].shape[angle].length; i++) {
        let cellX = x + blocks[type].shape[angle][i][0];
        let cellY = y + blocks[type].shape[angle][i][1];
        if (cellX < 0 || cellX > BoardSize.STAGE_WIDTH - 1) {
            return false;
        }
        if (cellY > BoardSize.STAGE_HEIGHT - 1) {
            return false;
        }
        if (virtualStage[cellX][cellY] != null) {
            return false;
        }
    }
    return true;
}

function create2DArray(rows: number, cols: number) {
    let array = new Array(rows);
    for (let i = 0; i < rows; i++) {
        array[i] = new Array(cols).fill(null);
    }
    return array;
}


function drawBlock(x: any, y: any, type: any, angle: any, table: any) {
    let block = blocks[type];
    for (let i = 0; i < block.shape[angle].length; i++) {
        drawCell(table,
            x + block.shape[angle][i][0],
            y + block.shape[angle][i][1],
            type);
    }
}

function drawCell(table: any, x: any, y: any, type: any) {
    if (y < 0) {
        return;
    }
    table[y][x] = type;
}

function getRandom() {
    return Math.floor(Math.random() * blocks.length);
}

function fallBlock(store: any, tableInfo: TetrisTableInfo) {
    if (checkBlockMove(tableInfo.currentBlock.x, tableInfo.currentBlock.y + 1, tableInfo.currentBlock.type, tableInfo.currentBlock.angle, tableInfo.virtualStage)) {
        tableInfo.currentBlock.y++;
    } else {
        fixBlock(store, tableInfo.currentBlock.x, tableInfo.currentBlock.y, tableInfo.currentBlock.type, tableInfo.currentBlock.angle, tableInfo.virtualStage);
        tableInfo.currentBlock = null;
    }
}

function fixBlock(store: any, x: any, y: any, type: any, angle: any, virtualStage: any) {
    for (let i = 0; i < blocks[type].shape[angle].length; i++) {
        let cellX = x + blocks[type].shape[angle][i][0];
        let cellY = y + blocks[type].shape[angle][i][1];
        virtualStage[cellX][cellY] = type;
    }
    let deleteLines = 0;
    for (let y = BoardSize.STAGE_HEIGHT - 1; y >= 0;) {
        let filled = true;
        for (let x = 0; x < BoardSize.STAGE_WIDTH; x++) {
            if (virtualStage[x][y] == null) {
                filled = false;
                break;
            }
        }
        if (filled) {
            for (let y2 = y; y2 > 0; y2--) {
                for (let x = 0; x < BoardSize.STAGE_WIDTH; x++) {
                    virtualStage[x][y2] = virtualStage[x][y2 - 1];
                }
            }
            deleteLines++;
        } else {
            y--;
        }
    }
    if (deleteLines > 0) {
        const currentLevel = store.getState().settings.speed;
        store.dispatch({ type: ActionTypes.ACTION_DELETE_LINES, lines: deleteLines, level: currentLevel });
    }
}

function dispatchKeyAction(store: any, code: number) {
    const tableInfo = { ...store.getState().board };
    if (code === CustomKeyCode.PAUSE) {
        store.dispatch({ type: ActionTypes.ACTION_GAME_PAUSE });
        return;
    } else if (code === CustomKeyCode.REFRESH) {

    }

    if (tableInfo.currentBlock == null) {
        return;
    }
    if (code === 37) {
        moveLeft(tableInfo);
        store.dispatch({ type: ActionTypes.ACTION_UPDATE, value: { ...tableInfo } });
    } else if (code === 38) {
        rotate(tableInfo);
        store.dispatch({ type: ActionTypes.ACTION_UPDATE, value: { ...tableInfo } });
    } else if (code === 39) {
        moveRight(tableInfo);
        store.dispatch({ type: ActionTypes.ACTION_UPDATE, value: { ...tableInfo } });
    } else if (code === 40) {
        fall(tableInfo);
        store.dispatch({ type: ActionTypes.ACTION_UPDATE, value: { ...tableInfo } });
    }
}

function moveLeft(table: TetrisTableInfo) {
    if (checkBlockMove(table.currentBlock.x - 1, table.currentBlock.y, table.currentBlock.type, table.currentBlock.angle, table.virtualStage)) {
        table.currentBlock.x--;
        refreshStage(table);
    }
}

function moveRight(table: TetrisTableInfo) {
    if (checkBlockMove(table.currentBlock.x + 1, table.currentBlock.y, table.currentBlock.type, table.currentBlock.angle, table.virtualStage)) {
        table.currentBlock.x++;
        refreshStage(table);
    }
}

function rotate(table: TetrisTableInfo) {
    let newAngle;
    if (table.currentBlock.angle < 3) {
        newAngle = table.currentBlock.angle + 1;
    } else {
        newAngle = 0;
    }
    if (checkBlockMove(table.currentBlock.x, table.currentBlock.y, table.currentBlock.type, newAngle, table.virtualStage)) {
        table.currentBlock.angle = newAngle;
        refreshStage(table);
    }
}


function fall(table: TetrisTableInfo) {
    while (checkBlockMove(table.currentBlock.x, table.currentBlock.y + 1, table.currentBlock.type, table.currentBlock.angle, table.virtualStage)) {
        table.currentBlock.y++;
        refreshStage(table);
    }
}

function refreshStage(table: TetrisTableInfo) {
    clear(table.boardTable);
    drawStage(table);
    if (table.currentBlock) {
        drawBlock(table.currentBlock.x, table.currentBlock.y,
            table.currentBlock.type, table.currentBlock.angle, table.boardTable);
    }
}
