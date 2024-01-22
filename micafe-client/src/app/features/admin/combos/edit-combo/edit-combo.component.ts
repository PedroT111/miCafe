import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Combo } from 'src/app/shared/models/combo';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { ToastrService } from 'ngx-toastr';
import { CombosService } from 'src/app/shared/services/combos.service';

@Component({
  selector: 'app-edit-combo',
  templateUrl: './edit-combo.component.html',
  styleUrls: ['./edit-combo.component.css', '../../styles/admin-style.css']
})
export class EditComboComponent implements OnInit {
  sub: Subscription = new Subscription();
  id: string;
  combo: Combo;
  constructor(
    private comboService: CombosService,
    private actRoute: ActivatedRoute,
    private swal: SwalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    if(this.id){
      this.sub.add(
        this.comboService.getCombo(this.id).subscribe({
          next: (res) => {
            this.combo = res.combo;
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          }
        })
      )
    }

  }

  updateCombo(c: Combo){
    this.swal.showConfirmation(
      'You are about to edit the combo.'
    ).then((res) => {
      if(res.isConfirmed){
        this.sub.add(
          this.comboService.updateCombo(c).subscribe({
            next: (res) => {
              console.log(res);
              this.toastr.success('Combo updated successfully')
              this.router.navigate(['/admin/combos'])
            },
            error: (err) => {
              this.toastr.error(err.error.error);
            }
          })
        )
      }
    })
    
  }
}
