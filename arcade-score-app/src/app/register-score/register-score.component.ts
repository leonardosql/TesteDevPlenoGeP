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


  constructor(private fb: FormBuilder, private _api: ApiService) {
    this.model = new Match();
  }

  ngOnInit() {

    this.registerForm = this.fb.group({
      score: ['', Validators.compose([Validators.required])],
      // emailId: ['', Validators.compose([Validators.required,
      // Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      // mobile: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')])],
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

    //this.model.RegistredAt = new Date(this.ngbDataSelected.year, this.ngbDataSelected.month - 1, this.ngbDataSelected.day);

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
  }

  onDateSelect($event){
    this.ngbDataSelected = $event;
    this.model.RegistredAt = new Date($event.year, $event.month - 1, $event.day);
  }

  get f() { return this.registerForm.controls; }

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