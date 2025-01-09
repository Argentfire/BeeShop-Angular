import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  imageSrc: string | ArrayBuffer | null = null;

  honey: any[] = [];
  polen: any[] = [];
  propolis: any[] = [];
  royalJelly: any[] = [];
  products: Product[];
  @ViewChild('myDialog', { static: true })
  dialogElement!: ElementRef<HTMLDialogElement>;
  filters: number[];
  allProductCards: NodeListOf<HTMLDivElement>;

  constructor(private shopService: ShopService) {
    this.products = [];
    this.filters = [];
    this.allProductCards = document.querySelectorAll('.product-card');
  }

  ngOnInit() {
    this.shopService.getProducts().subscribe(
      (data: any) => {
        for (let item of data) {
          const product = new Product(
            item.id,
            item.name,
            item.description,
            item.price,
            item.amountLeft,
            item.weight,
            item.type,
            item.images
          );
          this.products.push(product);
          this.getProductThumbnails(product);
        }
      }
    );
  }

  getProductThumbnails(product: Product) {
    this.shopService.getThumbnail(product.id).subscribe((data: any) => {
      if (data) {
        if (data.url) {
          product.thumbnail = data.url;
        }
      }
    });
  }

  selectedFilters: any = {};

  onFilterChange(filterType: number, event: any) {
    if (event.target.checked) {
      this.filters.push(filterType);
    } else {
      const index = this.filters.indexOf(filterType);
      if (index > -1) {
        this.filters.splice(index, 1);
      }
    }
  }

  applyFilters() {
    const allProductCards = document.querySelectorAll('.product-card');

    if (this.filters.length === 0) {
      allProductCards.forEach((card) => {
        (card as any).hidden = false;
      });
    } else {
      allProductCards.forEach((card) => {
        card.setAttribute('display', 'flex');
        const cardType = card.getAttribute('ng-reflect-type');
        const cardTypeInt = cardType ? Number.parseInt(cardType) : -1;
        if (cardTypeInt > -1) {
          if (!this.filters.includes(cardTypeInt)) {
            (card as any).hidden = true;
          } else {
            (card as any).hidden = false;
          }
        }
      });
    }
  }

  openDialog() {
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

  debug() {
    this.shopService.foo().subscribe((response) => {
      var data = response;
    });
  }
}
