import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})
export class TitlePageComponent implements OnInit {
  @Input() title: string;
  @Input() href: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigate([this.href]);
  }

}
