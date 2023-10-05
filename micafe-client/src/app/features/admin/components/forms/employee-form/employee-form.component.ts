import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchingValidator } from '../../../validators/passwordMatch';
import { EmployeeForm } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css', '../../../styles/admin-style.css']
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Output() onSend = new EventEmitter<EmployeeForm>(); 
  @Input() employeeToEdit: EmployeeForm;
  @Input() editMode: boolean;
  isEditMode: boolean;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },{ validators: passwordMatchingValidator }); 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['employeeToEdit'] && changes['employeeToEdit'].currentValue){
      this.loadEmployeeData();
    }
    if(changes['editMode'] && changes['editMode'].currentValue){
      this.isEditMode = this.editMode;
      this.form.get('password')?.clearValidators();
      this.form.get('confirmPassword')?.clearValidators();
    }
   
  }
  
  loadEmployeeData(){
    this.form.patchValue(this.employeeToEdit);
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if(this.form.valid){
      const {id, name, lastName, email, password} = this.form.value;
      const employee: EmployeeForm = {id, name, lastName, email, password};
      this.onSend.emit(employee);
    }
    
  }

 

}
