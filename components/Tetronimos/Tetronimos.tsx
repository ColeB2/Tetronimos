import React, { useState, useEffect } from "react";
import BoardComponent from "../Board/Board";
import StartScreen from "../Start/Start";
import EndScreen from "../End/End";
import ControlsDisplay from "../Controls/Controls";


const Tetronimos = () => {
    const [gameState, setGameState] = useState<string>('start');
    const [selectedLevel, setSelectedLevel] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);

    const handleStartGame = () => {
        setGameState('gameplay')
        
    };

    const handleLevelSelect = (level: number) => {
        setSelectedLevel(level);
    }

    const handleScoreChange = (newScore: number) => {
        setScore(newScore);
        if (newScore > highScore) {
            setHighScore(newScore);
        }
    }

    const handleGameOver = () => {
        setGameState('end');
    };
    
    const restartGame = () => {
        setScore(0);
        setSelectedLevel(0);
        setGameState('start');
    };
    
    return (
        <div>
            {gameState === 'start' &&
                <div className="mt-10">
                    <StartScreen
                        handleStartGame={handleStartGame}
                        handleLevelSelect={handleLevelSelect}
                    />
                    <ControlsDisplay />
                </div>
            }
            
            {gameState ==='gameplay' && 
                <BoardComponent
                    startLevel={selectedLevel}
                    score={score}
                    highScore={highScore}
                    changeScore={handleScoreChange}
                    handleEndGame={handleGameOver}
                />
                }
            {gameState === 'end' &&
                <EndScreen 
                    handleRestartGame={restartGame}
                    score={score}
                />}
        </div>
    )
}

export default Tetronimos