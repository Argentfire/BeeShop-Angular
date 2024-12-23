import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from './../models/product';

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
  constructor(private shopService: ShopService) {
    this.products = [];
  }

  ngOnInit() {
    this.shopService.getProducts().subscribe(
      (data: any) => {
        this.honey = data.honey;
        this.polen = data.polen;
        this.propolis = data.propolis;
        this.royalJelly = data.royalJelly;

        for (let honey of data.honey) {
          const prod = new Product(
            honey.id,
            honey.name,
            honey.description,
            honey.price,
            honey.amountLeft,
            honey.weight,
            honey.type,
            honey.images
          );
          this.products.push(prod);
          this.getProductThumbnails(prod);
        }
        for (let polen of data.polen) {
          this.products.push(
            new Product(
              polen.id,
              polen.name,
              polen.description,
              polen.price,
              polen.amountLeft,
              polen.weight,
              polen.type,
              polen.images
            )
          );
        }
        for (let propolis of data.propolis) {
          this.products.push(
            new Product(
              propolis.id,
              propolis.name,
              propolis.description,
              propolis.price,
              propolis.amountLeft,
              propolis.weight,
              propolis.type,
              propolis.images
            )
          );
        }
        for (let royalJelly of data.royalJelly) {
          this.products.push(
            new Product(
              royalJelly.id,
              royalJelly.name,
              royalJelly.description,
              royalJelly.price,
              royalJelly.amountLeft,
              royalJelly.weight,
              royalJelly.type,
              royalJelly.images
            )
          );
        }
      },
      (error) => {}
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

  openDialog() {
    // Check if dialogElement is defined before using it
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
