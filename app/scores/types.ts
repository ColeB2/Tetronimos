interface Scores {
    ScoreId: number;
    PlayerName: string;
    Score: number;
}

interface ScoresResponse {
    data: Scores[];
}

export type {
    Scores,
    ScoresResponse
}



