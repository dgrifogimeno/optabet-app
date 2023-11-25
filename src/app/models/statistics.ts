import { Match } from "./match";
import { Team } from "./team";

export interface statistics {
    id?: number,
    team_id: number,
    match_id: number,
    shots_on_goal: number,
    total_shots: number,
    shots_insidebox: number,
    shots_outsidebox: number,
    fouls: number,
    corner_kicks: number,
    offsides: number,
    ball_possesion: string,
    yellow_cards: number,
    red_cards: number,
    goalkeeper_saves: number,
    total_passes: number,
    passes_accurate: number,
    passes_percentage: string
}