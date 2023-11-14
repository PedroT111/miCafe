import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductSummary } from 'src/app/shared/models/product';
import { Subscription } from 'rxjs';
import { PRODUCT } from '../../constants/product';
import { CategoryProductService } from '../../../../shared/services/category-product.service';
import { Options } from 'src/app/shared/models/form';
import { CategoryProduct } from 'src/app/shared/models/categoryProduct';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PriceAdjustemFormComponent } from '../../components/forms/price-adjustem-form/price-adjustem-form.component';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../../styles/admin-style.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  data: ProductSummary[];
  categorias: Options[];
  filteredData: ProductSummary[];
  filterOptions: CategoryProduct[];
  filterStatusOptions = [{_id: 'Activo', name: 'Activo'}, {_id: 'No Activo', name: 'No Activo'}];
  selectedCategoryFilter: CategoryProduct | null;
  selectedStatusFilter: string;
  searchTerm: string = '';
  tableHeaders = PRODUCT.PRODUCT_TABLE_HEADERS;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryProductService,
    private swalService: SwalService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    this.sub.add(
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          this.categorias = res.categories.map((c) => ({
            value: c._id,
            label: c.name
          }));
          this.filterOptions = res.categories;
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }

  getProducts() {
    this.sub.add(
      this.productService.getProductsSumary().subscribe({
        next: (res) => {
          this.data = res;
          this.filteredData = this.data;
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }

  applyFilters() {
    this.filteredData = this.data;
    if (this.searchTerm) {
      this.filteredData = this.filteredData.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.selectedCategoryFilter) {
      this.filteredData = this.filteredData.filter(
        (item) => item.category == this.selectedCategoryFilter
      );
    }
    if (this.selectedStatusFilter) {
      this.filteredData = this.filteredData.filter(
        (item) => item.isActive == this.selectedStatusFilter
      );
    }
  }

  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }
  onCategoryFilterSelected(category: CategoryProduct) {
    this.selectedCategoryFilter = category;
    this.applyFilters();
  }

  onStatusFilterSelected(status: string){
    this.selectedStatusFilter = status;
    this.applyFilters();
  }

  create() {
    this.router.navigate(['/admin/products/new']);
  }
  edit(p: Product) {
    this.router.navigate([`/admin/products/edit/${p._id}`]);
  }

  deleteProduct(p: Product) {
    this.swalService
      .showConfirmation(
        'Estás a punto de eliminar este producto de forma permanente. ¿Deseas continuar?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.sub.add(
            this.productService.deleteProduct(p._id).subscribe({
              next: () => {
                this.toastr.success('Producto eliminado correctamente');
                this.getProducts();
              },
              error: (err) => {
                this.toastr.error(err.error.error);
              }
            })
          );
        }
      });
  }

  openFormPriceAjustem(){
    const modalRef = this.modalService.open(PriceAdjustemFormComponent, {
      centered: true,
    });

    modalRef.result.then(
      () => {
        this.selectedCategoryFilter = null;
        this.selectedStatusFilter= '';
        this.getProducts();
      }
    )
  }
}
