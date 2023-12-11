import React, { useState } from 'react'
import submitApi from './api'

interface EndScreenProps {
    handleRestartGame: () => void;
    username: string;
    score: number;
}

const EndScreen = ({
    handleRestartGame,
    username, 
    score
    }: EndScreenProps) => {
        
    const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
    const handleSubmitScore = async() => {
        if (isScoreSubmitted) {
            return
        }
        const requestBody = {
            score: score,
            name: username,
        }
        try {
            const response = await submitApi.post('/', requestBody)
            
            if (response.status == 200) {
                console.log('submitted successfully', response.data)
            } else {
                console.log('error', response.status, response.statusText)
            }
            setIsScoreSubmitted(true);
        } catch (error: any) {
            // Handle network or request errors
            console.error('Error:', error.message);
        }
    
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div>
                <h1 className='black font-bold text-3xl mb-4'>
                    {score}
                </h1>
            </div>
            <button 
                onClick={handleSubmitScore}
                className="
                    bg-blue-500
                    hover:bg-blue-700
                    text-white
                    font-bold
                    py-2
                    px-4
                    mb-14
                    rounded
                    focus:outline-none
                    focus:shadow-outline-blue
                    active:bg-blue-800"
            >
                Submit
            </button>
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
                Restart
            </button>
        </div>
    )
}
export default EndScreen