import { Component, Input } from '@angular/core';

import { Team } from '../../models/team';

interface Iconos {
  W: string;
  D: string;
  L: string;
  [key: string]: string;
}

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent {

  @Input() tableHeaders: string[] = [];
  @Input() tableHeadersHelpers: string[] = [];
  @Input() tableTeams: Team[] = [];

  constructor() {}

  convertirAEmojis(form: string) {
    const iconos: Iconos = {
      'W': '✅',
      'D': '➖',
      'L': '❌'
    };

    const formConvertido = form.split('').map(letra => iconos[letra] || letra).join('');

    return formConvertido;
  }

  visualizeTeam(t: Team) {
    // Petición a DB para que devuelva las stats de los últimos partidos de ese equipo
  }
}
