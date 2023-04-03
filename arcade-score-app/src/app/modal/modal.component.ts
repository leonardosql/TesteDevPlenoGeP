import { Component, Injectable, OnInit } from '@angular/core'

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Player } from '../../model/player';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {
  item: Player;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

}
