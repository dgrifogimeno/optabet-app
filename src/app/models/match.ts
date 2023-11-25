export interface Match {
    id: number,
    status: string,
    round: number,
    home_team_id: number,
    home_team_name: string,
    away_team_id: number,
    away_team_name: string,
    home_team_goals: number,
    away_team_goals: number,
    home_halftime_goals: number,
    away_halftime_goals: number,
    home_fulltime_goals: number;
    away_fulltime_goals: number,
}