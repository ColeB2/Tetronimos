interface LinesDisplayProps {
    lines: number;
    paddedZeroes?: number;
}

const LinesDisplay = ({lines, paddedZeroes=0}: LinesDisplayProps) => {
    const formattedLines = lines.toString().padStart(paddedZeroes, '0')
    return (
        <div className='flex justify-center items-center'>
            <div className='flex bg-black justify-center items-center w-[299px] h-[59px]'>
                <h1 className='white font-bold text-3xl'>
                    LINES - {formattedLines}
                </h1>
            </div>
        </div>

    )
}
export default LinesDisplay;