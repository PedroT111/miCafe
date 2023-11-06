import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScrollSpyService } from 'ng-spy';
import { Subscription } from 'rxjs';
import {
  CategoryProduct,
  CategoryWithProducts
} from 'src/app/shared/models/categoryProduct';
import { ComboSummary } from 'src/app/shared/models/combo';
import { Product } from 'src/app/shared/models/product';
import { CategoryProductService } from 'src/app/shared/services/category-product.service';
import { CombosService } from 'src/app/shared/services/combos.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.component.html',
  styleUrls: ['./shopping-items.component.css']
})
export class ShoppingItemsComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  categories: CategoryProduct[];
  productSections: CategoryWithProducts[];
  combos: ComboSummary[];
  offers: Product[];
  constructor(
    private categoryService: CategoryProductService,
    private spyService: ScrollSpyService,
    private comboService: CombosService,
    private productService: ProductsService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProductsSections();
    this.getCombos();
    this.getOffers();
  }

  getCategories() {
    this.sub.add(
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          if (res.ok) {
            this.categories = res.categories;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }

  getProductsSections() {
    this.sub.add(
      this.categoryService.getCategoriesWithProducts().subscribe({
        next: (res) => {
          if (res.ok) {
            this.productSections = res.categories;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }

  getCombos() {
    this.sub.add(this.comboService.getAllCombos().subscribe({
      next: (res) => {
        this.combos = res;
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  getOffers(){
    this.sub.add(
      this.productService.getProductsOnSale().subscribe({
        next: (res) => {
          this.offers = res.products;
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  ngAfterViewInit() {
    this.spyService.spy({ thresholdBottom: 700, thresholdTop: 100 });
  }
}
