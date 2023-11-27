import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Team } from '../../models/team'

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css', '../../app.component.css']
})


export class DropdownMenuComponent {
  teams: Team[] = [];
  selectedTeam: Team | null = null;
  @Output() selectedTeamChange: EventEmitter<Team | null> = new EventEmitter<Team | null>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Llama a la API para obtener la lista de equipos
    this.http.get<Team[]>("http://localhost:8080/teams").subscribe((data) => {
      this.teams = data.sort((a, b) => a.code.localeCompare(b.code as any));
    });
  }

  onSelectTeam(team: Team | null): void {
    this.selectedTeam = team;
    this.selectedTeamChange.emit(this.selectedTeam);
    // Realiza aquí las acciones adicionales que desees con el equipo seleccionado
  }
}
