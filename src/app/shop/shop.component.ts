import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  constructor(private shopService: ShopService) {
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
    const vm = this;
    this.shopService.getProducts();
    debugger
  }
}
