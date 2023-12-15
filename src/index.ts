import { Board } from '../utils/board';
import { Piece } from '../utils/piece';
import { tetronimoPieces } from '../utils/tetronimo';
import type { PieceObject, PieceStats } from '../utils/types';
import { SPEED, LEVELS, SCORE_MULT } from '../constants/constants';

class MainGame {
    public cellWidth: number;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    public nextBoxCanvas: HTMLCanvasElement;
    public nextBoxCtx: CanvasRenderingContext2D;

    public statsBoxCanvas: HTMLCanvasElement;
    public statsBoxCtx: CanvasRenderingContext2D;

    public board: Board;

    public pieceCount: PieceStats;
    public shapeList: any = tetronimoPieces;
    public piece: Piece;
    public nextPiece: Piece;

    public pieceLanded: boolean;
    public isRunning: boolean;
    public isPaused: boolean;
    public startTime: number;

    public gameOver: boolean;
    public lateralMoveFrequency: number;
    public dtLastLateralMove: number;

    public dtLastDownMove: number;
    public downFrequency: number;
    public downMoveFreqency: number;

    public startLevel: number;
    public level: number;
    public linesCleared: number;
    public score: number;


    constructor(
        canvas: HTMLCanvasElement,
        nextCanvas: HTMLCanvasElement,
        statsCanvas: HTMLCanvasElement,
        level: number,
        ) {
        this.cellWidth = 50;
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.nextBoxCanvas = nextCanvas
        this.nextBoxCtx = this.nextBoxCanvas.getContext(
        '2d',
        ) as CanvasRenderingContext2D;

        this.statsBoxCanvas = statsCanvas;
        this.statsBoxCtx = this.statsBoxCanvas.getContext(
        '2d',
        ) as CanvasRenderingContext2D;

        this.board = new Board(10, 20, 'black', []);
        this.pieceCount = { O: 0, I: 0, S: 0, Z: 0, J: 0, L: 0, T: 0 };

        this.piece = new Piece(
        this.shapeList[Math.floor(Math.random() * this.shapeList.length)],
        this.board,
        );
        this.nextPiece = new Piece(
        this.shapeList[Math.floor(Math.random() * this.shapeList.length)],
        this.board,
        );
        this.pieceLanded = false;
        this.isRunning = true;
        this.isPaused = false;
        this.startTime = performance.now();

        this.gameOver = false;
        this.lateralMoveFrequency = 150;
        this.dtLastLateralMove = performance.now();

        this.dtLastDownMove = performance.now();

        this.startLevel = 0;
        this.level = level;
        this.linesCleared = 0;
        this.score = 0;


        this.downFrequency = SPEED[this.level];
        this.downMoveFreqency = this.downFrequency;

        this.initializeGame();
        this.movementControlEvents();
        this.pauseControlEvents();
    }

    initializeGame() {
        this.board.createBlankBoard();
        this.piece.spawnPiece();
        this.updatePieceStats(this.piece.name);

        this.updateNextBox();
        this.displayStats();

        this.board.drawBoard(this.ctx);
        this.piece.drawPiece(this.ctx);
    }

    updatePieceStats(pieceName: string): void {
        this.pieceCount[pieceName] += 1;
    }

    displayStatText() {
        this.statsBoxCtx.fillStyle = 'white';
        this.statsBoxCtx.font = 'bold 25px Arial';
        this.statsBoxCtx.fillText('STATISTICS', 5, 25);
    }
    displayStatValues() {
        const x = 95;
        const y = 104;
        this.shapeList.forEach((piece: Piece, p: number) => {
        this.statsBoxCtx.fillStyle = 'white';
        this.statsBoxCtx.font = '20px Arial';
        this.statsBoxCtx.fillText(
            this.pieceCount[piece.name].toString(),
            x,
            y + p * 50,
        );
        });
    }

    displayStats() {
        this.statsBoxCtx.fillStyle = 'black';
        this.statsBoxCtx.fillRect(
            0,
            0,
            this.statsBoxCanvas.width,
            this.statsBoxCanvas.height,
        );
        const pieces = this.createStatePieces();
        pieces.forEach((piece, p) => {
            piece.drawStatBox(
                this.statsBoxCtx,
                this.statsBoxCanvas.width,
                p,
            );
        });
        this.displayStatText();
        this.displayStatValues();
    }

    updateNextBox() {
        this.nextBoxCtx.fillStyle = 'black';
        this.nextBoxCtx.fillRect(
            0,
            0,
        this.nextBoxCanvas.width,
        this.nextBoxCanvas.height,
        );
        this.nextPiece.drawNextBox(
            this.nextBoxCtx,
            this.nextBoxCanvas.width,
            this.nextBoxCanvas.height,
        );
    }

