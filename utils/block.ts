// Block Class --> Represents a Square on a tetris board/cell on a grid.

type BlockState = 0 | 1;

export class Block {
    public x: number;
    public y: number;
    public width: number;
    public color: string;
    public state: BlockState;

    constructor(
        x: number,
        y: number,
        width: number,
        color: string,
        state: BlockState,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.color = color;
        this.state = state;
    }

    public drawBlock(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.state === 1 ? this.color : 'black';
        ctx.fillRect(
            this.x * this.width,
            this.y * this.width,
            this.width - 1,
            this.width - 1,
        );
    }
}
export type { BlockState} 
