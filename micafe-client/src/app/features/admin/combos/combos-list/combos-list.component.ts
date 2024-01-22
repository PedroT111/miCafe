import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { Combo, ComboSummary } from 'src/app/shared/models/combo';
import { COMBO } from '../../constants/combos';
import { Router } from '@angular/router';
import { CombosService } from 'src/app/shared/services/combos.service';

@Component({
  selector: 'app-combos-list',
  templateUrl: './combos-list.component.html',
  styleUrls: ['./combos-list.component.css', '../../styles/admin-style.css']
})
export class CombosListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  combos: ComboSummary[];
  tableHeaders = COMBO.COMBO_TABLE_HEADERS;
  filteredData: ComboSummary[];
  searchTerm: string;
  constructor(
    private comboService: CombosService,
    private toastr: ToastrService,
    private swal: SwalService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCombos();
  }

  getCombos() {
    this.sub.add(
      this.comboService.getAllCombos().subscribe({
        next: (res) => {
          this.combos = res;
          this.filteredData = this.combos;
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }

  applyFilters() {
    this.filteredData = this.combos;
    if (this.searchTerm) {
      this.filteredData = this.filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  deleteCombo(c: Combo) {
    this.swal
      .showConfirmation(
        'You are about to permanently delete this combo. Do you want to continue?'
      )
      .then((res) => {
        if (res.isConfirmed) {
          this.sub.add(
            this.comboService.deleteCombo(c).subscribe({
              next: (res) => {
                if (res.ok) {
                  this.toastr.success(res.msg);
                  this.getCombos();
                }
              },
              error: (err) => {
                this.toastr.error(err.error.error);
              }
            })
          );
        }
      });
  }

  updateCombo(c: Combo){
    this.router.navigate([`/admin/combos/edit/${c._id}`]);
  }
}
