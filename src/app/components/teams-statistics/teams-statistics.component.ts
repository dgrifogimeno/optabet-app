import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-teams-statistics',
  templateUrl: './teams-statistics.component.html',
  styleUrls: ['./teams-statistics.component.css', '../../app.component.css']
})
export class TeamsStatisticsComponent {
  compareTeams: boolean = false;
  team1!: Team | null;

  toggleCompareTeams() {
    this.compareTeams = !this.compareTeams;
  }

  showStatisticsChart(team: Team | null) {
    this.team1 = team;
  }
}
