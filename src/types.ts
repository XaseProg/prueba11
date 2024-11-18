export interface Player {
  id: string;
  name: string;
  teamId: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  points: number;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}