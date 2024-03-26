import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/shared/models/supplier';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css', '../../../styles/admin-style.css']
})
export class SupplierFormComponent implements OnInit, OnChanges {
  @Input() supplier: Supplier;
  form: FormGroup;
  id: string | null;
  @Input() isEditMode: boolean;
  @Output() onSend = new EventEmitter<Supplier>();
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      _id: [],
      name: ['', Validators.required],
      celphone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['supplier'] && changes['supplier'].currentValue){
      this.form.patchValue(this.supplier);
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.onSend.emit(this.form.value);
    }
  }

  reset(){
    this.router.navigate(['/admin/suppliers']);
  }
}
