import { ITeam } from './../../../definitions/team';
import { IMatch } from './../../../definitions/match';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-championship-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.sass']
})
export class MatchComponent {
  @Input()
  match = [] as ITeam[];

  ngOnInit(): void {
  }

  setWinner(i: number) {
    console.log(i);
  }
}
