import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Combo } from 'src/app/shared/models/combo';
import { CombosService } from '../../services/combos.service';

@Component({
  selector: 'app-create-combo',
  templateUrl: './create-combo.component.html',
  styleUrls: ['./create-combo.component.css', '../../styles/admin-style.css']
})
export class CreateComboComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(private comboService: CombosService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

  createCombo(combo: Combo){
    this.sub.add(
      this.comboService.newCombo(combo).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

}
