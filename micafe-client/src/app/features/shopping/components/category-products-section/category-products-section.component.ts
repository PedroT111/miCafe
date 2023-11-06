/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-category-products-section',
  templateUrl: './category-products-section.component.html',
  styleUrls: ['./category-products-section.component.css']
})
export class CategoryProductsSectionComponent implements OnInit {
  @Input() section: any;
  @Input() products: Product[];
  constructor() { }

  ngOnInit(): void {
    
  }

}
