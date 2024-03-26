import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryProduct } from 'src/app/shared/models/categoryProduct';

@Component({
  selector: 'app-menu-categories',
  templateUrl: './menu-categories.component.html',
  styleUrls: ['./menu-categories.component.css']
})
export class MenuCategoriesComponent implements OnInit {
  @Input() categories: CategoryProduct[];
  activeCategory: string;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  scroll(section: string) {
    this.activeCategory = section;
    this.router.navigateByUrl('/shopping#' + section);
  }
}
