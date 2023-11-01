import { Component, OnInit, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from './models/team';

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
  tableTeams: Team[] = []
  headers: string[] = ["Nombre", "Código", "Goles totales", "Goles a favor", "Goles en contra", "Dinámica"];

  // Http client
  //http = inject(HttpClient);
  host = "v3.football.api-sports.io";
  apiKey = "5316059e8b48f2d2ae0f3d562dfc8958";
  // Current season: 2023. ***WARNING: will it change for the 2024 year?***
  season: number = 2023;
  // 140 is the id for "La Liga" league.
  league: number = 140;
  // La Liga current season teams.
  teamIds: number[] = [529, 530, 531, 532, 533, 534, 536, 538, 541, 542, 543, 546, 547, 548, 715, 723, 724, 727, 728, 798];

  // General
  teams: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //this.doRequest();
    this.http.get<Team[]>("http://localhost:8080").subscribe((data) => {
      this.tableTeams = data;
    });
  }

  showTabInfo(t: number) {
    this.activeTab = t;
  }

  doRequest() {
    const headers= new HttpHeaders()
      .set('x-rapidapi-host', this.host)
      .set('x-rapidapi-key', this.apiKey);
    
    this.teamIds.forEach((teamId) => {
      this.http.get(`/api/teams/statistics?season=${this.season}&team=${teamId}&league=${this.league}`, {headers: headers}).subscribe((data: any) => {
        this.teams = data;
        console.log(data);
      });
    }); 
  }
}
