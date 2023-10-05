import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryProduct } from 'src/app/shared/models/categoryProduct';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css', '../../../styles/admin-style.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  form: FormGroup;
  editMode: boolean = false;
  @Input() categoryToEdit: CategoryProduct;
  @Output() onSend = new EventEmitter<CategoryProduct>();

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      _id: [null],
      name: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['categoryToEdit'] && changes['categoryToEdit'].currentValue ){
      this.form.patchValue(this.categoryToEdit);
      this.editMode = true;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  onSubmit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.onSend.emit(this.form.value); 
      this.reset();    
    }
  }

  reset(){
    this.editMode = false;
    this.form.reset();
  }
}
