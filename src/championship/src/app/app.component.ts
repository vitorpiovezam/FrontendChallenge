import { TeamsAddComponent } from './core/components/teams-add/teams-add.component';
import { ITeam } from './definitions/team';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamsChampionshipComponent } from './core/components/teams-championship/teams-championship.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isLinear = false;
  teams = [] as ITeam[];
  validTeams = false;
  matchesPerPhase: any;

  @ViewChild('stepper') stepper?: MatHorizontalStepper;
  @ViewChild('teamsAddComponent') teamsAddComponent?: TeamsAddComponent;
  @ViewChild('teamsChampionshipComponent') teamsChampionshipComponent?: TeamsChampionshipComponent;

  constructor(public dialog: MatDialog) {
    this.matchesPerPhase = [];
  }

  startChampionship() {
    this.dialog.open(ConfirmDialogComponent, {
      data: this.teams
    }).afterClosed().subscribe(goToChampionship => {
      if (!this.stepper) return;
      if (!goToChampionship) this.stepper.selectedIndex = 0;

      this.stepper.selectedIndex = 1;
      this.teamsChampionshipComponent?.ngOnInit();
    });
  }

  restartChampionship() {
    if (!this.stepper) return;
    this.stepper.selectedIndex = 0;
  }

  onValidateTeam(formValid: boolean) {
    this.validTeams = ([2,4,6,8].includes(this.teams.length) && formValid);
  }

  onTeamAdded(teams: ITeam[]) {
    this.teams = teams;
  }
}

@Component({
  selector: 'app-modal-confirm',
  template: `
    <main>
      <h2>Voce confirma a inclusao desses {{ teams.length }} times?</h2>
      <ul>
        <li *ngFor="let team of teams">{{ team.name }}</li>
      </ul>
      <div class="buttons">
        <button mat-raised-button color="primary" (click)="submit(true)">Confirma</button>
        <button mat-raised-button color="secondary" (click)="submit(false)">Cancela</button>
      </div>
    </main>
  `,
  styles: [`
    .buttons {
      display: flex;
      justify-content: flex-end;
    }

    button:not(:last-child) {
      margin-right: 10px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public teams: ITeam[],
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  public submit(value: boolean) {
    this.dialogRef.close(value);
  }
}
