/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Discount } from 'src/app/shared/models/discount';
declare let MercadoPago: any;
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  pickUpDateTime: Date;
  customer: User | null;
  order: any;
  discount: Discount | undefined;
  notes: string;
  combos: any[];
  products: any[];
  combosCart: any[];
  productsCart: any[];
  payWithPoints: boolean = false;
  total: number = 0;
  totalPoints: number = 0;
  availablePayPoints: boolean = true;

  mp: any;
  bricksBuilder: any;
  preference: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.updateUserData();
    this.productsCart = this.cartService.getCartItems('products');
    this.combosCart = this.cartService.getCartItems('combos');
    this.mp = new MercadoPago(environment.apiMp, {
      locale: 'es-AR'
    });
    this.bricksBuilder = this.mp.bricks();

  }

  setDateTime(dateTime: Date) {
    this.pickUpDateTime = dateTime;
  }

  createNewOrder() {
    if (!this.pickUpDateTime) {
      this.toastr.info('Ingrese fecha y hora de retiro');
      return;
    }
    this.products = this.productsCart.map((item: any) => ({
      product: item.product._id,
      quantity: item.quantity
    }));
    this.combos = this.combosCart.map((item: any) => ({
      combo: item.combo._id,
      quantity: item.quantity
    }));
    this.order = {
      customer: this.customer?._id,
      products: this.products,
      combos: this.combos,
      discountCode: this.discount?.code,
      pickUpDateTime: this.pickUpDateTime
    };
    if (!this.payWithPoints) {
      console.log(this.order, 'order');
      this.sub.add(
        this.orderService.createOrder(this.order).subscribe({
          next: async (res) => {
            console.log(res);
            this.mp.bricks().create('wallet', 'wallet_container', {
              initialization: {
                preferenceId: res.reference,
                redirectMode: 'self'
              }
            });
            this.cartService.cleanCart();
          }
        })
      );
    } else {
      this.sub.add(
        this.orderService.createOrderWithPoints(this.order).subscribe({
          next: () => {
            this.toastr.success('Tu pedido ha sido creado con éxito');
            this.cartService.cleanCart();
            this.router.navigate(['/profile/order-history']);
          },
          error: (err) => {
            console.log(err);
            console.log(this.order, 'order points');
          }
        })
      );
    }
  }

  updateUserData() {
    this.sub.add(
      this.authService.getUserDateAndUpdateLocalStorage().subscribe({
        next: (res) => {
          this.authService.saveUserData(res.user);
          this.customer = this.authService.getUserData();

          this.calcularTotal();
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }

  payPoints(isPaidWithPoints: boolean) {
    this.payWithPoints = isPaidWithPoints;
    this.discount = undefined;
  }

  addDiscount(discount: Discount) {
    this.discount = discount;
  }

  isAvailablePaidWithPoints(){
    console.log(this.customer, this.totalPoints)
    if(this.customer && this.customer?.points < this.totalPoints){
      this.availablePayPoints = false;
    }
  }

  calcularTotal() {
    if (this.productsCart.length != 0) {
      this.productsCart.forEach((item) => {
        if(item.product.salePrice !== null){
          this.total += item.product.salePrice * item.quantity
        } else {
          this.total += item.product.price * item.quantity;
        }
        
        this.totalPoints += item.product.points * item.quantity;
      });
    }
    if (this.combosCart.length != 0) {
      this.combosCart.forEach((item) => {
        this.total += item.combo.price * item.quantity;
        this.totalPoints += item.combo.points * item.quantity;
      });
    }


    this.isAvailablePaidWithPoints();
  }
}
