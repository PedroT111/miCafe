import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryProductService } from '../../../../shared/services/category-product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryProduct } from 'src/app/shared/models/categoryProduct';
import { CATEGORY } from '../../constants/categoryProduct';
import { SortBy } from 'src/app/shared/models/filter';
import { SwalService } from 'src/app/shared/utils/swal.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css','../../styles/admin-style.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  categories: CategoryProduct[];
  tableHeaders = CATEGORY.CATEGORY_TABLE_HEADERS;
  sorting = CATEGORY.SORTING;
  filteredData: CategoryProduct[] = [];
  selectedCategory: CategoryProduct;
  searchTerm: string;
  selectedSort: SortBy;
  constructor(
    private categoryService: CategoryProductService,
    private toastr: ToastrService,
    private swal: SwalService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.sub.add(
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          this.categories = res.categories;
          this.filteredData = this.categories;
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }

  onSubmit(category: CategoryProduct) {
    if (!category._id) {
      this.sub.add(
        this.categoryService.createCategory(category).subscribe({
          next: (res) => {
            if (res.ok) {
              this.toastr.success('Categoria agregada correctamente');
              this.getCategories();
            }
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          }
        })
      );
    } else {
      this.sub.add(
        this.categoryService.updateCategory(category).subscribe({
          next: (res) => {
            if (res.ok) {
              this.toastr.success('Categoria editada correctamente');
              this.getCategories();
            }
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          }
        })
      );
    }
  }

  updateCategory(category: CategoryProduct){
    console.log('desde list', category)
    this.selectedCategory = category;
  }

  deleteCategory(c: CategoryProduct) {
    this.swal.showConfirmation(
      'Estás a punto de eliminar una Categoria'
    ).then((res) => {
      if(res.isConfirmed){
        this.sub.add(
          this.categoryService.deleteCategoy(c).subscribe({
            next: (res) => {
              this.toastr.success(res.msg);
              this.getCategories();
            },
            error: (err) => {
              this.toastr.error(err.error.error);
            }
          })
        )
      }
    })
  }

  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredData = this.categories;
    if (this.searchTerm) {
      this.filteredData = this.filteredData.filter((category) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  } 

  orderBy(sort: SortBy){
    console.log(sort)
    this.selectedSort = sort;
    this.filteredData = this.filteredData.sort((a,b) => {
      let comparison = 0;
      if(sort.sort === 'name'){
        comparison = a.name.localeCompare(b.name);
      }
      return sort.asc ? comparison : -comparison;
    })
  }
}
