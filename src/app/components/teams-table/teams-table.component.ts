import { Component, Input } from '@angular/core';

import { Team } from '../../models/team';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent {

  @Input() tableHeaders: string[] = [];
  @Input() tableTeams: Team[] = [];

  constructor() {}

}
