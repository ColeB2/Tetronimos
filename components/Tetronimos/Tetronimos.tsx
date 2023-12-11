import React, { useState } from "react";
import BoardComponent from "../Board/Board";
import StartScreen from "../Start/Start";
import EndScreen from "../End/End";
import NameGenerator from "../NameSelect/NameSelect";
import ControlsDisplay from "../Controls/Controls";
import { adjectives, nouns } from "./utils";




const Tetronimos = () => {
    const [gameState, setGameState] = useState<string>('name');
    const [selectedLevel, setSelectedLevel] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);
    const [username, setUsername] = useState<string>('')

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

    const handleUsernameChange = (newName: string) => {
        setUsername(newName);
        setGameState('start')
    }
    
    const restartGame = () => {
        setScore(0);
        setSelectedLevel(0);
        setGameState('start');
    };
    
    return (
        <div>
            {gameState === 'name' && 
                <div>
                    <NameGenerator
                        nouns={nouns}
                        adjectives={adjectives}
                        handleNameSelect={handleUsernameChange}
                    />
                </div>
            }
            {gameState === 'start' &&
                <div className="mt-10">
                    <StartScreen
                        handleStartGame={handleStartGame}
                        handleLevelSelect={handleLevelSelect}
                        username={username}
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
                    username={username}
                    score={score}
                />}
        </div>
    )
}

export default Tetronimos