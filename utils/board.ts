import { Block } from './block';
import { BLOCK_WIDTH } from '../constants/constants';

export class Board {
    public width: number;
    public height: number;
    public boardColor: string;
    public boardState: Block[][];

    constructor(
        width: number,
        height: number,
        boardColor: string,
        boardState: [][],
    ) {
        this.width = width;
        this.height = height;
        this.boardColor = boardColor;
        this.boardState = boardState;
    }

    public createBlankBoard(): void {
        this.boardState = Array.from({length: this.height}, (_, r) => 
            Array.from({length:this.width}, (_, c) =>
                new Block(c, r, BLOCK_WIDTH, 'black', 0)
            )
        )
    }
    
    public drawBoard(ctx: any): void {
        this.boardState.forEach(row => {row.forEach(cell => cell.drawBlock(ctx))});
    }

    public resetBoard(): void {
        this.boardState.forEach(row => row.forEach(cell => cell.state = 0));
    }

    public openSpace(x: number, y: number): boolean {
        try {
            return this.boardState[y][x].state === 0;
        } catch (e) {
            return false;
        }
    }

    public lineClearCheck(): number[] {
        return this.boardState
            .map((row, r) => ({
                isFilled: row.every(cell => cell.state !== 0),
                index: r,
        }))
        .filter(row => row.isFilled)
        .map(row => row.index)
    }

    public clearRow(rowToBeCleared: number): void {
        this.boardState[rowToBeCleared].forEach(cell => cell.state = 0);
    }

    public moveRowsDown(rowCleared: number): void {
        for (let r = rowCleared; r > 0; r--) {
            this.boardState[r].forEach((cell, c) => {
                const aboveCell = this.boardState[r - 1][c];
                cell.state = aboveCell.state;
                cell.color = aboveCell.color;
            });
        }
    }
}
