import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  imageSrc: string | ArrayBuffer | null = null;

  honey: any[] = [];
  polen: any[] = [];
  propolis: any[] = [];
  royalJelly: any[] = [];
  constructor(private shopService: ShopService) {
  }

  ngOnInit() {
    this.shopService.getProducts().subscribe(
      (data: any) => {
        this.honey = data.honey;
        this.polen = data.polen;
        this.propolis = data.propolis;
        this.royalJelly = data.royalJelly;
      },
      (error) => {

      }
    );

    this.shopService.getImage().subscribe(
      (data: any) => {
        // debugger
        this.imageSrc = data;
        // const reader = new FileReader();
        // reader.readAsDataURL(data);
        // reader.onloadend = () => {
        //   let result: any = reader.result;
        //   this.imageSrc = result.replace('data:text/plain;', 'data:image/png;');
        // };

      }
    );
  }

  @ViewChild('myDialog', { static: true }) dialogElement!: ElementRef<HTMLDialogElement>;

  openDialog() {
    debugger
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
    this.shopService.foo().subscribe(
      response => {
        var data = response;
      }
    );
  }
}
