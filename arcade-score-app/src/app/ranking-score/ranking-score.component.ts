import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Player } from '../../model/player';
import { ApiService } from '../../service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ranking-score',
  templateUrl: './ranking-score.component.html',
  styleUrls: ['./ranking-score.component.scss']
})
export class RankingScoreComponent implements OnInit {

  dataSource: Player[];

  constructor(private _api: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this._api.getRankingList()
      .subscribe(res => {
        this.dataSource = res;
        console.log(this.dataSource);
      }, err => {
        console.log(err);
      });
  }

  openModal(item) { 
    // , { size: 'lg' }
    let modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.item = item;
  }
}
