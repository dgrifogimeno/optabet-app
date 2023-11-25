import { Component, OnInit, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from './models/team';
import { Match } from './models/match';
import { statistics } from './models/statistics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  title = 'optabet-app';

  // Tabs
  tabs: string[] = ["../../../assets/images/hogar.png", "../../../assets/images/investigacion.png", "../../../assets/images/configuraciones.png"];
  activeTab: number = 0;

  // Table
  headers: string[] = ["Cód.", "Din.", "P. Local", "P. Vis.", "GF", "GC", "GF Mins.", "GC Mins.", "Port. 0", "Goles 0", "TA", "TR", ""];
  headersHelpers: string[] = ["", "➡️", "V : E : D", "V : E : D", "L : V", "L : V", "0-15 : 16-30 : 31-45 : 46-60 : 61-75 : 76-90", "0-15 : 16-30 : 31-45 : 46-60 : 61-75 : 76-90", "L : V", "L : V", "", "", ""];

  // Http client
  //http = inject(HttpClient);
  host = "v3.football.api-sports.io";
  apiKey = "5316059e8b48f2d2ae0f3d562dfc8958";
  // Current season: 2023. ***WARNING: will it change for the 2024 year?***
  season: number = 2023;
  // 140 is the id for "La Liga" league.
  league: number = 140;
  // La Liga current season teams.
  teamIds: number[] = [/*529, 530, 531, 532, 533, 534, 536, 538, 541, 542, 543, 546, 547, */548/*, 715, 723, 724, 727, 728, 798*/];
  // Already played rounds.
  rounds: String[] = ["Regular season - 1"/*, "Regular season - 2", "Regular season - 3", "Regular season - 4", "Regular season - 5", "Regular season - 6", "Regular season - 7", "Regular season - 8", "Regular season - 9", "Regular season - 10", "Regular season - 11", "Regular season - 12", "Regular season - 13", "Regular season - 14"*/];

  // General
  teams: any[] = [];
  matchesRound: any[] = [];
  statisticsTuple: any[] = [];
  statisticsMap: { [key: string]: any } = {} 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Team[]>("http://localhost:8080/teams").subscribe((data) => {
      this.teams = data;
      this.teams.sort((a, b) => a.code.localeCompare(b.code));
    });
  }

  // Tab info
  showTabInfo(t: number) {
    this.activeTab = t;
  }

  // Aux functions
  getTeamCode(name: String) {
    let splittedName = name.split(' ');
    if (splittedName.length == 2) {
      switch(splittedName[0]) {
        case "Real":
          return splittedName[1].substring(0, 3);
          break;
        case "Atletico":
        case "Athletic":
          return splittedName[0].substring(0, 2) + splittedName[1].substring(0, 1);
          break;
        case "Las":
          return splittedName[1].substring(0, 3);
          break;
        default:
          return splittedName[0].substring(0, 3);
      }
    } else {
        return splittedName[0].substring(0, 3);
    }
  }

  isNullInt(value: any) {
    return value == null ? 0 : value;
  }

  // TEAM MANAGEMENT -------------------------------------------------------

  insertTeam(team: any) {
    this.http.post("http://localhost:8080/insertTeam", team).subscribe(
      (response) => {
        console.log('Respuesta del servidor: ', response);
        this.teams.push(team);
        this.teams.sort((a, b) => a.code.localeCompare(b.code));
      },
      (error) => {
        console.error('Error en la solicitud: ', error);
      }
    );
  }

  buildTeam(data: any) {
    const id = data.response.team.id;
    const name = data.response.team.name;
    const code = this.getTeamCode(data.response.team.name).toUpperCase();
    const form = data.response.form;
    const wins_local_games = data.response.fixtures.wins.home;
    const draws_local_games = data.response.fixtures.draws.home;
    const loses_local_games = data.response.fixtures.loses.home;
    const wins_visitor_games = data.response.fixtures.wins.away;
    const draws_visitor_games = data.response.fixtures.draws.away;
    const loses_visitor_games = data.response.fixtures.loses.away;
    const favour_local_goals = data.response.goals.for.total.home;
    const favour_visitor_goals = data.response.goals.for.total.away;
    const against_local_goals = data.response.goals.against.total.home;
    const against_visitor_goals = data.response.goals.against.total.away;
    const favour_goals_0_15 = data.response.goals.for.minute['0-15']['total'];
    const favour_goals_16_30 = data.response.goals.for.minute['16-30']['total'];
    const favour_goals_31_45 = data.response.goals.for.minute['31-45']['total'];
    const favour_goals_46_60 = data.response.goals.for.minute['46-60']['total'];
    const favour_goals_61_75 = data.response.goals.for.minute['61-75']['total'];
    const favour_goals_76_90 = data.response.goals.for.minute['76-90']['total'];
    const against_goals_0_15 = data.response.goals.against.minute['0-15']['total'];
    const against_goals_16_30 = data.response.goals.against.minute['16-30']['total'];
    const against_goals_31_45 = data.response.goals.against.minute['31-45']['total'];
    const against_goals_46_60 = data.response.goals.against.minute['46-60']['total']
    const against_goals_61_75 = data.response.goals.against.minute['61-75']['total'];
    const against_goals_76_90 = data.response.goals.against.minute['76-90']['total'];
    const local_clean_sheets = data.response.clean_sheet.home;
    const visitor_clean_sheets = data.response.clean_sheet.away;
    const local_failed_to_score = data.response.failed_to_score.home;
    const visitor_failed_to_score = data.response.failed_to_score_away;
    const total_yellow_cards = 
      this.isNullInt(data.response.cards.yellow['0-15']['total']) + 
      this.isNullInt(data.response.cards.yellow['16-30']['total']) + 
      this.isNullInt(data.response.cards.yellow['31-45']['total']) + 
      this.isNullInt(data.response.cards.yellow['46-60']['total']) + 
      this.isNullInt(data.response.cards.yellow['61-75']['total']) + 
      this.isNullInt(data.response.cards.yellow['76-90']['total']);
    const total_red_cards = 
      this.isNullInt(data.response.cards.red['0-15']['total']) + 
      this.isNullInt(data.response.cards.red['16-30']['total']) + 
      this.isNullInt(data.response.cards.red['31-45']['total']) + 
      this.isNullInt(data.response.cards.red['46-60']['total']) + 
      this.isNullInt(data.response.cards.red['61-75']['total']) + 
      this.isNullInt(data.response.cards.red['76-90']['total']);

    const t = {
      id,
      name,
      code,
      form, 
      wins_local_games,
      draws_local_games,
      loses_local_games,
      wins_visitor_games,
      draws_visitor_games,
      loses_visitor_games,
      favour_local_goals,
      favour_visitor_goals,
      against_local_goals,
      against_visitor_goals,
      favour_goals_0_15,
      favour_goals_16_30,
      favour_goals_31_45,
      favour_goals_46_60,
      favour_goals_61_75,
      favour_goals_76_90,
      against_goals_0_15,
      against_goals_16_30,
      against_goals_31_45,
      against_goals_46_60,
      against_goals_61_75,
      against_goals_76_90,
      local_clean_sheets,
      visitor_clean_sheets,
      local_failed_to_score,
      visitor_failed_to_score,
      total_yellow_cards,
      total_red_cards
    }

    this.insertTeam(t);
  }

  doRequestTeamsInfo() {
    const headers= new HttpHeaders()
      .set('x-rapidapi-host', this.host)
      .set('x-rapidapi-key', this.apiKey);
    
    this.teamIds.forEach((teamId) => {
      this.http.get(`/api/teams/statistics?season=${this.season}&team=${teamId}&league=${this.league}`, {headers: headers}).subscribe(async (data: any) => {
        this.buildTeam(data);
        await new Promise(f => setTimeout(f, 1000));
      });
    }); 
  }

  // -----------------------------------------------------------------------



  // MATCH MANAGEMENT ------------------------------------------------------

  getRound(round: string) {
    let r: string[] = round.split('-');
    return Number(r[1]);
  }

  insertMatch(match: any) {
    this.http.post("http://localhost:8080/insertMatch", match).subscribe(
      (response) => {
        console.log('Respuesta del servidor: ', response);
      },
      (error) => {
        console.error('Error en la solicitud: ', error);
      }
    );
  }

  buildMatch(data: any) {
    for (let i = 0; i < 10; i++) {
      const id = data.response[i].fixture.id;
      const status = data.response[i].fixture.status.short;
      const round = this.getRound(data.response[i].league.round);
      const home_team_id = data.response[i].teams.home.id;
      const home_team_name = data.response[i].teams.home.name;
      const away_team_id = data.response[i].teams.away.id;
      const away_team_name = data.response[i].teams.away.name;
      const home_team_goals = data.response[i].goals.home;
      const away_team_goals = data.response[i].goals.away;
      const home_halftime_goals = data.response[i].score.halftime.home;
      const away_halftime_goals = data.response[i].score.halftime.away;
      const home_fulltime_goals = data.response[i].score.fulltime.home;
      const away_fulltime_goals = data.response[i].score.fulltime.away;

      const m = {
        id,
        status,
        round,
        home_team_id,
        home_team_name,
        away_team_id,
        away_team_name,
        home_team_goals,
        away_team_goals,
        home_halftime_goals,
        away_halftime_goals,
        home_fulltime_goals,
        away_fulltime_goals
      }

      this.insertMatch(m);
    }
  }

  doRequestMatchesInfo() {
    const headers= new HttpHeaders()
      .set('x-rapidapi-host', this.host)
      .set('x-rapidapi-key', this.apiKey);

      this.rounds.forEach((round) => {
        this.http.get(`/api/fixtures?league=${this.league}&season=${this.season}&round=${round}`, {headers: headers}).subscribe(async (data: any) => {
          this.buildMatch(data);
          await new Promise(f => setTimeout(f, 1000));
          
        })
      });
  }

  // -----------------------------------------------------------------------



  // STATISTICS MANAGEMENT -------------------------------------------------

  
  insertStatistic(statistic: any) {
    this.http.post("http://localhost:8080/insertStatistic", statistic).subscribe( 
      (response) => {
        console.log('Respuesta del servidor: ', response);
        
      },
      (error) => {
        console.error('Error en la solicitud: ', error);
      }
    );
  }

  buildStatistics(data: any, match_id: number, team_id: number) {
    let statistics = data.response[0].statistics;

    statistics.forEach((stat: { type: string; value: any; }) => {
      const statType = stat.type;
      const statValue = stat.value;

      this.statisticsMap[statType] = statValue;
    })

    const s = {
        team_id,
        match_id,
        'shots_on_goal': this.statisticsMap["Shots on Goal"],
        'total_shots': this.statisticsMap["Total Shots"],
        'shots_insidebox': this.statisticsMap["Shots insidebox"],
        'shots_outsidebox': this.statisticsMap["Shots outsidebox"],
        'fouls': this.statisticsMap["Fouls"],
        'corner_kicks': this.statisticsMap["Corner Kicks"],
        'offsides': this.statisticsMap["Offsides"],
        'ball_possesion': this.statisticsMap["Ball Possession"],
        'yellow_cards': this.statisticsMap["Yellow Cards"],
        'red_cards': this.statisticsMap["Red Cards"],
        'goalkeeper_saves': this.statisticsMap["Goalkeeper Saves"],
        'total_passes': this.statisticsMap["Total passes"],
        'passes_accurate': this.statisticsMap["Passes accurate"],
        'passes_percentage': this.statisticsMap["Passes %"],
      }

    this.insertStatistic(s);
  }

  createStatisticsTuple(matches: any[]) {
    matches.forEach((m) => {
      let tuple1 = [m.id, m.home_team_id];
      let tuple2 = [m.id, m.away_team_id];
      this.statisticsTuple.push(tuple1);
      this.statisticsTuple.push(tuple2);
    });

    const headers= new HttpHeaders()
      .set('x-rapidapi-host', this.host)
      .set('x-rapidapi-key', this.apiKey);

    this.statisticsTuple.forEach((t) => {
      this.http.get(`/api/fixtures/statistics?fixture=${t[0]}&team=${t[1]}`, {headers: headers}).subscribe(async (data: any) => {
        this.buildStatistics(data, t[0], t[1]);
        await new Promise(f => setTimeout(f, 3000));
      });
    });
  }

  getMatchesByRound(round: number) {
    this.http.get(`http://localhost:8080/matches/round?r=${round}`).subscribe(async (data: any) => {
      this.matchesRound = data;
      this.matchesRound.sort((a, b) => a.id - b.id);

      this.createStatisticsTuple(this.matchesRound);
      await new Promise(f => setTimeout(f, 3000));
    },
    (error) => {
      console.error('Error recogiendo los partidos: ', error);
    });
  }

  doRequestStatisticsInfo() {
    this.getMatchesByRound(1);
  }

  // -----------------------------------------------------------------------
}
