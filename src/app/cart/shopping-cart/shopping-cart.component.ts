import { ToastrService } from 'ngx-toastr';
import { Component, NgZone, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartControlService } from '../cart-control.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  public name: string;
  public phone: string;
  public email: string;
  public city: string;
  public address: string;
  public courier: string;
  public additionalInfo: string;
  public isPersonalDetailsHidden: boolean;
  public isCourierDetailsHidden: boolean;
  public isInteractiveMapHidden: boolean;
  public isAdditionalOrderDetailsHidden: boolean;
  public cartItems: any[];
  public totalPrice: number;
  public courierTax: number;

  @ViewChild('finalizeOrderDialog', { static: true })
  finalizeOrderDialogElement!: ElementRef<HTMLDialogElement>;

  constructor(private cartService: CartControlService, private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.city = '';
    this.address = '';
    this.courier = '';
    this.additionalInfo = '';
    this.isPersonalDetailsHidden = false;
    this.isCourierDetailsHidden = false;
    this.isInteractiveMapHidden = true;
    this.isAdditionalOrderDetailsHidden = false;

    this.cartItems = [];
    this.totalPrice = 0;
    this.courierTax = 5;
  }

  ngOnInit(): void {
    window.addEventListener('message', this.handleMessage.bind(this), false);

    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  handleMessage(event: MessageEvent): void {
    if (event.data?.office) {
      const office = event.data.office;
      this.ngZone.run(() => {
        this.city = office.address.city.name;
        this.address = `${office.address.street} ${office.address.streetNumber}`;
      });
    }
  }

  toggleForm(
    property:
      | 'isPersonalDetailsHidden'
      | 'isCourierDetailsHidden'
      | 'isInteractiveMapHidden'
      | 'isAdditionalOrderDetailsHidden'
  ): void {
    this[property] = !this[property];
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  finalizeOrder(): void {
    if (this.finalizeOrderDialogElement) {
      const dialog: HTMLDialogElement = this.finalizeOrderDialogElement.nativeElement;
      dialog.showModal();
    }
  }

  confirmOrder(): void {
    this.closeDialog();
    this.toastr.success('Поръчката ви е изпратена успешно!');
  }

  closeDialog(): void {
    if (this.finalizeOrderDialogElement) {
      const dialog: HTMLDialogElement = this.finalizeOrderDialogElement.nativeElement;
      dialog.close();
    }
  }
}
