import { ITeam } from './../../../definitions/team';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-championship',
  templateUrl: 'teams-championship.component.html',
  styleUrls: ['teams-championship.component.sass'],
})
export class TeamsChampionshipComponent implements OnInit {
  @Input()
  public teams = [] as ITeam[];
  public matchesPerPhase = [[]] as any[];

  phases: any;
  phasesLabels = [
    'Oitavas de Final',
    'Quartas de Final',
    'Semifinais',
    'Grande Final 🔥',
  ];

  ngOnInit(): void {
    this.phases = new Array(this.teams.length / 2);
    this.matchesPerPhase = [[]];
    this.matchesPerPhase[0].push(this.spliceIntoChunks(2, this.teams))
  }

  private spliceIntoChunks(chunkSize: number, teams: ITeam[]) {
    const res = [];
    while (teams.length > 0) {
        const chunk = teams.splice(0, chunkSize);
        res.push(chunk);
    }

    return res;
  }
}
