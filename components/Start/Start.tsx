import React from 'react';

interface StartScreenProps {
    handleStartGame: () => void;
    handleLevelSelect: (level: number) => void;
    username: string;
}

const StartScreen = ({handleStartGame, handleLevelSelect, username}: StartScreenProps) => {

    const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleLevelSelect(parseInt(event.target.value));
    }

    const levelOptions = Array.from({length: 19}, (_, index) => index)

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='z-2'>
                <h1 className='black font-bold text-3xl mb-4'>
                    Hello {username}
                </h1>
                <h1 className='black font-bold text-3xl mb-4'>
                    Select A Level
                </h1>
            </div>
            <select
                onChange={handleLevelChange}
                className="
                bg-gray-50
                border
                border-gray-300
                text-gray-900
                text-sm
                rounded-lg
                focus:ring-blue-500
                focus:border-blue-500
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
                mb-4
                z-2
                "
            >
                {
                levelOptions.map((level) => (
                    <option key={level} value={level}>{level}</option>
                ))
                }
            </select>
            <button 
                onClick={handleStartGame}
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
export default StartScreen