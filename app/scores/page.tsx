'use client';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Scores, ScoresResponse } from './types';
import scoresApi from './api';


export default function Scores() {
    const [scores, setScores] = useState<Scores[]|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await scoresApi
                    .get('/api/scores/all')
                    .then((res: ScoresResponse) => {
                        const orderedScores = res.data.sort((a, b ) => {
                            return b.Score - a.Score
                        })
                        setScores(orderedScores as Scores[]);
                    })
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    return (
        <>
            <h1 className="mb-4 text-4xl font-bold text-center text-black-700">
                High Scores
            </h1>
            <h3 className="mb-4 text-2xl text-center text-black-700">
                High Scores may take time to update.
            </h3>
            

            <div className="flex justify-center">
                <div>
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            <th className="py-2 px-2 text-left">Rank</th>
                            <th className="py-2 px-2 text-left">Player Name</th>
                            <th className="py-2 px-2 text-left">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scores && scores.map((score, index) => (
                            <tr key={score.ScoreId} className="">
                                <td className="py-1 px-2">{index + 1}</td>
                                <td className="py-1 px-2">{score.PlayerName}</td>
                                <td className="py-1 px-2">{score.Score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                
            </div>
        </>
    )
}
