/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Combo } from 'src/app/shared/models/combo';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-combo-form',
  templateUrl: './combo-form.component.html',
  styleUrls: ['./combo-form.component.css', '../../../styles/admin-style.css']
})
export class ComboFormComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('fileInput') fileInput: ElementRef;
  sub: Subscription = new Subscription();
  @Output() send = new EventEmitter<Combo>();
  @Input() comboToEdit: Combo;

  form: FormGroup;
  productList: Product[];
  produtcSelected: string;
  quantity: number;
  selectedProducts: Product[] = [];
  @Input() isEditMode: boolean;
  editMode: boolean;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService, 
  ) {
    this.form = this.fb.group({
      _id: [null,],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      products: this.fb.array([]),
      urlImage: ['', Validators.required],
      isActive: [true, Validators.required]
    })
  }

  get products() {
    return this.form.controls["products"] as FormArray;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getProductList();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['comboToEdit'] && changes['comboToEdit'].currentValue){
      this.loadComboData(this.comboToEdit);
    }
    if(changes['isEditMode'] && changes['isEditMode'].currentValue){
      this.editMode = this.isEditMode;
    }
  }

  private loadComboData(combo: Combo) {
    this.form.patchValue({
      _id: combo._id,
      name: combo.name,
      description: combo.description,
      price: combo.price,
      urlImage: combo.urlImage,
      points: combo.points,
      isActive: combo.isActive
    });

    this.products.clear(); 
  
    combo.products.forEach((product) => {
      this.addProductControl(product.product, product.quantity);
    });
  }
  
  private addProductControl(productId: string, quantity: number) {
    const productsForm = this.fb.group({
      product: [productId, Validators.required],
      quantity: [quantity, Validators.required],
    });
    this.products.push(productsForm);
  }

  getProductList(){
    this.sub.add(
      this.productService.getAllProducts().subscribe({
        next: (res) => {
          this.productList = res.products;
        },
        error: (err) => {
          console.log(err)
        }
      })
    )
  }

  addItemToCombo() {
    const productsForm = this.fb.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.products.push(productsForm);
  }

  removeItemToCombo(index: number){
    this.products.removeAt(index);
  }

  onSubmit(){
    this.form.markAllAsTouched();
    console.log(this.form.value)
    if (this.form.valid) {
      console.log(this.form.value, 'form')
      this.send.emit(this.form.value);
    }
  }

  handleImageChange(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.form.patchValue({
        urlImage: `${selectedFile.name}`
      });
    }
  }

  getImageSource(): string {
    const urlImage = this.form.get('urlImage')?.value;
    return urlImage ? 'assets/products/' + urlImage : 'assets/no-select-img.png';
  }
  
  openImageInput(){
    this.fileInput.nativeElement.click();
  }
}
