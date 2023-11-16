import React from 'react';

interface EndScreenProps {
    handleRestartGame: () => void;
    score: number;
}

const EndScreen = ({
    handleRestartGame,
    score
    }: EndScreenProps) => {

    return (
        <div className='flex flex-col items-center justify-center'>
            <div>
                <h1 className='black font-bold text-3xl mb-4'>
                    {score}
                </h1>
            </div>
            <button 
                onClick={handleRestartGame}
                className="
                    bg-blue-500
                    hover:bg-blue-700
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded
                    focus:outline-none
                    focus:shadow-outline-blue
                    active:bg-blue-800"
            >
                Start
            </button>
        </div>
    )
}
export default EndScreen