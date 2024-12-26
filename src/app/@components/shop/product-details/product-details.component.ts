import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopService } from '../shop.service';
import { ToastrService } from 'ngx-toastr';
import { CartControlService } from './../../cart/cart-control.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  images!: string[];
  id!: string;
  amountLeft!: number;
  description!: string;
  name!: string;
  price!: number;
  type!: number;
  weight!: number;
  activeImageIndex: number;
  private isFlipping: boolean = false;
  orderQuantity: number = 0;
  isRemoveFromCartHidden: boolean = true;
  addToCartQuantity: number = 1;

  public cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private toastr: ToastrService,
    private cartService: CartControlService
  ) {
    this.activeImageIndex = 0;
  }

  @ViewChild('myDialog', { static: true })
  dialogElement!: ElementRef<HTMLDialogElement>;
  @ViewChild('activeImage', { static: true })
  activeImage!: ElementRef<HTMLDivElement>;

  openBigImage() {
    if (this.dialogElement) {
      const dialog: HTMLDialogElement = this.dialogElement.nativeElement;
      dialog.showModal();
    }
  }

  closeDialog() {
    if (this.dialogElement) {
      const dialog: HTMLDialogElement = this.dialogElement.nativeElement;
      dialog.close();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.name = params['name'];
      this.description = params['description'];
      this.price = params['price'];
      this.amountLeft = params['amountLeft'];
      this.weight = params['weight'];

      this.shopService.getHoneyImages(this.id).subscribe((data) => {
        this.images = data as string[];
        this.setActiveImage();
      });
    });

    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  clickInModal($event: any) {
    const modalDialogPosition: DOMRect =
      $event.currentTarget.getBoundingClientRect();
    if (!this.checkInsideBounds($event.x, $event.y, modalDialogPosition)) {
      $event.currentTarget.close();
    }
  }

  checkInsideBounds(x: number, y: number, rect: DOMRect): boolean {
    if (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  selectImage(idx: number, event: any) {
    event.stopPropagation();
    this.activeImageIndex = idx;
    this.setActiveImage();
  }

  setActiveImage() {
    const imageElement: HTMLDivElement = this.activeImage.nativeElement;
    this.isFlipping = true;
    if (imageElement) {
      const element = document.getElementById('active-image');
      if (element) {
        this.isFlipping = true;
        element?.classList.add('flip');
        setTimeout(() => {
          element.style.backgroundImage = `url(${
            this.images[this.activeImageIndex]
          })`;
          if (element) {
            element.classList.remove('flip');
          }
          this.isFlipping = false;
        }, 300);
      }
    }
  }

  getImageURL() {
    return `url(${this.images[this.activeImageIndex]});`;
  }

  getLoadingImg() {
    return 'url(assets/loading.gif)';
  }

  raiseQuantity() {
    this.addToCartQuantity++;
  }

  lowerQuantity() {
    this.addToCartQuantity--;
  }

  addToCart() {
    debugger;
    if (this.cartItems) {
      const existingCartItem = this.cartItems.find((x) => x.id === this.id);
      if (existingCartItem) {
        existingCartItem.quantity += this.addToCartQuantity;
      } else {
        const cartItem = {
          id: this.id,
          name: this.name,
          quantity: this.addToCartQuantity,
          price: this.price,
        };
        this.cartService.addCartItem(cartItem);
      }
    }
    else {
      const cartItem = {
        id: this.id,
        name: this.name,
        quantity: this.addToCartQuantity,
        price: this.price,
      };
      this.cartService.addCartItem(cartItem);
    }
    this.toastr.success('Вие успешно добавихте продукта в количката');
  }

  removeFromCart() {
    const existingCartItem = this.cartItems.find((x) => x.id === this.id);
    if (existingCartItem) {
      if (this.addToCartQuantity === existingCartItem.quantity) {
        const index = this.cartItems.indexOf(existingCartItem);
        this.cartItems.splice(index, 1);
        this.toastr.info('Вие успешно премахнахте продукта от количката');
      }
      else {
        existingCartItem.quantity -= this.addToCartQuantity;
        this.toastr.info('Вие успешно намалихте количеството на продукта в количката');
      }
    }
  }

  quantityChange($event: any) {
    const target = $event.currentTarget;
    const newValue = Number.parseInt(target.value);
    if (newValue) {
      this.addToCartQuantity = newValue;
    } else {
      this.addToCartQuantity = 1;
      target.value = 1;
    }
  }

  isProductInCart() {
    return this.cartItems.find((x) => x.id === this.id) ? true : false;
  }
}
