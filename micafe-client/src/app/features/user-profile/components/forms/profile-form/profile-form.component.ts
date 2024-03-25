/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';


@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  @Input() user: User | null;
  @Output() onSend = new EventEmitter<any>();
  form: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['']
    })
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue({
        _id: this.user._id,
        name: this.user.name,
        lastName: this.user.lastName,
        email: this.user.email
      });
    }
  }

  onSubmit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      const userData = {
        _id: this.form.get('_id')?.value,
        name: this.form.get('name')?.value,
        lastName: this.form.get('lastName')?.value
      }
      this.onSend.emit(userData);
    }
  }

}
