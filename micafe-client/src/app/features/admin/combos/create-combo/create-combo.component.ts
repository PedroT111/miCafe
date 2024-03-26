import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Combo } from 'src/app/shared/models/combo';
import { CombosService } from 'src/app/shared/services/combos.service';

@Component({
  selector: 'app-create-combo',
  templateUrl: './create-combo.component.html',
  styleUrls: ['./create-combo.component.css', '../../styles/admin-style.css']
})
export class CreateComboComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(
    private comboService: CombosService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  createCombo(combo: Combo) {
    this.sub.add(
      this.comboService.newCombo(combo).subscribe({
        next: (res) => {
          if (res.ok) {
            this.toastr.success('Combo created successfully');
            this.router.navigate(['/admin/combos']);
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }
}
