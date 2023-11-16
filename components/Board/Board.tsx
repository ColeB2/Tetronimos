import React, { useEffect, useRef, useState } from "react";
// import all other game stuff
import { Piece } from "../../utils/piece";
import { LEVELS, SPEED } from "../../constants/constants";
import MainGame from "../../src";
import LinesDisplay from "../LinesDisplay/LinesDisplay";
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay";

// import './Board.module.css'
import './Board.css'


interface BoardComponentProps {
    startLevel?: number;
    score?: number;
    highScore?: number;
    changeScore: (score: number) => void;
    handleEndGame: () => void;
}

const BoardComponent = ({
        startLevel=0,
        score=0,
        highScore=0,
        changeScore,
        handleEndGame
    }: BoardComponentProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nextBoxCanvasRef = useRef<HTMLCanvasElement>(null);
    const statsBoxCanvasRef = useRef<HTMLCanvasElement>(null);
    
    const [canvas, setCanvas] = useState<HTMLCanvasElement|null>(null);
    const [nextCanvas, setNextCanvas] = useState<HTMLCanvasElement|null>(null);
    const [statsCanvas, setStatsCanvas] = useState<HTMLCanvasElement|null>(null);

    const [mainGameState, setMainGameState] = useState<any>(null);

    const [updateHud, setUpdateHud] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(startLevel);
    const [lines, setLines] = useState<number>(0);




    useEffect(() => {
        if (mainGameState) {
            setLines(mainGameState.linesCleared);
            changeScore(mainGameState.score);
            const newLevel = handleLevelUpdate(level, lines);
            setLevel(newLevel);
        }
    }, [updateHud])
    

    const handleLineClearUpdate = (numLines: number) => {
        // setLinesCleared(numLines)
    }

    const handleLevelUpdate = (curLevel: number, curLines: number) => {
        if (level > startLevel) {
            if (curLines >= LEVELS[startLevel] + 10 * (curLevel - startLevel)) {
                return curLevel + 1
            } else {
                return curLevel
            }
        } else if (curLines >= LEVELS[startLevel]) {
            return startLevel + 1
        } else {
            return curLevel
        }
    }


    // Get canvasRefs for main game
    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const nextBoxCanvas: HTMLCanvasElement = nextBoxCanvasRef.current!;
        const statsBoxCanvas: HTMLCanvasElement = statsBoxCanvasRef.current!;
        setCanvas(canvas);
        setNextCanvas(nextBoxCanvas);
        setStatsCanvas(statsBoxCanvas);
    }, [])

    useEffect(()=> {
        if (canvas && nextCanvas && statsCanvas) {
            const mg = new MainGame(
                canvas,
                nextCanvas,
                statsCanvas,
                startLevel
            )
            setMainGameState(mg)
        }
    }, [canvas, nextCanvas, statsCanvas])



    const gameLogic = () => {
        const self = mainGameState
        if (self.piece.landed) {
            //Line Clearing/Scoring
            let linesToClear = self.board.lineClearCheck();
            if (linesToClear.length !== 0) {
                self.handleLineClear(linesToClear);
                self.handleLineScore(linesToClear.length);
                setUpdateHud(prev => !prev);
                handleLineClearUpdate(linesToClear.length);
            }
            self.handleLevel();
    
            //Piece Handling
            self.piece = self.nextPiece;
            self.updatePieceStats(self.piece.name);
            self.displayStats();
    
            self.piece.spawnPiece();
            self.downFrequency = SPEED[mainGameState.level];
            self.downMoveFreqency = self.downFrequency; //reset gravity to level gravity
            self.nextPiece = new Piece(
                self.shapeList[Math.floor(Math.random() * self.shapeList.length)],
                self.board,
            );
            self.updateNextBox();
    
            //Handle Game over
            self.gameOverCheck();
            if (self.gameOver) {
                handleEndGame();
            }
            self.piece.landed = false;
            }
    }

    const pieceGravity = () => {
        const self = mainGameState
        if (performance.now() - self.dtLastDownMove > self.downMoveFreqency) {
            self.piece.handleGravity();
            self.dtLastDownMove = performance.now();
        }
    }

    const update = () => {
        if (!mainGameState.isPaused) {
            mainGameState.updateVisuals();
            pieceGravity();
            gameLogic()
        } else {
            const self = mainGameState
            self.ctx.fillStyle = 'black';
            self.ctx.fillRect(0,0, self.canvas.width, self.canvas.height)
        }
    }


    useEffect(() => {
        if (mainGameState !== null) {
            const mainLoop: any = ()  => {
                const self = mainGameState;
                function main(timestamp: DOMHighResTimeStamp) {
                    if (self.isRunning) {
                        if (timestamp - self.startTime > 20) {
                            update();
                            self.startTime = performance.now();
                        }
                        window.requestAnimationFrame(main);
                    }
                }
                window.requestAnimationFrame(main);
            }
            mainLoop()
        }
    }, [mainGameState])


    return (
        <div>
            
            <div className="canvas-container">
                <div className="left-hud">
                    <canvas
                        id="statBox"
                        ref={statsBoxCanvasRef}
                        height="509"
                        width="150"
                    />
                </div>

                <div className="center-hud">
                    {canvas && <LinesDisplay lines={lines} paddedZeroes={3}/>}
                    <canvas
                        id="canvas"
                        ref={canvasRef}
                        height="599"
                        width="299"
                    />
                </div>
                <div className="right-hud">
                    {canvas &&
                        <ScoreDisplay
                            label={"TOP"}
                            score={highScore}
                            paddedZeroes={6}
                        />
                    }
                    {canvas &&
                        <ScoreDisplay
                            label={"SCORE"}
                            score={score}
                            paddedZeroes={6}
                        />
                    }
                    <canvas
                        id="nextBox"
                        ref={nextBoxCanvasRef}
                        height="180"
                        width="120"
                    />
                    <br/>
                    {canvas &&
                        <ScoreDisplay 
                            label={"LEVEL"}
                            score={level}
                            paddedZeroes={2}
                        />
                    }
                </div>
            </div>
            
            
        </div>
    )
}
export default BoardComponent