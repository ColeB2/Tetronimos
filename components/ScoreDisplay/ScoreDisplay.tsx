interface ScoreDisplayProps {
    label: string;
    score: number;
    paddedZeroes?: number;
}

const ScoreDisplay = ({score, label, paddedZeroes=0}: ScoreDisplayProps) => {
    const formattedScore = score.toString().padStart(paddedZeroes, '0')
    return (
        <div className='score-container bg-black font-bold text-3xl w-1/2'>
                <h1 className='white text-left'>{label}</h1>
                <h1 className='white text-left'>{formattedScore}</h1>
        </div>
    )
}
export default ScoreDisplay;