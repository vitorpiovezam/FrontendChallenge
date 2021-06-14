import { ITeam } from './../../../definitions/team';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { backgroundUrls } from './teams.add.mock';

@Component({
  selector: 'app-teams-add',
  templateUrl: './teams-add.component.html',
  styleUrls: ['teams-add.component.sass']
})
export class TeamsAddComponent implements OnInit {
  form: FormGroup;
  BackgroundUrls = backgroundUrls;

  @Input()
  min: number = 2;

  @Input()
  max: number = 8;

  @Output() 
  teamList: EventEmitter<ITeam[]> = new EventEmitter();

  @Output() 
  isValid: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({
      teams: new FormArray([]),
    })
  }

  ngOnInit() {
    this.teams().updateValueAndValidity();
    this.teams().valueChanges.subscribe(teams => {
      this.teamList.emit(teams);
    });

    this.teams().statusChanges.subscribe(valid => this.isValid.emit(valid === 'VALID'));

    for (let i = 0; i < this.min; i++) {
      this.addTeam();
    }
  }

  addTeam() {
    const formArray = this.teams();
    formArray.insert(
      formArray.value.length + 1,
      this.instanceNewForm()
    );
  }

  removeTeam(index: number) {
    const formArray = this.teams();
    return formArray.removeAt(index);
  }

  addIsDisabled(): boolean {
    return (this.teams().value.length === this.max)
  }

  teams(): FormArray {
    return this.form.get('teams') as FormArray;
  }

  getRandomPhoto(i: number)  {
    const shieldUrl = this.BackgroundUrls[Math.floor(Math.random() * this.BackgroundUrls.length)];
    const control = this.teams().controls[i];
    control.setValue({ name: control.value.name, shieldUrl });
  }

  private instanceNewForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      shieldUrl: new FormControl('')
    })
  };
}
