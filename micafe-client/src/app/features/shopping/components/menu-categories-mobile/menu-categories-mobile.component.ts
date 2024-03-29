import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CategoryProduct } from 'src/app/shared/models/categoryProduct';

@Component({
  selector: 'app-menu-categories-mobile',
  templateUrl: './menu-categories-mobile.component.html',
  styleUrls: ['./menu-categories-mobile.component.css']
})
export class MenuCategoriesMobileComponent implements OnInit {
  @Input() categories: CategoryProduct[];
  activeCategory: string;
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
   
  }


  scroll(section: string) {
    this.router.navigateByUrl('/shopping#' + section);
  }

}