    createStatePieces(): Piece[] {
        return this.shapeList.map((piece: PieceObject) => (
            new Piece(piece, this.board)
        ));
    }

    updateVisuals() {
        if (!this.isPaused) {
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height)
            this.board.drawBoard(this.ctx);
            this.piece.drawPiece(this.ctx);
        }
    }

    pause(event: KeyboardEvent) {
        // p is the current pause key, eventually make it editable.
        if (event.key === 'p') {
            this.isPaused = !this.isPaused
        }
    }
  
    pauseControlEvents() {
        document.addEventListener('keydown', (event) =>
            this.pause(event),
        );
    }


    lateralMovementControls(event: KeyboardEvent) {
        if (!this.isPaused) {
            const keyName = event.key;
            if (
                performance.now() - this.dtLastLateralMove >
                this.lateralMoveFrequency
            ) {
                if (keyName === 'a' || keyName === 'ArrowLeft') {
                    this.piece.handleMovement(-1);
                    this.dtLastLateralMove = performance.now();
                } else if (keyName === 'd' || keyName === 'ArrowRight') {
                    this.piece.handleMovement(1);
                    this.dtLastLateralMove = performance.now();
                }
            }
        }
    }

    downMovementControls(event: KeyboardEvent) {
        if (!this.isPaused) {
            const keyName = event.key;
            if (keyName === 's' || keyName === 'ArrowDown') {
                this.downMoveFreqency = 0;
            } else {
                this.downMoveFreqency = this.downFrequency;
            }
        }
    }

    rotationMovementControls(event: KeyboardEvent) {
        const keyName = event.key;
        if (keyName === 'q' || keyName === '7') {
            this.piece.handleMovement(-1, true);
        } else if (keyName === 'e' || keyName === '9') {
            this.piece.handleMovement(1, true);
        }
    }

    downMovementRelease(event: KeyboardEvent) {
        const keyName = event.key;
        if (keyName === 's' || keyName === 'ArrowDown') {
            this.downMoveFreqency = this.downFrequency;
        }
    }

    movementControlEvents() {
        document.addEventListener('keydown', (event) =>
            this.lateralMovementControls(event),
        );
        document.addEventListener('keydown', (event) =>
            this.downMovementControls(event),
        );
        document.addEventListener('keyup', (event) =>
            this.downMovementRelease(event),
        );
        document.addEventListener('keydown', (event) =>
            this.rotationMovementControls(event),
        );
    }

    removeMovementControlEvents() {
        document.removeEventListener('keydown', (event) =>
            this.lateralMovementControls(event),
        );
        document.removeEventListener('keydown', (event) =>
            this.downMovementControls(event),
        );
        document.removeEventListener('keyup', (event) =>
            this.downMovementRelease(event),
        );
        document.removeEventListener('keydown', (event) =>
            this.rotationMovementControls(event),
        );
    }

    handleLineClear(rowsToClear: number[]) {
        this.linesCleared += rowsToClear.length;
        rowsToClear.forEach((row) => {
            this.board.clearRow(row);
            this.board.moveRowsDown(row);
        });
    }

    handleLevel(): void {
        if (this.level > this.startLevel) {
            if (
                this.linesCleared >=
                LEVELS[this.startLevel] + 10 * (this.level - this.startLevel)
            ) {
                this.level += 1;
            }
        } else if (this.linesCleared >= LEVELS[this.startLevel]) {
            this.level = this.startLevel + 1;
        }
    }
    
      handleLineScore(numLines: number) {
        this.score += SCORE_MULT[numLines] * (this.level + 1);
      }

    gameOverCheck() {
        if (this.piece.validSpawn === false) {
            this.gameOver = true;
        }
    }

    handleGameOver(startLevel: number) {
        this.board.resetBoard();
        this.piece = new Piece(
        this.shapeList[Math.floor(Math.random() * this.shapeList.length)],
        this.board,
        );
        this.score = 0;
        this.level = startLevel;
        this.linesCleared = 0;

        this.pieceCount = { O: 0, I: 0, S: 0, Z: 0, J: 0, L: 0, T: 0 };
        this.updatePieceStats(this.piece.name);
        this.displayStats();

        this.piece.spawnPiece();
        this.level = startLevel
        this.downFrequency = SPEED[startLevel];
        this.gameOver = false;
    }
}
export default MainGame;
