import type { Board } from './board';
import type { PieceObject } from './types';
import { Block, BlockState } from './block';
import { BLOCK_WIDTH } from '../constants/constants';

export class Piece {
    private orientation: number = 0;
    private currentOrientation: number[][] = [];
    private allOrientations: number[][][];
    private pieceMap: Block[][] = [];
    private xOffsetSpawnValue: number = 7;

    public landed: boolean = false;
    public xOffset: number = 0;
    public yOffset: number = 0;
    public validSpawn: boolean;

    public name: string;
    public color: string;
    public board: Board;

    constructor(vitals: PieceObject, boardObject: Board) {
        this.name = vitals.name;
        this.color = vitals.color;
        this.allOrientations = vitals.pieceMap;
        this.currentOrientation = this.allOrientations[this.orientation];
        this.board = boardObject;
        this.setSpawnOffset();
        this.validSpawn = true;
    }

    private createPiece() {
        this.pieceMap = this.currentOrientation.map((row, r): Block[] => 
            row.map((state, c): Block => 
                new Block(
                    c + this.xOffset,
                    r - this.yOffset,
                    BLOCK_WIDTH,
                    this.color,
                    state as BlockState,
                )
            )
        )
    }

    private setSpawnOffset(): void {
        //Sets x/yOffset to spawn piece properly above board.
        const pieceWidth: number = this.currentOrientation[0].length;
        this.xOffset = this.xOffsetSpawnValue - pieceWidth;
        // finds index of where piece starts on map ( some have space at top)
        const pieceStart: number = this.currentOrientation.findIndex(
            row => row.includes(1)
            ) || 0;
        this.yOffset = pieceStart;
    }

    private checkSpawnValidity(): boolean {
        let validSpawn: boolean = true;
        const spawn_xoffset: number = 3;
        this.currentOrientation.forEach((row, r) => {
            row.forEach((cellState, c) => {
                if (cellState === 1 && validSpawn) {
                    const x: number = c + spawn_xoffset;
                    const y: number = r - this.yOffset;
                    validSpawn = this.board.openSpace(x, y) ? true : false;
                }
            });
        });
        return validSpawn;
    }

    public spawnPiece(): void {
        this.validSpawn = this.checkSpawnValidity();
        if (this.validSpawn) {
            this.createPiece();
        }  
    }

    // Downward movement
    public handleGravity(): void {
        this.checkCollision() ? this.movePieceDown() : this.lockPiece();
    }

    private checkCollision(): boolean {
        return this.pieceMap.every(row =>
            row.every(({state, x, y}) =>
                state !== 1 || (
                    y + 1 < this.board.height && this.board.openSpace(x, y + 1)
                )
            )
        );
    }

    private movePieceDown(): void {
        this.pieceMap.forEach(row => row.forEach(cell => cell.y += 1))
    }

    private lockPiece(): void {
        this.landed = true;
        this.pieceMap.forEach(row => 
            row.forEach(({state, x, y}) => {
                if (state === 1) {
                    this.board.boardState[y][x].state = 1;
                    this.board.boardState[y][x].color = this.color;
                }
            })
        );
    }

    //Lateral and Rotational Movements
    private checkRotationalCollision(rotationalDirection: number): boolean {
        return this.pieceMap.every((row, r) => 
            row.every((cell, c) => {
                const rotation: number[][] =
                    this.allOrientations[this.nextRotationState(rotationalDirection)];
                const next_state = rotation[r][c];
                return (
                    next_state !== 1 || (
                        this.board.openSpace(cell.x, cell.y) &&
                        cell.x >= 0 &&
                        cell.x <= this.board.width
                    )
                )
            })
        );
    }

    private nextRotationState(rotationalDirection: number): number {
        return (
            this.orientation + rotationalDirection + this.allOrientations.length
            ) % this.allOrientations.length;
    }

    private rotatePiece(rotationalDirection: number): void {
        this.orientation = this.nextRotationState(rotationalDirection);
        this.currentOrientation = this.allOrientations[this.orientation];

        this.pieceMap.forEach((row, r) => 
            row.forEach((cell, c) =>
                cell.state = this.currentOrientation[r][c] as BlockState
            )
        )
    }

    private checkLateralCollision(direction: number): boolean {
        return this.pieceMap.every(row => row.every(({state, x, y}) => 
            state !== 1 || (
                this.board.openSpace(x + direction, y) &&
                x >= 0 &&
                x < this.board.width 
            )
        ));
    }

    private movePiece(direction: number) {
        this.pieceMap.forEach(row => row.forEach(cell => cell.x += direction));
    }

    public handleMovement(direction: number, rotation = false): void {
        if (rotation) {
            if (this.checkRotationalCollision(direction)) {
                this.rotatePiece(direction);
            }
        } else {
            if (this.checkLateralCollision(direction)) {
                this.movePiece(direction);
            }
        }
    }

    //Drawing Methods
    public drawPiece(ctx: CanvasRenderingContext2D): void {
        this.pieceMap.forEach((row) => {
            row.forEach((cell) => {
                if (cell.state === 1) {
                    cell.drawBlock(ctx);
                }
            });
        });
    }

    public drawNextBox(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        ): void {
        const yOffset: number = height / 4;
        const pieceSize: number = this.currentOrientation[0].length;
        const blockSize: number = (width / 4)
        const xOffset: number = pieceSize === 3 ? blockSize / 2 : 0;
        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('NEXT', 10, 30);

        this.currentOrientation.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell === 1) {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(
                        c * blockSize + xOffset,
                        r * blockSize + yOffset, 
                        blockSize - 1, blockSize - 1);
                }
            });
        });
    }

    public drawStatBox(
        ctx: CanvasRenderingContext2D,
        width: number,
        verticalOffset: number,
    ): void {
        const scale: number = 20;
        const pieceSize: number = this.currentOrientation[0].length;
        const xOffset: number = (width - pieceSize * scale) / 2 - 20;
        let yOffset: number = 60 + verticalOffset * scale * 2.5;
        if (this.name === 'I') {
            yOffset -= 15;
        }
        if (this.name === 'O') {
            yOffset -= 5;
        }

        this.currentOrientation.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell === 1) {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(
                        c * scale + xOffset,
                        r * scale + yOffset,
                        scale - 1,
                        scale - 1,
                    );
                }
            });
        });
    }
}
