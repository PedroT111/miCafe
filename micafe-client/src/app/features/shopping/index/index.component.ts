import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryProduct, CategoryWithProducts } from 'src/app/shared/models/categoryProduct';
import { CategoryProductService } from 'src/app/shared/services/category-product.service';
import { ScrollSpyService } from 'ng-spy';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {
  sub: Subscription = new Subscription();
  categories: CategoryProduct[];
  productSections: CategoryWithProducts[];
  constructor(private categoryService: CategoryProductService, private spyService: ScrollSpyService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProductsSections();
  }

  getCategories(){
    this.sub.add(
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          if(res.ok){
            this.categories = res.categories;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  getProductsSections(){
    this.sub.add(
      this.categoryService.getCategoriesWithProducts().subscribe({
        next: (res) => {
          if(res.ok){
            this.productSections = res.categories;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  ngAfterViewInit() {
    this.spyService.spy({ thresholdBottom: 700, thresholdTop:100});
  }



}
