import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboSummary } from 'src/app/shared/models/combo';
import { ComboDetailComponent } from '../combo-detail/combo-detail.component';

@Component({
  selector: 'app-combo-card',
  templateUrl: './combo-card.component.html',
  styleUrls: ['./combo-card.component.css']
})
export class ComboCardComponent implements OnInit {
  @Input()combo: ComboSummary;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openComboDetil(){
    const modalRef = this.modalService.open(ComboDetailComponent, {
      centered: true,
    });
    modalRef.componentInstance.combo = this.combo;

    modalRef.result.then(
      () => {
        
      }
    )
  }

}
