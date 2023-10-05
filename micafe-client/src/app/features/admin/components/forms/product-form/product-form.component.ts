/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LABEL_BUTTONS } from 'src/app/shared/constants';
import { CategoryProduct } from 'src/app/shared/models/categoryProduct';
import { CategoryProductService } from '../../../services/category-product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css', '../../../styles/admin-style.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() send = new EventEmitter<any>();
  sub: Subscription = new Subscription();
  categorias: CategoryProduct[];
  buttons = LABEL_BUTTONS;
  form: FormGroup;
  editMode: boolean;
  id: string;
  constructor(
    private fb: FormBuilder,
    private catService: CategoryProductService,
    private productService: ProductsService,
    private actRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      _id: [],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      hasMilk: [false, Validators.required],
      isActive: [true, Validators.required],
      urlImage: ['', Validators.required],
      points: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCategories();
    const urlSegments = this.actRoute.snapshot.url.map(s => s.path);

    if(urlSegments.includes('new')){
      this.editMode = false;
    } else{
      this.editMode = true;
      this.id = this.actRoute.snapshot.params['id'];
      this.getProduct();
    }    

  }

  getProduct(){
    this.sub.add(
      this.productService.getOneProduct(this.id).subscribe({
        next: (res) => {
          this.form.patchValue(res.product);
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  getCategories() {
    this.sub.add(
      this.catService.getAllCategories().subscribe({
        next: (res) => {
          this.categorias = res.categories;
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
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
  onSend() {
    console.log(this.form.value);
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.send.emit(this.form.value);
    }
  }

}
