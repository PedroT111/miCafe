import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.css']
})
export class ReportDataComponent implements OnInit {
  @Input() title: string;
  @Input() data: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
