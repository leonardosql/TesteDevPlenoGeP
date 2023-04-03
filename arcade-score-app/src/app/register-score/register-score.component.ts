import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Match } from '../../model/match';
import { Player } from '../../model/player';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { eventNames } from 'process';

@Component({
  selector: 'app-register-score',
  templateUrl: './register-score.component.html',
  styleUrls: ['./register-score.component.scss']
})
export class RegisterScoreComponent implements OnInit {

  @ViewChild('selfClosingAlert') selfClosingAlert: NgbAlert;
  private _success = new Subject<string>();
  successMessage = '';


  model: Match;
  players: Player[];
  ngbDataSelected: NgbDateStruct = null;

  registerForm: FormGroup;
  isFormSaved = false;


  constructor(private fb: FormBuilder, private _api: ApiService) {
    this.model = new Match();
  }

  ngOnInit() {

    this.registerForm = this.fb.group({
      score: ['', Validators.compose([Validators.required])],
      selectPlayer: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])]
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.closeHandler();
      }
    });

    this._api.getAllPlayers()
      .subscribe(res => {
        this.players = res;
        console.log(this.players);
      }, err => {
        console.log(err);
      });
  }

  onSave() {

    this.isFormSaved = true;
    if (this.registerForm.invalid) {
      return;
    }
    else{
      let test = this.registerForm.value;
      this.model.Score = this.registerForm.value.score;
      this.model.PlayerId = this.registerForm.value.selectPlayer;
    }

    this._api.registerScore(this.model)
      .subscribe(res => {
                  this._success.next('Salvo com sucesso!');
                  this.cleanModel();
        }, (err) => {
          console.log(err);
        });
  }

  cleanModel(){
    this.model = new Match();
    this.ngbDataSelected = null;
    this.isFormSaved = false;
    this.registerForm.reset();
  }

  onDateSelect($event){
    this.ngbDataSelected = $event;
    this.model.RegistredAt = new Date($event.year, $event.month - 1, $event.day);
  }

  get regForm() {
    return this.registerForm.controls;
  }
  registerFormSubmit(value) {
    console.log(value.dob.format('DD-MMM-YYYY'));
  }

}

class RegistrationScore {
  constructor(
    public score: number = 0,
    public player: Player = null,
    public registredat: NgbDateStruct = null,
  ) { }
}