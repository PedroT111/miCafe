import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { HELP_LINKS, PROFILE_LINKS } from '../constants/profile';

@Component({
  selector: 'app-account-mobile',
  templateUrl: './account-mobile.component.html',
  styleUrls: ['./account-mobile.component.css']
})
export class AccountMobileComponent implements OnInit {
  @Input() user: User | null;
  @Output() onLogOut = new EventEmitter();
  profileLinks = PROFILE_LINKS;
  helpLinks = HELP_LINKS;
  constructor() { }

  ngOnInit(): void {
  }

  logOut(){
    this.onLogOut.emit();
  }

}
